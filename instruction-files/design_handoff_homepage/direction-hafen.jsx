// Direction A — "Hafen" (tightened)
// Editorial serif headlines + mono accents, dense one-pager rhythm, waves only (no horizon).

function DirectionHafen({ lang = "de", fun = 35, localTouch = 50 }) {
  const t = COPY[lang];
  const touchA = Math.max(0, Math.min(1, localTouch / 100));
  const funA = Math.max(0, Math.min(1, fun / 100));

  const colors = {
    bg: "#eef2f1",
    ink: "#1a2b35",
    deep: "#26465a",
    sand: "#c9b87a",
    sandDeep: "#9f8a4e",
    rule: "rgba(38, 70, 90, 0.14)",
    soft: "rgba(38, 70, 90, 0.55)",
  };

  const css = `
    .hafen { font-family: 'Geist', system-ui, sans-serif; color: ${colors.ink}; background: ${colors.bg}; }
    .hafen .mono { font-family: 'Geist Mono', ui-monospace, monospace; font-feature-settings: 'ss01'; }
    .hafen .serif { font-family: 'Newsreader', 'Times New Roman', serif; font-weight: 350; }
    .hafen .label { font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: ${colors.soft}; }
    .hafen .section-label { font-family: 'Newsreader', serif; font-style: italic; font-weight: 350; font-size: 26px; line-height: 1; color: ${colors.sandDeep}; letter-spacing: -0.01em; }
    .hafen .section-label-mark { font-family: 'Geist Mono', monospace; font-style: normal; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: ${colors.soft}; margin-right: 10px; vertical-align: middle; }
    .hafen .rule { border-top: 1px solid ${colors.rule}; }
    .hafen-wave-anim { animation: hafen-drift ${10 - funA * 4}s ease-in-out infinite alternate; }
    @keyframes hafen-drift { from { transform: translateX(0); } to { transform: translateX(-14px); } }
    .hafen-wave-slow { animation: hafen-drift-slow ${16 - funA * 6}s ease-in-out infinite alternate; }
    @keyframes hafen-drift-slow { from { transform: translateX(0); } to { transform: translateX(8px); } }
    .hafen-cta {
      position: relative;
      display: inline-flex; align-items: center; gap: 14px; padding: 15px 22px;
      background: ${colors.deep}; color: #fbfaf6;
      font-family: 'Geist Mono', monospace; font-size: 14px; font-weight: 500;
      letter-spacing: 0.04em; text-transform: uppercase; border-radius: 3px;
      text-decoration: none;
      box-shadow: 0 1px 0 rgba(15, 31, 44, 0.08), inset 0 1px 0 rgba(255,255,255,0.06);
      transition: background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, transform 0.25s ease;
    }
    .hafen-cta:hover {
      background: ${colors.sand}; color: ${colors.deep};
      box-shadow: 0 4px 18px rgba(38, 70, 90, 0.18);
      transform: translateY(-1px);
    }
    .hafen-cta .arrow { display: inline-block; transition: transform 0.3s ease; }
    .hafen-cta:hover .arrow { transform: translateX(${4 + funA * 6}px); }
    .hafen-cta--ghost {
      background: transparent; color: ${colors.deep};
      border: 1px solid ${colors.rule}; box-shadow: none;
    }
    .hafen-cta--ghost:hover { border-color: ${colors.deep}; background: transparent; color: ${colors.deep}; }
    .hafen-cta--sand {
      background: ${colors.sand}; color: ${colors.deep};
      box-shadow: 0 1px 0 rgba(15, 31, 44, 0.08), inset 0 1px 0 rgba(255,255,255,0.25);
    }
    .hafen-cta--sand:hover {
      background: ${colors.deep}; color: #fbfaf6;
      box-shadow: 0 4px 18px rgba(38, 70, 90, 0.22);
    }
    .hafen-service { padding: 24px 0; border-top: 1px solid ${colors.rule}; display: grid; grid-template-columns: 60px 1fr 1.6fr 36px; gap: 28px; align-items: start; transition: padding-left 0.25s ease; }
    .hafen-service:last-child { border-bottom: 1px solid ${colors.rule}; }
    .hafen-service:hover { padding-left: ${funA > 0.3 ? "8px" : "0px"}; }
    .hafen-service-num { font-family: 'Geist Mono', monospace; font-size: 11px; color: ${colors.soft}; padding-top: 8px; letter-spacing: 0.04em; }
    .hafen-service-name { font-family: 'Newsreader', serif; font-weight: 350; font-size: 28px; line-height: 1.15; letter-spacing: -0.01em; }
    .hafen-service-body { font-size: 15px; line-height: 1.6; color: ${colors.ink}; max-width: 42ch; }
    .hafen-service-arrow { font-family: 'Geist Mono', monospace; font-size: 14px; color: ${colors.sandDeep}; padding-top: 8px; text-align: right; transition: transform 0.25s ease; }
    .hafen-service:hover .hafen-service-arrow { transform: translateX(4px); color: ${colors.deep}; }
    .hafen a { color: inherit; }
  `;

  // Wave row: render only when localTouch > 15
  const waveRow = (count = 3, opacity = 1, gap = 9, amp = 4) =>
    touchA > 0.15 ? (
      <div className={funA > 0.35 ? "hafen-wave-anim" : ""} style={{ color: colors.deep, opacity: opacity * (0.4 + touchA * 0.55) }}>
        <WaveLine width={1280} amp={amp} period={56} stroke={colors.deep} strokeWidth={1} count={count} gap={gap} />
      </div>
    ) : null;

  return (
    <div className="hafen" style={{ width: 1280, minHeight: 1800, position: "relative", overflow: "hidden" }}>
      <style>{css}</style>

      {/* Top bar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", padding: "24px 48px 0", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: "0.02em" }}>
          <span style={{ color: colors.deep, fontWeight: 600 }}>Reibisch</span>
          <span style={{ color: colors.soft }}>  ·  Software & Beratung</span>
        </div>
        <div className="mono" style={{ display: "flex", gap: 24, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.soft, justifyContent: "center" }}>
          <span>{t.nav.work}</span>
          <span>{t.nav.about}</span>
          <span>{t.nav.contact}</span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: colors.soft, letterSpacing: "0.06em", textAlign: "right" }}>
          53°33′N · 9°59′E
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: "64px 48px 48px", position: "relative" }}>
        <div className="label" style={{ marginBottom: 20, fontSize: 13 }}>{t.hero.eyebrow}</div>
        <h1 className="serif" style={{ fontSize: 104, lineHeight: 0.96, letterSpacing: "-0.028em", margin: 0, color: colors.deep, maxWidth: "14ch" }}>
          {t.hero.question}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 36, alignItems: "end" }}>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.45, color: colors.ink, margin: 0, maxWidth: "34ch", fontStyle: "italic", opacity: 0.85 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
            <a href={`mailto:${t.contact.email}`} className="hafen-cta hafen-cta--sand">
              {t.hero.cta} <span className="arrow">→</span>
            </a>
            <div className="mono" style={{ fontSize: 11, color: colors.soft, letterSpacing: "0.05em" }}>
              {t.contact.meta.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      {/* Wave separator — replaces the old horizon */}
      <div style={{ overflow: "hidden", marginTop: 8 }}>
        {waveRow(3, 0.85, 9, 4)}
      </div>

      {/* About */}
      <section style={{ padding: "56px 48px 56px", display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 48 }}>
        <div className="section-label" style={{ paddingTop: 8 }}>
            <span className="section-label-mark">01</span>
            {lang === "de" ? "Über" : "About"}
        </div>
        <div>
          <div className="serif" style={{ fontSize: 42, lineHeight: 1.05, color: colors.deep, marginBottom: 8, letterSpacing: "-0.015em" }}>
            {t.about.title}
          </div>
          <div className="mono" style={{ fontSize: 13, color: colors.sandDeep, letterSpacing: "0.04em", marginBottom: 24 }}>
            {t.about.role}
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: "44ch", textWrap: "pretty" }}>
            {t.about.body}
          </p>
        </div>
        <div style={{ paddingTop: 60 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
            {t.about.points.map((p, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, alignItems: "baseline" }}>
                <span className="mono" style={{ fontSize: 11, color: colors.sandDeep, letterSpacing: "0.05em" }}>
                  0{i + 1}/
                </span>
                <span className="serif" style={{ fontSize: 19, lineHeight: 1.35, color: colors.ink, fontStyle: "italic" }}>
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "56px 48px 64px", borderTop: `1px solid ${colors.rule}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr auto", gap: 48, alignItems: "baseline", marginBottom: 24 }}>
          <div className="section-label">
            <span className="section-label-mark">02</span>
            {lang === "de" ? "Leistungen" : "Services"}
          </div>
          <h2 className="serif" style={{ fontSize: 48, margin: 0, lineHeight: 1, color: colors.deep, letterSpacing: "-0.02em" }}>
            {t.services.title}
          </h2>
          <div className="label" style={{ fontSize: 12 }}>3 {lang === "de" ? "Bereiche" : "areas"}</div>
        </div>
        <div>
          {t.services.items.map((s) => (
            <div key={s.tag} className="hafen-service">
              <div className="hafen-service-num">{s.tag} —</div>
              <div className="hafen-service-name" style={{ color: colors.deep }}>{s.name}</div>
              <div className="hafen-service-body">{s.body}</div>
              <div className="hafen-service-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Wave separator before contact */}
      <div style={{ overflow: "hidden" }}>
        {waveRow(2, 0.7, 10, 3)}
      </div>

      {/* Contact band */}
      <section style={{ padding: "64px 48px 48px", background: colors.deep, color: colors.bg, position: "relative", overflow: "hidden" }}>
        {/* In-band waves (light) */}
        {touchA > 0.3 && (
          <div className="hafen-wave-slow" style={{ position: "absolute", inset: 0, color: colors.sand, opacity: 0.18, display: "flex", alignItems: "center" }}>
            <WaveLine width={1400} amp={6} period={80} stroke={colors.sand} strokeWidth={1} count={4} gap={28} opacity={1} />
          </div>
        )}

        <div className="section-label" style={{ color: colors.sand, marginBottom: 18, position: "relative" }}>
          <span className="section-label-mark" style={{ color: "rgba(238, 242, 241, 0.55)" }}>03</span>
          {lang === "de" ? "Kontakt" : "Contact"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "end", position: "relative" }}>
          <h2 className="serif" style={{ fontSize: 68, margin: 0, lineHeight: 1, letterSpacing: "-0.025em" }}>
            {t.contact.title}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0, maxWidth: "38ch", color: "rgba(238, 242, 241, 0.78)", textWrap: "pretty" }}>
            {t.contact.sub}
          </p>
        </div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(238, 242, 241, 0.18)", paddingTop: 24, position: "relative", flexWrap: "wrap", gap: 16 }}>
          <a href={`mailto:${t.contact.email}`} className="serif" style={{ fontSize: 38, color: colors.sand, textDecoration: "none", letterSpacing: "-0.01em" }}>
            {t.contact.email}
          </a>
          <a href={`mailto:${t.contact.email}`} className="hafen-cta hafen-cta--sand">
            {t.contact.cta} <span className="arrow">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 11, color: colors.soft, letterSpacing: "0.06em" }}>
          © 2026 · Tomke Reibisch · {t.footer.colophon}
        </div>
        <div className="mono" style={{ display: "flex", gap: 24, fontSize: 11, color: colors.soft, letterSpacing: "0.06em" }}>
          <span>{t.footer.impressum}</span>
          <span>{t.footer.privacy}</span>
        </div>
      </footer>
    </div>
  );
}

window.DirectionHafen = DirectionHafen;
