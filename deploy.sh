#!/usr/bin/env bash
#
# Build the static-site image on this (dev) machine and ship it to the Pi, then
# restart the stack there. The server never compiles — it only loads a prebuilt
# image and runs it. The Raspberry Pi (armv7) OOMs running `mix build.static`,
# so the BEAM build happens here and only nginx + baked _site/ ship across.
#
# Usage:
#   ./deploy.sh                                  # cross-build armv7, ship to host "pi"
#   DEPLOY_HOST=pi DEPLOY_PATH=~/reibisch ./deploy.sh
#
# Env vars:
#   DEPLOY_HOST   SSH host/alias of the target server.   Default: pi
#   DEPLOY_PATH   Path on the server holding the compose file. Default: ~/reibisch
#   PLATFORM      target arch for the image.             Default: linux/arm/v7 (Pi)
#   APP_IMAGE     image name:tag, must match docker-compose.prod.yml. Default: reibisch-web:latest
#   COMPOSE_FILE  compose file (local + remote name).    Default: docker-compose.prod.yml
#
# Cross-arch builds need qemu binfmt; this script registers it on first use.
set -euo pipefail

PLATFORM="${PLATFORM:-linux/arm/v7}"
APP_IMAGE="${APP_IMAGE:-reibisch-web:latest}"
BUILDER="${BUILDER:-reibisch-builder}"
DEPLOY_HOST="${DEPLOY_HOST:-pi}"
DEPLOY_PATH="${DEPLOY_PATH:-~/reibisch}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

HOST_ARCH="linux/$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/')"
if [ "$PLATFORM" != "$HOST_ARCH" ]; then
  # Cross-arch: the default `docker` driver can't --load a foreign-arch image.
  # Register qemu and use a docker-container builder that can.
  echo ">> Cross-building $PLATFORM on $HOST_ARCH — ensuring qemu + builder"
  BINFMT_IMAGE="${BINFMT_IMAGE:-tonistiigi/binfmt@sha256:400a4873b838d1b89194d982c45e5fb3cda4593fbfd7e08a02e76b03b21166f0}"
  if [ ! -e /proc/sys/fs/binfmt_misc/qemu-arm ]; then
    docker run --privileged --rm "$BINFMT_IMAGE" --install arm >/dev/null
  fi
  docker buildx inspect "$BUILDER" >/dev/null 2>&1 \
    || docker buildx create --name "$BUILDER" --driver docker-container >/dev/null
  BUILDER_FLAG=(--builder "$BUILDER")
else
  BUILDER_FLAG=()
fi

echo ">> Building $APP_IMAGE for $PLATFORM (armv7 BEAM build under qemu — slow)"
docker buildx build "${BUILDER_FLAG[@]}" --platform "$PLATFORM" -t "$APP_IMAGE" --load .

echo ">> Syncing $COMPOSE_FILE to $DEPLOY_HOST:$DEPLOY_PATH"
scp "$COMPOSE_FILE" "$DEPLOY_HOST:$DEPLOY_PATH/"

echo ">> Shipping image to $DEPLOY_HOST (slow over a home link)"
docker save "$APP_IMAGE" | gzip | ssh "$DEPLOY_HOST" 'gunzip | docker load'

echo ">> Restarting stack on $DEPLOY_HOST:$DEPLOY_PATH"
ssh "$DEPLOY_HOST" "cd $DEPLOY_PATH && APP_IMAGE='$APP_IMAGE' docker compose -f '$COMPOSE_FILE' up -d --no-build --remove-orphans"

echo ">> Done. $APP_IMAGE deployed to $DEPLOY_HOST."
