---
name: Kinetic Logic
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4d4732'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e775f'
  outline-variant: '#d0c6ab'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#e9c400'
  secondary: '#ad2c00'
  on-secondary: '#ffffff'
  secondary-container: '#d83900'
  on-secondary-container: '#fffbff'
  tertiary: '#5e5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#dadada'
  on-tertiary-container: '#5f5f5f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#872000'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 84px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-margin: 2rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 4rem
  border-width: 4px
  shadow-offset: 6px
---

## Brand & Style

This design system is built on the principles of **Neo-Brutalism**, specifically tailored for a high-impact developer portfolio. The brand personality is unapologetic, technically proficient, and high-energy. It rejects the standard "soft" SaaS aesthetic in favor of raw, structural honesty. 

The visual language uses heavy strokes, solid offsets, and a vibrant palette to convey a sense of architectural stability combined with creative motion. The target audience—technical recruiters and fellow developers—will experience a UI that feels responsive, deliberate, and highly legible. The emotional response should be one of confidence, clarity, and "digital craftsmanship."

## Colors

The palette is anchored by a high-contrast foundation to ensure maximum readability and impact.

- **Background:** A stark off-white (`#F7F7F7`) provides a clean canvas that prevents the pure white "screen glare" while maintaining a paper-like quality.
- **Primary (Electric Yellow):** Used for primary actions, highlight states, and key navigational anchors.
- **Secondary (Blaze Orange):** Used for warnings, secondary highlights, and breaking the rhythm of the layout to draw attention to specific portfolio pieces.
- **Stroke/Shadow (Deep Black):** All borders and hard-shadow offsets must use `#000000`. No gray borders are permitted.
- **Accent Blocks:** Use the primary and secondary colors as solid fills behind text or components to create "sticker" or "card" effects.

## Typography

The typography system utilizes a "Technical-Humanist" pairing. **Space Grotesk** is the primary display face, providing geometric quirks that align with the Neo-Brutalist aesthetic. **Inter** handles body copy to ensure long-form technical descriptions remain legible and grounded.

- **Headlines:** Always bold. For display sizes, use tight letter-spacing to create a dense, "blocky" feel.
- **Hierarchy:** Use dramatic scale shifts between headlines and body text to emphasize importance.
- **Accents:** Use `label-bold` for tags, chips, and small metadata, always in uppercase to maintain the structural tone.

## Layout & Spacing

This design system uses a **Visible Fixed Grid** philosophy. The layout should feel like a technical drawing or a modular blueprint.

- **The Grid:** Use a 12-column desktop grid. Vertical and horizontal lines (4px width) should be used to separate major sections (e.g., Header from Hero, Sidebar from Main Content).
- **Asymmetry:** Encourage "offset" placements. For example, a card might span 7 columns while its neighboring description spans 4, leaving a 1-column gap.
- **Mobile:** Reflow to a single column, but maintain the 4px border around the entire viewport to keep the "boxed" feeling.
- **Negative Space:** Use `stack-lg` (64px) liberally between disparate sections to allow the heavy borders room to breathe.

## Elevation & Depth

Standard shadows and blurs are strictly forbidden. Depth is achieved through **Solid Hard-Shadows**.

- **Hard-Shadows:** Create depth by placing a solid black rectangle behind an element, offset by 6px to the bottom-right.
- **Active State:** When an element is clicked or hovered, the "shadow" should disappear as the element translates 6px down and to the right, simulating a physical "press" against the background.
- **Layering:** Use primary or secondary color fills to separate tiers. A card (Background: White, Border: 4px Black) might sit on top of a larger decorative block (Background: Yellow, Border: 4px Black).

## Shapes

The shape language is primarily rectangular but softened slightly to avoid a "dated" brutalist look.

- **Radius:** A consistent `0.25rem` (4px) or `0.5rem` (8px) radius is applied to all containers, buttons, and input fields.
- **Strictness:** Do not use full circles for profile images; use a "Squircle" or a heavily rounded rectangle instead.
- **Strokes:** Every shape must have a solid `4px` black stroke. This applies to buttons, cards, and even decorative icons.

## Components

### Buttons
- **Style:** Background of Primary (Yellow) or Secondary (Orange).
- **Border:** 4px Black.
- **Shadow:** 6px Black solid offset.
- **Interaction:** On hover, the shadow grows to 8px. On click, the button translates to cover the shadow (0px offset).

### Cards
- **Style:** Background white or off-white. 
- **Header:** Include a 4px bottom border separating the card title from the content.
- **Shadow:** Always use the 6px solid black offset.

### Input Fields
- **Style:** White background, 4px black border. 
- **Focus State:** Border remains black, but the solid shadow appears in Primary (Yellow) to indicate focus.

### Chips/Tags
- **Style:** Small, rectangular with 4px radius.
- **Coloring:** Alternate between Primary, Secondary, and White backgrounds based on category. No shadows for chips to keep them "flat" against their parent container.

### Lists
- **Style:** Use visible 4px horizontal separators between list items. Use the `code` font for list bullets or indexes (e.g., 01., 02., 03.).