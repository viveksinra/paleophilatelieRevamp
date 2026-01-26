# Paleophilatelie.eu - NEW Design System

> **THIS IS THE NEW DESIGN SYSTEM TO FOLLOW**
> Inspired by National Geographic and 2-Clicks-Stamps

## Brand Identity

### Logo
- Keep existing logo but display it cleanly on white background
- Ensure proper spacing around logo

### Tagline
"The place where Paleontology and Paleoanthropology meets Philately"

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Red | `#C41E3A` | Headers, buttons, CTAs, accents |
| Primary Red Dark | `#A01830` | Hover states, borders |
| Primary Red Light | `#DC3545` | Highlights |

### Secondary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gold/Yellow | `#FFD700` | Secondary accents, highlights, badges |
| Gold Dark | `#E6C200` | Hover states |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Background |
| Off-White | `#F8F9FA` | Section backgrounds, cards |
| Light Gray | `#E9ECEF` | Borders, dividers |
| Medium Gray | `#6C757D` | Secondary text |
| Dark Gray | `#343A40` | Primary text |
| Black | `#212529` | Headings, footer background |

### Functional Colors
| Name | Hex | Usage |
|------|-----|-------|
| Link Blue | `#0066CC` | Text links |
| Link Hover | `#004499` | Link hover state |
| Success | `#28A745` | Success messages |
| Warning | `#FFC107` | Warnings |
| Error | `#DC3545` | Errors |

## Typography

### Font Stack
```css
/* Primary font - clean, readable, widely supported */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;

/* Heading font - slightly more distinctive */
font-family: 'Georgia', 'Times New Roman', serif;  /* For special headings only */
```

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 | 1.2 |
| H2 | 2rem (32px) | 600 | 1.25 |
| H3 | 1.5rem (24px) | 600 | 1.3 |
| H4 | 1.25rem (20px) | 600 | 1.35 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 400 | 1.4 |

## Spacing System

Use consistent spacing based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Default spacing |
| `--space-5` | 24px | Medium spacing |
| `--space-6` | 32px | Large spacing |
| `--space-7` | 48px | Section spacing |
| `--space-8` | 64px | Large sections |

## Layout

### Container
- Max width: 1200px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Centered with auto margins

### Grid
- 12-column grid for complex layouts
- CSS Grid for modern browsers
- Flexbox for simpler layouts

### Breakpoints
| Name | Width | Target |
|------|-------|--------|
| Mobile | < 576px | Small phones |
| Mobile Large | 576px - 767px | Large phones |
| Tablet | 768px - 991px | Tablets |
| Desktop | 992px - 1199px | Small desktops |
| Desktop Large | >= 1200px | Large screens |

## Components

### Buttons
- Primary: Red background, white text
- Secondary: White background, red border, red text
- Border radius: 4px
- Padding: 12px 24px
- Hover: Darken background 10%

### Cards
- White background
- Border: 1px solid light gray
- Border radius: 8px
- Box shadow: subtle (0 2px 4px rgba(0,0,0,0.1))
- Padding: 24px

### Navigation
- Sticky header
- White background with subtle shadow when scrolled
- Red active/hover states
- Dropdown menus for sub-navigation

### Images
- Border radius: 4px for thumbnails
- Hover effect: slight scale (1.02) with shadow
- Lightbox for full-size viewing

## Iconography
- Use simple, clean icons
- Emoji can be used for visual interest (dinosaur, globe, calendar etc.)
- Keep icons consistent in style and size

## Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Focus states visible on all interactive elements
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigable
