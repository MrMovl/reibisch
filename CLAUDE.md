# CLAUDE.md

## Role
You are the implementation engineer. I am the software architect. Execute narrowly
scoped tasks with minimal risk and minimal cost.

## Planning rules
Before changes for any non-trivial task:
1. Summarize the goal in 1-3 sentences.
2. List the files you expect to inspect.
3. List the files you expect to change.
4. State the minimal implementation approach.
5. State the validation commands you plan to run.
6. Wait if the task explicitly says planning only.

## Scope, cost, and stopping
- Think before coding. Make the smallest change that solves the task; touch as few
  files as possible.
- When a task is ambiguous, choose the smallest safe interpretation.
- Reuse existing patterns, components, utilities, and styling. Prefer explicit naming
  over clever abstractions; keep functions and components focused and readable.
- No speculative improvements, large rewrites, hidden behavior changes, or unrelated
  cleanup unless explicitly requested.
- No new dependencies unless explicitly allowed.
- Prefer a short plan over broad exploration; do not re-read the whole repo unless
  necessary.
- Stop immediately when the step is complete, its validation has clearly passed or
  failed, the next step would expand scope, or a decision is needed from the architect.
  Do not keep iterating once acceptance criteria are met.

## Phoenix / Elixir rules
- Follow the project's existing module and template structure.
- Reuse existing HEEx components and helpers where possible.
- Keep logic in controllers and templates simple; avoid premature LiveView unless
  interactivity is explicitly requested.
- Preserve current UX and visual style unless the task says otherwise.

## Git workflow rules
- **PR-only. Never commit or push to `main` directly** unless the architect
  explicitly says it's fine to work on main this time. This covers ALL changes,
  including docs, deploy scripts, and one-line fixes.
- Sequence is always: branch, commit, open PR, wait for explicit merge approval,
  merge, then `git checkout main && git pull` before deploying.

## Deployment rules
- Deployment target is a Raspberry Pi (armv7) running Docker. SSH alias: `pi`.
- **Deploy command: `./deploy.sh`**, run from the repo root on the dev machine.
  It cross-builds a linux/arm/v7 Docker image locally (Pi OOMs running `mix build.static`),
  ships the image via `docker save | ssh pi 'docker load'`, and restarts the stack.
  GitHub is not in the loop; the Pi never pulls from GitHub.
- **CRITICAL: deploy.sh builds from the LOCAL working tree, not GitHub.** After
  merging a PR on GitHub you MUST `git checkout main && git pull` (or rebase local
  commits onto origin/main) BEFORE `./deploy.sh`, or it bakes stale content into the
  image. Verify content shipped: `curl -s https://reibisch.de/ | grep <new-text>`.
- Production is a **static site**: `mix build.static` renders all routes to plain
  HTML in `_site/`, served by nginx. The BEAM never runs in production; Elixir is
  build-time only.
- `docker-compose.yml` = local Phoenix dev server. `docker-compose.prod.yml` = the
  production nginx + static stack (what deploy.sh runs on the Pi).
- Add new pages to the `@pages` list in `lib/mix/tasks/build_static.ex` plus a matching
  route/controller action (controllers/router/maintenance plug are kept for the dev
  server; they don't affect static output).
- Do not change `Dockerfile`, `docker-compose*.yml`, `nginx.conf`, or environment
  variables unless explicitly asked. Keep compatibility with the current build setup.

## Safety rules
- Never edit `.env`, secret files, auth credentials, or deployment settings without
  explicit approval.
- Never install packages unless the task explicitly allows it.
- Never delete large sections of code without explaining why.
- Never run destructive commands.

## Validation rules
After changes, run only the minimum relevant checks, in order:
1. Targeted test for the changed area, if one exists
2. Lint for changed files/project
3. Build, when appropriate

If a listed validation command is expensive, mention it before running.

## Test-driven development rules
- Always run `mix test` before committing or pushing any change. A passing run is
  required when the changed code is covered by existing tests.
- If a change breaks a test, fix the code (or the test if it is demonstrably wrong)
  before committing. Never skip or delete a test to make a build pass.
- When adding new testable logic (pure functions, scoring, data transformations), add
  tests for it in the same commit. Treat a red test as a blocker, not a warning.

## Output style
Be brief and concrete. State exactly what changed, any assumptions, and any follow-up risk.
