import React from "react";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

const W = 1920;
const H = 1080;
const FPS = 30;
const COLORS = {
  ink: "#171512",
  charcoal: "#211d19",
  paper: "#e9dcc0",
  paperLight: "#f5ecd9",
  faded: "#bca985",
  sepia: "#886844",
  bronze: "#aa8550",
  gold: "#d0ae70",
  burgundy: "#682e32",
  muted: "#766957",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const fade = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });
const lift = (f: number, a: number, b: number, d = 34) =>
  interpolate(f, [a, b], [d, 0], { ...clamp, easing: ease });

const Grain: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.18, mixBlendMode: "soft-light" }}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080">
      <defs>
        <pattern id="paperGrain" width="83" height="71" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="13" r="1.2" fill="#f4dfb8" opacity="0.42" />
          <circle cx="44" cy="31" r="0.8" fill="#130f0b" opacity="0.6" />
          <circle cx="71" cy="61" r="1.1" fill="#f4dfb8" opacity="0.25" />
          <path d="M15 53 l8 -1 M57 8 l4 1 M28 68 l5 -1" stroke="#30251a" strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#paperGrain)" />
      {Array.from({ length: 30 }, (_, i) => {
        const x = (i * 277 + 61) % 1920;
        const y = (i * 149 + Math.floor(frame * (i % 3 + 1) * 0.16)) % 1080;
        return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2 : 1.1} fill="#ead6af" opacity={0.12 + (i % 4) * 0.04} />;
      })}
    </svg>
  </AbsoluteFill>
);

const MapArt: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg viewBox="0 0 760 650" width="100%" height="100%" style={{ opacity }}>
    <defs>
      <pattern id="mapLines" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M0 22 L22 0" stroke="#987e58" strokeWidth="0.7" opacity="0.22" />
      </pattern>
    </defs>
    <rect width="760" height="650" fill="#d8c7a4" opacity="0.25" />
    <path d="M170 48 L250 75 292 111 354 120 390 165 435 190 460 246 506 279 489 326 450 356 431 409 398 451 370 515 327 574 296 543 279 494 248 455 234 405 194 373 181 329 143 289 130 245 96 215 117 165 149 125 Z" fill="#aa9169" fillOpacity="0.32" stroke="#826b48" strokeWidth="3" />
    <path d="M170 48 L250 75 292 111 354 120 390 165 435 190 460 246 506 279 489 326 450 356 431 409 398 451 370 515 327 574 296 543 279 494 248 455 234 405 194 373 181 329 143 289 130 245 96 215 117 165 149 125 Z" fill="url(#mapLines)" />
    <path d="M95 215 C190 186 259 208 330 248 S434 292 505 279 M145 290 C223 287 270 324 318 360 S403 387 450 356 M194 373 C252 390 283 430 296 543 M250 75 C260 150 280 189 330 248" fill="none" stroke="#866d49" strokeWidth="1.5" strokeDasharray="5 8" opacity="0.8" />
    <path d="M55 95 C210 38 335 85 422 180 S534 312 618 290" fill="none" stroke="#8d3736" strokeWidth="2.5" strokeDasharray="7 7" />
    <circle cx="330" cy="248" r="6" fill="#6b3030" /><circle cx="450" cy="356" r="5" fill="#6b3030" />
    <g fill="#5b4935" fontFamily="Georgia, serif" fontSize="16" letterSpacing="2">
      <text x="356" y="240">INDIA</text><text x="450" y="383" fontSize="12">EASTERN COAST</text>
      <text x="54" y="79" fontSize="12">MARITIME ROUTE</text><text x="32" y="615" fontSize="12">ILLUSTRATIVE MAP • NOT TO SCALE</text>
    </g>
    <path d="M570 92 l0 66 M555 112 l15 -20 15 20" stroke="#765f3d" strokeWidth="2" fill="none" />
    <text x="565" y="177" fill="#765f3d" fontSize="12" fontFamily="Georgia, serif">N</text>
  </svg>
);

const Paper: React.FC<{ width?: number; height?: number; rotate?: number; dark?: boolean; lines?: number; stamp?: string }> = ({
  width = 460, height = 560, rotate = -3, dark = false, lines = 11, stamp,
}) => (
  <div style={{
    width, height, boxSizing: "border-box", padding: "38px 34px",
    background: dark ? "linear-gradient(135deg,#d0bd97,#b7a17a)" : "linear-gradient(135deg,#f5ecd8,#dfcfad)",
    border: "1px solid rgba(83,60,34,.38)", boxShadow: "0 24px 50px rgba(0,0,0,.34)",
    transform: "rotate(" + rotate + "deg)", position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(105,78,45,.18)" }} />
    <div style={{ color: "#65513a", fontFamily: "Georgia,serif", fontSize: 13, letterSpacing: 2, textAlign: "center", marginBottom: 24 }}>
      {dark ? "OFFICIAL CORRESPONDENCE" : "ARCHIVAL RECORD"}
    </div>
    <div style={{ width: "58%", height: 2, background: "#927b57", margin: "0 auto 25px", opacity: 0.65 }} />
    {Array.from({ length: lines }, (_, i) => (
      <div key={i} style={{
        height: i % 4 === 1 ? 2 : 3, marginBottom: 15,
        width: (i % 5 === 0 ? 63 : i % 3 === 0 ? 78 : 94) + "%",
        background: i % 4 === 1 ? "#ad9774" : "#8e7859", opacity: 0.47,
      }} />
    ))}
    {stamp ? <div style={{
      position: "absolute", right: 26, bottom: 44, border: "3px solid " + COLORS.burgundy,
      color: COLORS.burgundy, padding: "9px 12px", fontFamily: "Georgia,serif",
      fontSize: 16, letterSpacing: 3, transform: "rotate(-13deg)", opacity: 0.78,
    }}>{stamp}</div> : null}
    <div style={{ position: "absolute", left: 34, bottom: 27, width: 100, height: 1, background: "#8b7655", opacity: 0.6 }} />
  </div>
);

const Dust: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {Array.from({ length: 24 }, (_, i) => {
      const progress = (frame * (0.24 + (i % 4) * 0.07) + i * 43) % 1160;
      return <div key={i} style={{
        position: "absolute", left: (i * 83 + 42) % 1920, top: 1080 - progress,
        width: i % 5 === 0 ? 4 : 2, height: i % 5 === 0 ? 4 : 2, borderRadius: "50%",
        background: "#ead5a9", opacity: 0.12 + (i % 5) * 0.035,
        boxShadow: "0 0 12px rgba(229,194,132,.18)",
      }} />;
    })}
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: COLORS.gold, fontSize: 16, letterSpacing: 5, fontWeight: 600, textTransform: "uppercase" }}>{children}</div>
);

const Heading: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 60 }) => (
  <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: size, lineHeight: 1.08, color: COLORS.paperLight, letterSpacing: -1 }}>{children}</div>
);

const Rule: React.FC<{ width?: number }> = ({ width = 140 }) => <div style={{ width, height: 2, background: "linear-gradient(90deg," + COLORS.gold + ",transparent)", marginTop: 28, marginBottom: 28 }} />;

const Base: React.FC<{ frame: number; children: React.ReactNode; parchment?: boolean }> = ({ frame, children, parchment = false }) => (
  <AbsoluteFill style={{
    overflow: "hidden", color: COLORS.paper, fontFamily: "Arial, Helvetica, sans-serif",
    background: parchment ? "radial-gradient(ellipse at 52% 44%,#4c3b2b 0%,#251e18 62%,#171411 100%)" : "radial-gradient(ellipse at 50% 40%,#383027 0%,#211c17 52%,#14120f 100%)",
  }}>
    <div style={{ position: "absolute", inset: 34, border: "1px solid rgba(204,174,119,.17)" }} />
    <div style={{ position: "absolute", inset: 48, border: "1px solid rgba(204,174,119,.06)" }} />
    <Grain frame={frame} />
    <Dust frame={frame} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.48) 100%)", pointerEvents: "none" }} />
    {children}
    <div style={{ position: "absolute", left: 72, right: 72, bottom: 42, display: "flex", justifyContent: "space-between", color: "#a3947a", fontSize: 12, letterSpacing: 2, opacity: 0.72 }}>
      <span>ARCHIVES OF MODERN INDIA</span><span>HISTORICAL SOURCES / {String(Math.floor(frame / FPS)).padStart(2, "0")}</span>
    </div>
  </AbsoluteFill>
);

const Scene: React.FC<{ index: number; title: string; kicker: string; duration: number; children: React.ReactNode }> = ({ index, title, kicker, duration, children }) => {
  const frame = useCurrentFrame();
  const enter = fade(frame, 0, 22);
  const exit = 1 - fade(frame, duration - 22, duration);
  return (
    <Base frame={frame}>
      <AbsoluteFill style={{ opacity: enter * exit }}>
        <div style={{ position: "absolute", top: 84, left: 92, right: 92, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Kicker>{kicker}</Kicker><div style={{ color: "#9f8d70", fontSize: 14, letterSpacing: 3 }}>0{index} / 08</div>
        </div>
        <div style={{ position: "absolute", top: 150, left: 92, right: 92 }}>
          <Heading size={58}>{title}</Heading><Rule />
        </div>
        {children}
      </AbsoluteFill>
    </Base>
  );
};

const Opening: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = fade(f, 10, 70);
  const mapScale = interpolate(f, [0, 240], [1.12, 1], { ...clamp, easing: ease });
  return (
    <Base frame={f} parchment>
      <div style={{ position: "absolute", right: 30, top: 120, width: 790, height: 680, opacity: 0.4 * reveal, transform: "scale(" + mapScale + ")" }}><MapArt /></div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(20,17,13,.96) 0%,rgba(20,17,13,.82) 46%,rgba(20,17,13,.14) 100%)" }} />
      <div style={{ position: "absolute", left: 150, top: 240, width: 1120, opacity: reveal, transform: "translateY(" + lift(f, 20, 82, 48) + "px)" }}>
        <Kicker>DOCUMENTARY / HISTORY / INDIA</Kicker>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 90, lineHeight: 1.02, letterSpacing: -2, color: COLORS.paperLight, marginTop: 34 }}>
          ARCHIVES OF<br /><span style={{ color: COLORS.gold }}>MODERN INDIA</span>
        </div>
        <Rule width={220} />
        <div style={{ color: "#d1c1a4", fontSize: 25, letterSpacing: 1.4 }}>Discovering the Past Through Historical Evidence</div>
        <div style={{ marginTop: 58, display: "flex", alignItems: "center", gap: 14, color: "#a9997e", fontSize: 13, letterSpacing: 3 }}>
          <span style={{ width: 42, height: 1, background: COLORS.gold }} /> RECORDS · MEMORY · INTERPRETATION
        </div>
      </div>
      <div style={{ position: "absolute", right: 180, bottom: 140, width: 350, height: 430, opacity: 0.8 * reveal, transform: "rotate(4deg)" }}><Paper width={350} height={430} rotate={-2} stamp="ARCHIVE" lines={9} /></div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.4),transparent 30%,transparent 70%,rgba(0,0,0,.45))" }} />
    </Base>
  );
};

const WhyArchives: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene index={2} title="Understanding the past" kicker="01 / WHY ARCHIVES MATTER" duration={510}>
      <div style={{ position: "absolute", left: 105, top: 335, width: 690, color: "#d4c5a9", fontSize: 27, lineHeight: 1.55, opacity: fade(f, 20, 55) }}>
        Archives preserve traces of administrative, legal, social and commercial life.
        <div style={{ marginTop: 20, fontSize: 19, color: "#9e8d72" }}>These records were often created for practical purposes—not for future historians.</div>
      </div>
      <div style={{ position: "absolute", left: 110, top: 680, display: "flex", gap: 14 }}>
        {["PRIMARY SOURCES", "ORIGINAL RECORDS", "EVIDENCE OF THE PAST"].map((label, i) => (
          <div key={label} style={{ borderTop: "2px solid " + COLORS.gold, paddingTop: 16, width: i === 2 ? 250 : 210, color: COLORS.paperLight, fontSize: 14, letterSpacing: 1.4, opacity: fade(f, 45 + i * 12, 75 + i * 12), transform: "translateY(" + lift(f, 45 + i * 12, 75 + i * 12, 18) + "px)" }}>{label}</div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 185, top: 315, transform: "rotate(7deg)", opacity: fade(f, 15, 55) }}><Paper width={420} height={500} rotate={-6} stamp="RECORD" lines={12} /></div>
      <div style={{ position: "absolute", right: 560, top: 430, color: COLORS.burgundy, fontFamily: "Georgia,serif", fontSize: 18, letterSpacing: 3, border: "1px solid " + COLORS.burgundy, padding: "10px 18px", transform: "rotate(-12deg)", opacity: fade(f, 65, 90) }}>SOURCE / ORIGINAL</div>
    </Scene>
  );
};

const OfficialRecords: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene index={3} title="The paper trail of government" kicker="02 / OFFICIAL RECORDS" duration={510}>
      <div style={{ position: "absolute", left: 120, top: 340, width: 570, fontSize: 25, lineHeight: 1.5, color: "#d4c5aa", opacity: fade(f, 20, 52) }}>
        Official archives help researchers reconstruct events and administrative developments through records left behind by institutions.
      </div>
      <div style={{ position: "absolute", left: 120, top: 650, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px", width: 560 }}>
        {["Government agencies", "Official correspondence", "Administrative decisions", "Registers & reports"].map((t, i) => (
          <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", opacity: fade(f, 38 + i * 8, 62 + i * 8) }}>
            <span style={{ color: COLORS.gold, fontSize: 22 }}>—</span><span style={{ fontSize: 18, color: COLORS.paperLight }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 130, top: 305, display: "flex", gap: 0, alignItems: "center", opacity: fade(f, 15, 52), transform: "translateY(" + lift(f, 15, 52, 24) + "px)" }}>
        <Paper width={330} height={430} rotate={-8} lines={10} />
        <div style={{ marginLeft: -170, marginTop: 130 }}><Paper width={330} height={430} rotate={5} dark stamp="FILED" lines={8} /></div>
        <div style={{ marginLeft: -160, marginTop: -80 }}><Paper width={290} height={380} rotate={-2} stamp="OFFICIAL" lines={9} /></div>
      </div>
    </Scene>
  );
};

const CompanyEra: React.FC = () => {
  const f = useCurrentFrame();
  const route = interpolate(f, [25, 130], [0, 1], { ...clamp, easing: ease });
  return (
    <Scene index={4} title="Trade, records and power" kicker="03 / EAST INDIA COMPANY" duration={540}>
      <div style={{ position: "absolute", left: 110, top: 340, width: 660, opacity: fade(f, 15, 50) }}>
        <div style={{ color: COLORS.gold, fontFamily: "Georgia,serif", fontSize: 92, letterSpacing: -2 }}>1600–1857</div>
        <Rule width={250} />
        <div style={{ fontSize: 26, lineHeight: 1.5, color: "#d5c7ae" }}>Company records document trading conditions and preserve evidence of how commercial and political decisions were made.</div>
        <div style={{ display: "flex", gap: 36, marginTop: 36, color: COLORS.paperLight, fontSize: 17, letterSpacing: 2 }}>
          <span>TRADE</span><span>COMMERCE</span><span>POLITICAL DEVELOPMENTS</span>
        </div>
      </div>
      <div style={{ position: "absolute", right: 100, top: 300, width: 760, height: 600, opacity: fade(f, 10, 45), transform: "scale(" + interpolate(f, [0, 540], [1.05, 1], { ...clamp }) + ")" }}>
        <MapArt />
        <svg viewBox="0 0 760 650" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <path d="M95 215 C210 38 335 85 422 180 S534 312 618 290" fill="none" stroke="#7e302f" strokeWidth="4" strokeDasharray={600} strokeDashoffset={600 * (1 - route)} />
          <circle cx="95" cy="215" r="7" fill="#7e302f" opacity={route} /><circle cx="618" cy="290" r="7" fill="#7e302f" opacity={route} />
        </svg>
      </div>
    </Scene>
  );
};

const CrownTransition: React.FC = () => {
  const f = useCurrentFrame();
  const split = interpolate(f, [70, 180], [0, 1], { ...clamp, easing: ease });
  return (
    <Scene index={5} title="A changing administration" kicker="04 / COMPANY TO CROWN" duration={450}>
      <div style={{ position: "absolute", left: 125, top: 345, width: 690, fontSize: 25, lineHeight: 1.55, color: "#d4c5a9", opacity: fade(f, 15, 50) }}>
        Comparing official records across periods helps historians trace change, examine policy and interpret the choices recorded by decision-makers.
      </div>
      <div style={{ position: "absolute", left: 130, top: 660, display: "flex", alignItems: "center", gap: 22, opacity: fade(f, 35, 68) }}>
        <div style={{ border: "1px solid #9e8359", padding: "18px 24px", color: COLORS.paperLight, fontSize: 17, letterSpacing: 1.5 }}>COMPANY RECORDS</div>
        <div style={{ width: 90, height: 1, background: COLORS.gold, position: "relative" }}><div style={{ position: "absolute", right: 0, top: -5, borderRight: "1px solid " + COLORS.gold, borderTop: "1px solid " + COLORS.gold, width: 9, height: 9, transform: "rotate(45deg)" }} /></div>
        <div style={{ border: "1px solid #9e8359", padding: "18px 24px", color: COLORS.paperLight, fontSize: 17, letterSpacing: 1.5, background: "rgba(104,46,50," + (0.08 + split * 0.28) + ")" }}>CROWN RECORDS</div>
      </div>
      <div style={{ position: "absolute", right: 165, top: 315, width: 430, height: 500, opacity: fade(f, 15, 55), transform: "rotate(" + (-4 + split * 5) + "deg)" }}><Paper width={430} height={500} rotate={-2} stamp="POLICY" lines={12} /></div>
      <div style={{ position: "absolute", right: 400, top: 385, color: COLORS.gold, fontSize: 13, letterSpacing: 3, opacity: split }}>DECISIONS / POLICIES / HISTORICAL CHANGE</div>
    </Scene>
  );
};

const EuropeanAccounts: React.FC = () => {
  const f = useCurrentFrame();
  const labels = ["PORTUGUESE RECORDS", "DUTCH RECORDS", "FRENCH RECORDS"];
  return (
    <Scene index={6} title="Many records, many perspectives" kicker="05 / EUROPEAN RECORDS & ACCOUNTS" duration={450}>
      <div style={{ position: "absolute", left: 110, top: 335, width: 760, fontSize: 23, lineHeight: 1.5, color: "#d4c5aa", opacity: fade(f, 15, 50) }}>
        Trading-company records, memoirs, biographies and travel accounts offer evidence for studying economic conditions and political structures.
      </div>
      <div style={{ position: "absolute", left: 115, top: 530, display: "flex", flexDirection: "column", gap: 18 }}>
        {labels.map((t, i) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 20, opacity: fade(f, 25 + i * 16, 55 + i * 16), transform: "translateX(" + lift(f, 25 + i * 16, 55 + i * 16, 25) + "px)" }}>
            <span style={{ width: 42, height: 1, background: COLORS.gold }} /><span style={{ color: COLORS.paperLight, fontSize: 18, letterSpacing: 2 }}>{t}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, paddingTop: 20, borderTop: "1px solid rgba(208,174,112,.35)", color: COLORS.gold, fontSize: 15, letterSpacing: 2, opacity: fade(f, 65, 95) }}>MEMOIRS · BIOGRAPHIES · TRAVEL ACCOUNTS</div>
      </div>
      <div style={{ position: "absolute", right: 170, top: 330, transform: "rotate(-5deg)", opacity: fade(f, 15, 55) }}><Paper width={350} height={450} rotate={-5} lines={10} /></div>
      <div style={{ position: "absolute", right: 380, top: 440, transform: "rotate(6deg)", opacity: fade(f, 42, 78) }}><Paper width={310} height={410} rotate={5} dark lines={9} stamp="TRAVEL" /></div>
    </Scene>
  );
};

const OtherSources: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene index={7} title="Beyond official documents" kicker="06 / OTHER HISTORICAL SOURCES" duration={540}>
      <div style={{ position: "absolute", left: 115, top: 330, width: 660, fontSize: 24, lineHeight: 1.5, color: "#d4c5a9", opacity: fade(f, 15, 48) }}>
        Newspapers and journals illuminate aspects of Indian society in the 19th and 20th centuries. Oral evidence, creative literature and paintings add further perspectives.
      </div>
      <div style={{ position: "absolute", left: 115, top: 620, display: "flex", flexWrap: "wrap", gap: 12, width: 650 }}>
        {["NEWSPAPERS & JOURNALS", "ORAL EVIDENCE", "CREATIVE LITERATURE", "PAINTINGS"].map((t, i) => (
          <div key={t} style={{ border: "1px solid rgba(208,174,112,.5)", padding: "15px 19px", color: i === 0 ? COLORS.paperLight : "#c6b594", background: i === 0 ? "rgba(104,46,50,.32)" : "rgba(0,0,0,.1)", fontSize: 14, letterSpacing: 1.2, opacity: fade(f, 35 + i * 15, 62 + i * 15) }}>{t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 125, top: 320, width: 560, height: 480, background: "#e8dcc4", padding: 32, boxSizing: "border-box", transform: "rotate(2deg)", boxShadow: "0 22px 55px rgba(0,0,0,.4)", opacity: fade(f, 12, 48) }}>
        <div style={{ fontFamily: "Georgia,serif", color: "#29231c", fontSize: 37, lineHeight: 1, borderBottom: "4px double #5d4c35", paddingBottom: 16, letterSpacing: -1 }}>THE DAILY CHRONICLE</div>
        <div style={{ color: "#5a4934", fontSize: 11, letterSpacing: 2, marginTop: 9 }}>HISTORICAL NEWSPAPER LAYOUT / ILLUSTRATIVE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 25 }}>
          {[0, 1, 2].map((col) => <div key={col}>{Array.from({ length: 13 }, (_, i) => <div key={i} style={{ height: i % 4 === 0 ? 5 : 3, marginBottom: 8, background: "#5c4b37", opacity: i % 4 === 0 ? 0.75 : 0.38, width: (i % 3 === 0 ? 75 : 100) + "%" }} />)}</div>)}
        </div>
        <div style={{ position: "absolute", right: 26, bottom: 28, color: "#8c3734", border: "1px solid #8c3734", padding: "7px 10px", fontSize: 11, letterSpacing: 2, transform: "rotate(-8deg)" }}>ILLUSTRATIVE DESIGN</div>
      </div>
    </Scene>
  );
};

const Closing: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 360], [1.12, 0.92], { ...clamp, easing: ease });
  const endFade = 1 - fade(f, 326, 360);
  return (
    <Base frame={f} parchment>
      <div style={{ position: "absolute", inset: 0, opacity: 0.3, transform: "scale(" + zoom + ")" }}><MapArt /></div>
      <div style={{ position: "absolute", left: 250, top: 150, width: 320, transform: "rotate(-7deg)", opacity: fade(f, 10, 55) }}><Paper width={320} height={420} rotate={-4} lines={9} /></div>
      <div style={{ position: "absolute", right: 220, top: 180, width: 310, transform: "rotate(5deg)", opacity: fade(f, 28, 72) }}><Paper width={310} height={400} rotate={3} dark stamp="ARCHIVE" lines={8} /></div>
      <div style={{ position: "absolute", left: 690, bottom: 95, width: 520, height: 180, background: "#e6d6b7", padding: 22, boxSizing: "border-box", transform: "rotate(-2deg)", opacity: fade(f, 45, 90), boxShadow: "0 20px 40px rgba(0,0,0,.35)" }}>
        <div style={{ color: "#604d34", fontFamily: "Georgia,serif", fontSize: 23, marginBottom: 18 }}>Notes from the past</div>
        {[0,1,2,3].map((i) => <div key={i} style={{ width: (90 - i * 7) + "%", height: 2, background: "#917a56", opacity: 0.5, marginBottom: 12 }} />)}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(23,20,16,.9),rgba(23,20,16,.72) 50%,rgba(23,20,16,.82))" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: endFade }}>
        <Kicker>THE HISTORIAN'S TASK</Kicker>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 78, lineHeight: 1.05, color: COLORS.paperLight, marginTop: 34, letterSpacing: 1 }}>THE PAST LEAVES<br /><span style={{ color: COLORS.gold }}>EVIDENCE.</span></div>
        <Rule width={210} />
        <div style={{ fontSize: 24, color: "#d2c3a6", letterSpacing: 0.5 }}>Archives help us reconstruct the history of modern India.</div>
      </div>
    </Base>
  );
};

export const ArchivesDocumentary: React.FC = () => (
  <>
    <Sequence from={0} durationInFrames={240}><Opening /></Sequence>
    <Sequence from={240} durationInFrames={510}><WhyArchives /></Sequence>
    <Sequence from={750} durationInFrames={510}><OfficialRecords /></Sequence>
    <Sequence from={1260} durationInFrames={540}><CompanyEra /></Sequence>
    <Sequence from={1800} durationInFrames={450}><CrownTransition /></Sequence>
    <Sequence from={2250} durationInFrames={450}><EuropeanAccounts /></Sequence>
    <Sequence from={2700} durationInFrames={540}><OtherSources /></Sequence>
    <Sequence from={3240} durationInFrames={360}><Closing /></Sequence>
  </>
);

export const ArchivesDocumentaryComposition: React.FC = () => (
  <Composition
    id="ArchivesOfModernIndia"
    component={ArchivesDocumentary}
    durationInFrames={3600}
    fps={FPS}
    width={W}
    height={H}
  />
);
