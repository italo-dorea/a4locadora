---
name: Kinetic Precision
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#404943'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#707972'
  outline-variant: '#bfc9c1'
  surface-tint: '#246a4b'
  primary: '#216849'
  on-primary: '#ffffff'
  primary-container: '#3d8160'
  on-primary-container: '#f6fff6'
  inverse-primary: '#8fd5af'
  secondary: '#006d2f'
  on-secondary: '#ffffff'
  secondary-container: '#5dfd8a'
  on-secondary-container: '#007232'
  tertiary: '#8c474c'
  on-tertiary: '#ffffff'
  tertiary-container: '#aa5f63'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#abf2ca'
  primary-fixed-dim: '#8fd5af'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005235'
  secondary-fixed: '#66ff8e'
  secondary-fixed-dim: '#3de273'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#3b080f'
  on-tertiary-fixed-variant: '#723338'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
  surface-gray: '#F8FAF9'
  border-subtle: '#E2E8E5'
  whatsapp-green: '#25D366'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The brand personality is professional, reliable, and efficient, reflecting a high-standard vehicle rental service. This design system evolves the current identity into a **Corporate / Modern** aesthetic that prioritizes clarity and motion. It utilizes generous whitespace and a structured grid to convey a sense of organization and premium service. The visual language is "Technical-Humanist"—combining the precision of automotive engineering with an approachable, service-oriented interface. We move away from the basic web defaults toward a refined, intentional layout that suggests speed and safety.

## Colors
The palette is rooted in the brand’s signature forest green (`#599D7A`), which serves as the primary driver for all core UI actions and brand moments. We introduce a deep charcoal (`#1A1C1E`) as the neutral base to replace pure black, providing better readability and a more modern "ink" feel.

The secondary green (`#25D366`) is reserved strictly for high-utility communication features, specifically WhatsApp integration, ensuring it remains distinct from the brand's primary decorative and functional green. Backgrounds should utilize a very soft, cool-tinted gray to reduce eye strain and provide a sophisticated canvas for content.

## Typography
We replace the standard Lato with **Hanken Grotesk** to provide a sharper, more contemporary technical feel. It offers excellent legibility at small sizes for rental specifications while maintaining a bold, authoritative presence in large headlines.

To lean into the "automotive/precision" theme, **JetBrains Mono** is introduced for labels, metadata, and technical specifications (e.g., engine displacement, daily rates). This monospaced touch suggests data accuracy and professional bookkeeping. Headlines should use tighter letter-spacing and heavy weights to command attention, while body copy remains open and airy for easy reading of rental terms.

## Layout & Spacing
The system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. We employ an 8px baseline rhythm to ensure consistent vertical alignment. 

Layouts should favor asymmetrical compositions to imply movement, but with strict adherence to grid lines. Use wide margins (64px+) on desktop to create a "gallery" feel for the vehicle fleet. Section spacing should be generous (80px to 120px) to prevent the professional information from feeling cluttered or overwhelming.

## Elevation & Depth
Depth is communicated through **Tonal Layers** rather than heavy shadows. We use subtle shifts in background color (from white to `surface-gray`) to define different content zones. 

When elevation is required (e.g., for floating booking bars or vehicle cards), use **Low-Contrast Outlines** combined with a very soft, diffused shadow (15% opacity of the primary green) to create a "glow" that feels modern and lightweight. This keeps the interface feeling "flat but layered," avoiding the dated look of heavy drop shadows.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding provides a professional "machined" edge that feels precise but friendly. Avoid large, playful radiuses; the goal is to look like high-quality industrial design. Interactive elements like "Book Now" buttons should maintain this small radius to look sturdy and dependable.

## Components
- **Buttons:** Primary buttons use the brand green (`#599D7A`) with white text. Secondary buttons should be "ghost" style with a 1px border. 
- **Vehicle Cards:** Use a white background with a `border-subtle` outline. The vehicle image should be isolated with no background, placed at the top, followed by JetBrains Mono specs and a clear price-per-day label.
- **Input Fields:** Use a subtle gray fill (`surface-gray`) with a bottom-only border that thickens and turns primary green on focus.
- **Chips/Badges:** Use JetBrains Mono for availability tags (e.g., "AVAILABLE", "4-DOOR"). Use low-saturation green backgrounds with dark green text for high readability.
- **WhatsApp Float:** A persistent circular button using the `#25D366` green, positioned at the bottom right with a subtle pulse animation to emphasize its role as the primary support channel.
- **Lists:** Vehicle feature lists should use custom checkmark icons in the primary green, aligned to a strict vertical axis.