import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  bg: "#05070B",
  white: "#F4F7FB",
  muted: "#7E8A9B",
  cyan: "#72F6E8",
  blue: "#547BFF",
  line: "rgba(148, 171, 198, 0.13)",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ease = Easing.bezier(0.22, 1, 0.36, 1);

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { ...clamp, easing: ease });

const rise = (frame: number, start: number, end: number, distance = 36) =>
  interpolate(frame, [start, end], [distance, 0], { ...clamp, easing: ease });

const Grid = () => (
  <AbsoluteFill style={{ opacity: 0.72 }}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M 72 0 L 0 0 0 72" fill="none" stroke={C.line} strokeWidth="1" />
        </pattern>
        <radialGradient id="gridFade">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="gridMask">
          <rect width="1920" height="1080" fill="url(#gridFade)" />
        </mask>
      </defs>
      <rect width="1920" height="1080" fill="url(#grid)" mask="url(#gridMask)" />
    </svg>
  </AbsoluteFill>
);

const OrbitalMark: React.FC<{ frame: number }> = ({ frame }) => {
  const intro = fade(frame, 22, 78);
  const rotation = interpolate(frame, [0, 450], [-24, 42]);
  const scale = interpolate(frame, [20, 95, 450], [0.72, 1, 1.04], { ...clamp, easing: ease });
  const pulse = 0.78 + Math.sin(frame / 18) * 0.06;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "43%",
        width: 390,
        height: 390,
        opacity: intro,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 20,
          borderRadius: "50%",
          border: "1px solid rgba(114,246,232,0.28)",
          boxShadow: "0 0 80px rgba(84,123,255,0.10), inset 0 0 70px rgba(114,246,232,0.04)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 56,
          borderRadius: "50%",
          border: "1px solid rgba(114,246,232,0.55)",
          transform: "rotateX(68deg) rotateZ(18deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 70,
          borderRadius: "50%",
          border: "1px solid rgba(84,123,255,0.62)",
          transform: "rotateY(68deg) rotateZ(-28deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 98,
          borderRadius: "50%",
          border: "1px solid rgba(244,247,251,0.34)",
          transform: "rotateX(66deg) rotateZ(58deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 136,
          height: 136,
          borderRadius: 34,
          transform: `translate(-50%, -50%) rotate(45deg) scale(${pulse})`,
          background: "linear-gradient(135deg, rgba(114,246,232,0.96), rgba(84,123,255,0.92) 58%, rgba(28,37,71,0.95))",
          boxShadow: "0 0 34px rgba(114,246,232,0.28), 0 0 110px rgba(84,123,255,0.22)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: 33,
            background: "linear-gradient(135deg, rgba(255,255,255,0.7), transparent 42%)",
            opacity: 0.72,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: C.white,
          boxShadow: "0 0 18px 5px rgba(114,246,232,0.8)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

const DataParticle: React.FC<{ x: number; y: number; delay: number; size: number; frame: number }> = ({
  x, y, delay, size, frame,
}) => {
  const progress = (frame * 0.8 + delay * 13) % 180;
  const opacity = interpolate(progress, [0, 20, 130, 180], [0, 0.8, 0.45, 0], { ...clamp });
  const drift = interpolate(progress, [0, 180], [28, -28]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + drift,
        width: size,
        height: size,
        borderRadius: "50%",
        background: delay % 2 ? C.cyan : C.blue,
        opacity,
        boxShadow: `0 0 ${size * 4}px ${size}px rgba(114,246,232,0.18)`,
      }}
    />
  );
};

const CornerLabel: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <div style={{ position: "absolute", top: 58, left: 76, opacity: fade(frame, 8, 38), display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 9, height: 9, background: C.cyan, borderRadius: "50%", boxShadow: `0 0 16px ${C.cyan}` }} />
      <span style={{ color: C.white, fontSize: 16, letterSpacing: 4, fontWeight: 650 }}>N / STUDIO</span>
    </div>
    <div style={{ position: "absolute", top: 62, right: 76, opacity: fade(frame, 10, 40), color: C.muted, fontSize: 12, letterSpacing: 3 }}>
      CREATIVE SYSTEMS — 001
    </div>
    <div style={{ position: "absolute", bottom: 58, left: 76, opacity: fade(frame, 30, 58), color: C.muted, fontSize: 12, letterSpacing: 2 }}>
      DESIGNING WHAT COMES NEXT
    </div>
    <div style={{ position: "absolute", bottom: 58, right: 76, opacity: fade(frame, 30, 58), color: C.muted, fontSize: 12, letterSpacing: 2 }}>
      30 FPS&nbsp;&nbsp; / &nbsp;&nbsp;FRAME {String(Math.floor(frame)).padStart(3, "0")}
    </div>
  </>
);

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = fade(frame, 92, 132);
  const titleOut = 1 - fade(frame, 228, 254);
  const titleY = rise(frame, 92, 132, 54);
  const subIn = fade(frame, 125, 160);
  const reveal = fade(frame, 260, 306);
  const endIn = fade(frame, 326, 365);
  const endY = rise(frame, 326, 365, 26);
  const lineWidth = interpolate(frame, [24, 100, 300, 400], [0, 440, 780, 780], { ...clamp, easing: ease });
  const vignette = interpolate(frame, [0, 70, 450], [0.45, 0.78, 0.84], { ...clamp });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, color: C.white, overflow: "hidden", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <Grid />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 42%, rgba(29,52,86,0.44) 0%, rgba(5,7,11,0.1) 34%, rgba(5,7,11,0.94) 82%)",
          opacity: vignette,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 980,
          height: 980,
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(39,92,131,0.18), rgba(19,31,58,0.07) 42%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      {Array.from({ length: 26 }, (_, i) => (
        <DataParticle
          key={i}
          x={100 + ((i * 197) % 1720)}
          y={100 + ((i * 137) % 850)}
          delay={i * 7}
          size={i % 4 === 0 ? 3 : 2}
          frame={frame}
        />
      ))}

      <OrbitalMark frame={frame} />
      <CornerLabel frame={frame} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 730,
          width: lineWidth,
          height: 1,
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, transparent, rgba(114,246,232,0.6), rgba(84,123,255,0.8), transparent)",
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 660,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleIn * titleOut,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ fontSize: 13, color: C.cyan, letterSpacing: 7, fontWeight: 600, marginBottom: 20 }}>
          IMAGINATION, ENGINEERED
        </div>
        <div style={{ fontSize: 94, lineHeight: 0.98, letterSpacing: -5, fontWeight: 750 }}>
          BEYOND <span style={{ color: C.cyan }}>POSSIBLE.</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 820,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subIn * titleOut,
          transform: `translateY(${rise(frame, 125, 160, 18)}px)`,
          color: "#A8B4C4",
          fontSize: 18,
          letterSpacing: 2.2,
        }}
      >
        Motion. Meaning. Momentum.
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,11,0.96), rgba(5,7,11,0.12) 35%, rgba(5,7,11,0.12) 60%, rgba(5,7,11,0.98))",
          opacity: reveal,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 700,
          height: 700,
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [260, 330], [0.7, 1.15], { ...clamp, easing: ease })})`,
          borderRadius: "50%",
          border: "1px solid rgba(114,246,232,0.28)",
          boxShadow: "0 0 100px rgba(84,123,255,0.13), inset 0 0 100px rgba(114,246,232,0.04)",
          opacity: reveal * 0.85,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          opacity: endIn,
          transform: `translateY(${endY}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 25 }}>
          <div style={{ width: 42, height: 2, background: C.cyan, boxShadow: `0 0 15px ${C.cyan}` }} />
          <span style={{ color: C.cyan, fontSize: 14, letterSpacing: 6, fontWeight: 600 }}>N / STUDIO PRESENTS</span>
          <div style={{ width: 42, height: 2, background: C.cyan, boxShadow: `0 0 15px ${C.cyan}` }} />
        </div>
        <div style={{ fontSize: 112, lineHeight: 1, fontWeight: 800, letterSpacing: -7 }}>
          MAKE <span style={{ color: C.cyan }}>IT</span> MOVE
        </div>
        <div style={{ marginTop: 26, fontSize: 16, color: "#9BA8BA", letterSpacing: 4 }}>
          IDEAS INTO IMPACT
        </div>
        <div style={{ marginTop: 58, height: 2, width: interpolate(frame, [350, 400], [0, 190], { ...clamp, easing: ease }), background: C.cyan, boxShadow: `0 0 20px ${C.cyan}` }} />
      </div>

      <AbsoluteFill
        style={{
          backgroundColor: C.bg,
          opacity: interpolate(frame, [0, 14, 440, 450], [1, 0, 0, 1], { ...clamp }),
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 34%, rgba(0,0,0,0.48) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="CinematicTechIntro"
      component={MyComponent}
      durationInFrames={15 * 30}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
