# Fence Sitter: Tech Stack & Code Logic

This document details the software architecture, technical stack, file structure, and core execution logic of the **Fence Sitter** app.

---

## Technical Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Mobile Wrapper**: [Capacitor CLI 8](https://capacitorjs.com/)
- **Linting**: [Oxlint](https://oxc.rs/docs/guide/usage/linter)

---

## Core Architecture & Directory Layout
```
post-like-a-celeb/
├── .gitignore
├── capacitor.config.ts        # Capacitor configuration
├── package.json               # Dependencies and build scripts
├── vite.config.ts             # Vite configurations
│
├── docs/                      # Core Design & Logic Docs
│   ├── idea.md                # Concept, Tagline, Gameplay, Features
│   └── logic.md               # Tech Stack, Architecture, Engines
│
└── src/                       # Application Source
    ├── main.tsx               # Entrypoint script
    ├── App.tsx                # Main Screen layout and interaction logic
    ├── App.css                # Screen and app level transitions & styles
    ├── index.css              # Typography and global variables
    │
    ├── components/
    │   ├── BoundingBox.tsx    # Responsive viewport container (handles fluid vs card scaling)
    │   ├── CelebrityCard.tsx  # Dynamic component rendering X/Tweet or Instagram card layouts
    │   └── ShareModal.tsx     # Sharing options overlay (native file sharing, direct download)
    │
    ├── hooks/
    │   └── useGameLoop.ts     # Animation-frame timer (optionally drives minor particle or glow effects)
    │
    └── utils/
        ├── topics.ts          # Core dictionary of topics and post text generators
        └── imageExporter.ts   # Helper that converts React cards (using canvas or SVG) to downloadable PNGs
```

---

## Core Subsystems & Logic Flow

### 1. The Topic & Post Generation Engine ([src/utils/topics.ts](../src/utils/topics.ts))
This module exports static definitions and generator logic:
- `topics`: Dictionary containing 21 controversial, high-stakes topics (defined in [topics.md](topics.md)), featuring custom vocabulary attributes.
- `generatePost(topicId)`: Generates the post content:
  - Selects between 1 (minimum) and 3 (maximum) random performative apathy styles from a list of 18 distinct styles (defined in [performative-apathy-styles.md](performative-apathy-styles.md)).
  - Combines the grammar blueprints (intros, topic-specific stances, and outros) of the selected styles using a dynamic Tracery compiler configuration to create a blended, satirical statement.
  - Returns a unified `GeneratedPost` object featuring the generic **Neutral Voice** (`@the_neutral_take`) profile metadata and the list of `activeStyles` names mixed in the generation.

### 2. Platform Style Renderers ([src/components/CelebrityCard.tsx](../src/components/CelebrityCard.tsx))
Supports two layout styles selectable via tabs on the Preview screen:
- **Text Post Layout**:
  - Displays the generated apathy statement as a text block in a styled card frame matching the Vivid Satire theme layout.
- **Image Post Layout**:
  - Embeds the quote text inside a premium glassmorphic overlay block centered on a brand gradient background canvas.
  - Displays the Instagram-style like counts, captions, and bookmark actions below the canvas.
- **SVG Vector Icons**: To guarantee offline-friendly exports without font dependency errors, all icons (verified badge, heart, chat bubble, send arrow, bookmark) are hardcoded as inline SVG coordinates rather than web font ligatures.

### 3. Client-Side Image Export Engine ([src/utils/imageExporter.ts](../src/utils/imageExporter.ts))
Converts the active React component layout into a shareable image file:
- Serializes the target `CelebrityCard` HTML DOM structure (utilizing inline CSS styles and SVG vector paths) inside an SVG `<foreignObject>` block.
- Base64 encodes the SVG string, loads it into a canvas, and extracts a pixel-perfect PNG Data URL string.

### 4. Sharing Pipeline ([src/components/ShareModal.tsx](../src/components/ShareModal.tsx))
Redesigned in the Vivid Satire theme, it provides exactly three actions:
- **Download PNG**: Triggers direct file download.
- **Share to Instagram**: Save files natively on mobile, or download and show toast instructions on desktop.
- **Share to X**: Opens X Tweet composer with pre-filled content (or native system share on mobile).

