// Bilingual content for Reibisch — DE/EN
// Keep tone: direct, warm, no corporate BS, no condescension.

const COPY = {
  de: {
    nav: { work: "Arbeit", about: "Über mich", contact: "Kontakt" },
    hero: {
      eyebrow: "Software · Apps · Beratung",
      question: "Was klemmt?",
      sub: "Erzählen Sie mir, woran Sie hängen — was unklar ist, was schief läuft, was niemand richtig erklärt hat. Wir finden gemeinsam einen Weg, der zu Ihnen passt.",
      cta: "Schreiben Sie mir",
    },
    about: {
      title: "Tomke Reibisch",
      role: "Entwickler & Berater · Norddeutschland",
      body:
        "Ich baue Software, seit das noch \u201eHomepages\u201c hieß. Heute heißt es Apps, APIs, Plattformen — die Grundfrage bleibt: Was soll das Ding eigentlich tun? Ich höre zu, stelle ein paar unbequeme Fragen, und liefere etwas, das funktioniert. Pragmatisch, ohne Showeffekte.",
      points: [
        "Ich höre erst zu, dann baue ich.",
        "Komplexität ist Schulden, keine Eleganz.",
        "Ihre Endkund:innen sind nicht Sie. Das merkt man der Software an.",
      ],
    },
    services: {
      title: "Was ich mache",
      kicker: "// services",
      items: [
        {
          tag: "01",
          name: "Software-Entwicklung",
          body: "Backends, Integrationen, Datenpipelines. Lange Lebensdauer, wenig Drama. Auch dann, wenn etwas Bestehendes zu retten ist.",
        },
        {
          tag: "02",
          name: "App-Entwicklung",
          body: "Web- und Mobile-Apps von der Idee bis zum Release. Klein anfangen, sauber wachsen, an echten Nutzer:innen testen.",
        },
        {
          tag: "03",
          name: "Beratung",
          body: "Web-Auftritte, Usability, Produktklarheit. Wo ist der Knoten? Was kostet Ihre Kund:innen heute Geduld? Ich finde es heraus, Sie entscheiden.",
        },
      ],
    },
    contact: {
      title: "Reden wir",
      sub: "Ein kurzer Anriss reicht. Eine Skizze, ein Screenshot, ein Satz — egal. Ich melde mich innerhalb von zwei Werktagen.",
      email: "hallo@reibisch.de",
      cta: "Hallo sagen",
      meta: "Antwort meist innerhalb 48h",
    },
    footer: {
      colophon: "Norddeutschland · Festland & Küste",
      impressum: "Impressum",
      privacy: "Datenschutz",
    },
  },
  en: {
    nav: { work: "Work", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Software · Apps · Consulting",
      question: "What's getting in the way?",
      sub: "Tell me where you're stuck — what's confusing, what's slipping, what nobody has properly explained. We'll find a way forward that actually fits your situation.",
      cta: "Send me a note",
    },
    about: {
      title: "Tomke Reibisch",
      role: "Developer & consultant · Northern Germany",
      body:
        "I've been building software since we still called them \u201chomepages\u201d. Now it's apps, APIs, platforms — the underlying question hasn't changed: what is this thing actually supposed to do? I listen, ask a few uncomfortable questions, and ship something that works. Pragmatic, no theatre.",
      points: [
        "Listening first. Building second.",
        "Complexity is debt, not elegance.",
        "Your end-users aren't you. It shows in the product.",
      ],
    },
    services: {
      title: "What I do",
      kicker: "// services",
      items: [
        {
          tag: "01",
          name: "Software development",
          body: "Backends, integrations, data pipelines. Built to last, low on drama. Including the rescue jobs nobody else wants.",
        },
        {
          tag: "02",
          name: "App creation",
          body: "Web and mobile apps from sketch to release. Start small, grow cleanly, validate with people who'll actually use it.",
        },
        {
          tag: "03",
          name: "Consulting",
          body: "Web presence, usability, product clarity. Where's the knot? What's costing your customers patience today? I figure it out — you decide what to do.",
        },
      ],
    },
    contact: {
      title: "Let's talk",
      sub: "A rough sketch is enough. A screenshot, a paragraph, a single confused sentence — whatever you have. I'll get back to you within two business days.",
      email: "hallo@reibisch.de",
      cta: "Say hello",
      meta: "Usually answers within 48h",
    },
    footer: {
      colophon: "Northern Germany · mainland & coast",
      impressum: "Imprint",
      privacy: "Privacy",
    },
  },
};

// Shared SVG motifs — used by all three directions, varying intensity via `localTouch`.

function WaveLine({ width = 320, amp = 6, period = 32, stroke = "currentColor", strokeWidth = 1.25, opacity = 1, dash, count = 1, gap = 14, style }) {
  // Render `count` parallel sine waves stacked vertically.
  const segs = [];
  const step = 4;
  for (let i = 0; i < width; i += step) {
    segs.push(i);
  }
  const path = (yOff) => {
    let d = `M 0 ${yOff}`;
    segs.forEach((x) => {
      const y = yOff + Math.sin((x / period) * Math.PI * 2) * amp;
      d += ` L ${x} ${y}`;
    });
    return d;
  };
  const height = amp * 2 + (count - 1) * gap + 4;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <path
          key={i}
          d={path(amp + 2 + i * gap)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={opacity * (1 - i * 0.15)}
          strokeDasharray={dash}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function HorizonLine({ width = 560, height = 80, stroke = "currentColor", showSun = false, sunColor = "#c9b87a", opacity = 1, style }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} aria-hidden="true">
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={stroke} strokeWidth="1" opacity={opacity} />
      {showSun && (
        <circle cx={width * 0.78} cy={height / 2} r="10" fill={sunColor} opacity={opacity * 0.9} />
      )}
      <line x1="0" y1={height / 2 + 8} x2={width * 0.4} y2={height / 2 + 8} stroke={stroke} strokeWidth="0.5" opacity={opacity * 0.4} strokeDasharray="2 6" />
    </svg>
  );
}

function CompassMark({ size = 60, stroke = "currentColor", opacity = 1, style }) {
  // Tiny compass — N marker, no full rose.
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={style} aria-hidden="true">
      <circle cx="30" cy="30" r="22" stroke={stroke} strokeWidth="1" fill="none" opacity={opacity * 0.6} />
      <line x1="30" y1="6" x2="30" y2="14" stroke={stroke} strokeWidth="1.25" opacity={opacity} />
      <line x1="30" y1="46" x2="30" y2="54" stroke={stroke} strokeWidth="0.5" opacity={opacity * 0.5} />
      <line x1="6" y1="30" x2="14" y2="30" stroke={stroke} strokeWidth="0.5" opacity={opacity * 0.5} />
      <line x1="46" y1="30" x2="54" y2="30" stroke={stroke} strokeWidth="0.5" opacity={opacity * 0.5} />
      <text x="30" y="5" textAnchor="middle" fontSize="6" fill={stroke} opacity={opacity} fontFamily="monospace">N</text>
      <circle cx="30" cy="30" r="1.5" fill={stroke} opacity={opacity} />
    </svg>
  );
}

function LighthouseMark({ size = 48, color = "currentColor", opacity = 1, style }) {
  // Stylized lighthouse silhouette — schematic, not illustrative.
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 48 72" style={style} aria-hidden="true">
      <g stroke={color} fill="none" strokeWidth="1.25" opacity={opacity}>
        <path d="M18 8 L24 4 L30 8" />
        <line x1="24" y1="4" x2="24" y2="0" />
        <rect x="20" y="8" width="8" height="6" />
        <path d="M18 14 L30 14 L32 22 L16 22 Z" />
        <path d="M14 22 L34 22 L36 64 L12 64 Z" />
        <line x1="14" y1="34" x2="34" y2="34" />
        <line x1="14" y1="46" x2="34" y2="46" />
        <line x1="14" y1="58" x2="34" y2="58" />
        <line x1="6" y1="68" x2="42" y2="68" />
      </g>
    </svg>
  );
}

window.COPY = COPY;
window.WaveLine = WaveLine;
window.HorizonLine = HorizonLine;
window.CompassMark = CompassMark;
window.LighthouseMark = LighthouseMark;
