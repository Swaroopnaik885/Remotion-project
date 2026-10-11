# Remotion Motion Graphics Projects

This repository contains two frame-deterministic motion-graphics compositions built with React and Remotion.

## 1. Archives of Modern India

A 120-second historical documentary sequence designed for an M.Sc. Computer Science educational presentation. Its visual language uses parchment, archival paper, illustrative map artwork, newspaper layouts, restrained gold accents, and editorial typography. The archival documents and newspaper are original procedural illustrations, not authenticated historical artefacts.

- **Composition ID:** `ArchivesOfModernIndia`
- **Resolution:** 1920 × 1080 (16:9)
- **Frame rate:** 30 FPS
- **Duration:** 3,600 frames / 120 seconds
- **Scenes:** Opening; why archives matter; official records; East India Company records (1600–1857); Company-to-Crown administrative transition; Portuguese, Dutch and French records plus memoirs/travel accounts; newspapers, oral evidence, creative literature and paintings; closing.
- **Visual assets:** CSS, SVG and React components. No extra packages or external image downloads.
- **Audio:** No narration or music is bundled; the visuals are ready for later audio integration.

### Historical-content note

The source text supplied with the implementation request contained a placeholder where the full passage was expected. The video therefore uses the historical points explicitly enumerated in that request. It does not add named historical figures, quoted archival text, or claims about the provenance of its illustrative documents.

## 2. Cinematic Tech Intro

The original 15-second technology-brand intro remains registered as a separate composition.

- **Composition ID:** `CinematicTechIntro`
- **Resolution:** 1920 × 1080
- **Frame rate:** 30 FPS
- **Duration:** 450 frames / 15 seconds

## Project structure

- `src/index.ts` — Remotion entry point
- `src/Root.tsx` — registers both compositions
- `src/Composition.tsx` — original tech intro
- `src/ArchivesDocumentary.tsx` — historical documentary scenes and reusable visual components

## Run on Windows

Open PowerShell in the repository directory:

```powershell
npm install
npm run dev
```

In Remotion Studio, select **ArchivesOfModernIndia** to preview and scrub the timeline. Select **CinematicTechIntro** to preview the original intro.

## Quality checks

```powershell
npm run lint
```

## Render the documentary MP4

```powershell
New-Item -ItemType Directory -Force out
npx remotion render src/index.ts ArchivesOfModernIndia out/archives-of-modern-india.mp4
```

The output path is `out/archives-of-modern-india.mp4`. Remotion uses its standard H.264 MP4 output by default.

## Render the original tech intro

```powershell
New-Item -ItemType Directory -Force out
npx remotion render src/index.ts CinematicTechIntro out/cinematic-tech-intro.mp4
```

## Verification status

The repository source files were updated through GitHub. This environment cannot execute the project in your Windows installation or visually inspect a locally rendered MP4. Run `npm run lint`, preview in Remotion Studio, and render locally to complete verification.
