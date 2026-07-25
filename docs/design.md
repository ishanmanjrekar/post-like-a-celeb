---
name: Vivid Satire
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#5c3f41'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0037'
  primary: '#ba0035'
  on-primary: '#ffffff'
  primary-container: '#e12149'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b6'
  secondary: '#006970'
  on-secondary: '#ffffff'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b6'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920028'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffe170'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is built on a foundation of "Hyper-Social Optimism"—a visual language that pairs the high-energy aesthetics of modern social platforms with a satirical, trendy edge. The brand personality is unapologetically casual and approachable, using exaggerated UI metaphors to evoke a sense of playfulness and digital-native irony.

The aesthetic direction is a hybrid of **Soft Minimalism** and **Glassmorphism**. It prioritizes heavy whitespace and "squishy" interactive elements to create a tactile, toy-like interface. Large, vibrant background blurs provide depth, while the overall structure remains clean and functional to balance the punchy color accents.

## Colors

The palette is anchored by a high-octane "Electric Punch" pink and "Cyber Cyan," supported by optimistic pastels. 

- **Primary & Secondary:** Used for high-priority actions and brand-heavy moments. 
- **Pastel Surfaces:** In light mode, use very subtle pastel tints for container backgrounds instead of pure grey to maintain the "vibrant" mood.
- **Dark Mode:** Transition to deep pitch-blacks with high-saturation accents. Use 10% opacity overlays of primary colors for cards in dark mode to maintain depth without losing the colorful soul of the system.
- **Gradients:** Use linear 45-degree gradients blending primary and secondary colors for "Stories" style rings or prominent CTA buttons.

## Typography

This design system utilizes **Plus Jakarta Sans** for its unique blend of geometric precision and organic softness. The typographic rhythm is "Display-Heavy," meaning headers should be bold and tightly spaced to feel like social media headlines.

- **Weight Usage:** Use "ExtraBold" for headlines to lean into the satirical, punchy personality. 
- **Body Text:** Keep body text at "Medium" (500) weight for better legibility against colorful or blurred backgrounds.
- **Micro-copy:** Use the uppercase label style for metadata, tags, and small utility text to provide a structural contrast to the rounded, soft headers.

## Layout & Spacing

The layout philosophy follows a **Fluid "Feed-First" Model**. Content is prioritized in a single central column for mobile/tablet, expanding to a multi-column masonry or sidebar-nav layout for desktop.

- **Rhythm:** Use a 4px baseline grid. Padding within cards should be generous (minimum 20px) to allow the rounded corners to breathe.
- **Negative Space:** Embrace "excessive" whitespace. Elements should feel like they are floating rather than being packed into a tight grid.
- **Breakpoints:**
  - Mobile: 0-599px (1 column, 20px margins)
  - Tablet: 600-1023px (2 columns or wide single feed)
  - Desktop: 1024px+ (Maximum content width 1200px, centered).

## Elevation & Depth

Depth is conveyed through a combination of **Ambient Shadows** and **Glassmorphism**.

1.  **The Base Layer:** Solid background (White or Black).
2.  **The Content Layer:** Cards use a very soft, diffused shadow (Blur 30px, Y-offset 10px, 8% opacity of the primary color) to feel "hovering."
3.  **The Interaction Layer:** Navigation bars, modals, and floating action buttons use a "Glass" effect: 70% opacity background with a 20px backdrop-blur and a subtle 1px white (or 10% white) border to define edges.
4.  **The Active Layer:** When pressed, elements should visually "sink" (shadow decreases) to mimic tactile physical feedback.

## Shapes

The shape language is defined by "High-Quality Curvature." We avoid sharp edges entirely to maintain the friendly, casual vibe.

- **Standard Containers:** Use `rounded-lg` (16px) for cards, input fields, and modals.
- **Interactive Elements:** Buttons and tags should use "Pill-shaped" (Full) rounding to emphasize their touch-friendly nature.
- **Media:** Images and videos within the feed should always match the container's 16px radius. Nested elements should have a slightly smaller radius (8-12px) to maintain visual concentricity.

## Components

- **Buttons:** Primary buttons are pill-shaped with a vibrant gradient fill and a subtle drop shadow. Text is bold and centered.
- **Chips/Tags:** Used for categories. These should have a light pastel background (10% opacity of the category color) with high-saturation text.
- **Input Fields:** Large 16px rounded corners. In focus state, the border glows with a 2px primary color stroke and a soft outer glow.
- **Cards:** The core of the system. Cards have no visible border; they are defined by their soft shadows and internal 24px padding.
- **Lists:** Use "Avatar-first" layouts. Every list item should feel like a social notification—highly visual, featuring a 48px circular image or icon on the left.
- **Checkboxes & Radios:** These should be oversized and "squishy." On selection, they should use a spring animation and fill with the primary gradient.
