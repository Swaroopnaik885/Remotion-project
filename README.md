# Cinematic Tech Intro — Remotion

A 15-second, frame-deterministic motion-graphics intro built with React and Remotion.

## Creative direction

- Deep charcoal background with a subtle technical grid and vignette
- Luminous cyan/blue orbital geometry and deterministic data particles
- Editorial typography, precise labels, and layered title transitions
- Final brand-style reveal: **N / STUDIO — MAKE IT MOVE**

All visuals are drawn in React/CSS/SVG. No external footage, placeholder images, or additional packages are required.

## Composition

- **ID:** `CinematicTechIntro`
- **Resolution:** 1920 × 1080
- **Frame rate:** 30 FPS
- **Duration:** 450 frames / 15 seconds
- **Entry point:** `src/index.ts`

## Run on Windows

Open Command Prompt or PowerShell in the project directory and run:

```powershell
npm install
npm run dev
```

Remotion Studio should open in your browser. Select **CinematicTechIntro** and scrub the timeline to inspect transitions frame by frame.

## Render the MP4

```powershell
New-Item -ItemType Directory -Force out
npx remotion render src/index.ts CinematicTechIntro out/cinematic-tech-intro.mp4
```

The MP4 will be written to `out/cinematic-tech-intro.mp4`.

## Quality checks

```powershell
npm run lint
```

The GitHub-connected edit can update source files, but it cannot run this project's Windows environment or visually inspect a locally rendered MP4. Run the preview, render, and lint commands locally before treating the result as verified.

## Customization

Edit the copy and colors in `src/Composition.tsx`. The current brand text is a design direction and can be replaced with your own studio or company name.
