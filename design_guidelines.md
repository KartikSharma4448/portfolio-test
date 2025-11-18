# Design Guidelines: Kartik Sharma Portfolio Website

## Design Approach

**Selected Approach:** Reference-Based with Modern Portfolio Aesthetics

**Justification:** This portfolio requires strong visual appeal to showcase technical achievements and projects effectively. Drawing inspiration from:
- **Linear** for clean, modern typography and subtle animations
- **Stripe** for professional color restraint and trust-building design
- **Notion** for content organization and card-based layouts
- **Modern Developer Portfolios** (GitHub profiles, Dribbble) for project showcasing

**Core Principles:**
1. Professional credibility through clean, sophisticated design
2. Visual hierarchy emphasizing achievements and projects
3. Subtle, purposeful animations that enhance (not distract)
4. Trust-building through organized, scannable content
5. Personal branding while maintaining modern standards

## Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 13% 12% (elevated surfaces)
- Surface Elevated: 222 12% 16% (cards, modals)
- Primary: 217 91% 60% (professional blue - main CTAs)
- Primary Hover: 217 91% 55%
- Accent: 142 71% 45% (success green - achievements, certifications)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 71%
- Border: 222 10% 20%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Surface Elevated: 0 0% 96%
- Primary: 217 91% 50%
- Primary Hover: 217 91% 45%
- Accent: 142 71% 40%
- Text Primary: 222 15% 12%
- Text Secondary: 222 8% 45%
- Border: 0 0% 89%

**Semantic Colors:**
- Warning: 38 92% 50%
- Error: 0 72% 51%
- Info: 199 89% 48%

## Typography

**Font Families:**
- **Primary (Headings):** 'Inter', system-ui, sans-serif (via Google Fonts CDN)
- **Secondary (Body):** 'Inter', system-ui, sans-serif
- **Mono (Code/Technical):** 'JetBrains Mono', 'Fira Code', monospace (via Google Fonts CDN)

**Type Scale:**
- Hero Title: text-6xl md:text-7xl lg:text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl md:text-5xl, font-bold, tracking-tight
- Subsection Headers: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body Large: text-lg, font-normal, leading-relaxed
- Body: text-base, font-normal, leading-relaxed
- Small/Meta: text-sm, text-secondary
- Tiny/Labels: text-xs, uppercase, tracking-wider

**Line Heights:**
- Headings: leading-tight (1.2)
- Body: leading-relaxed (1.75)
- Code: leading-normal (1.5)

## Layout System

**Spacing Primitives:**
Primary spacing units: 4, 8, 12, 16, 20, 24, 32 (Tailwind scale)
- Micro spacing (within components): p-4, gap-2, gap-4
- Component spacing: p-6, p-8, gap-6
- Section padding: py-16 md:py-20 lg:py-24, px-4 md:px-6 lg:px-8
- Major spacing: py-32, mb-24

**Container Strategy:**
- Full-width sections: w-full with inner max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Text content: max-w-3xl for readability
- Forms: max-w-2xl

**Grid System:**
- Project cards: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Certification cards: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
- Skills grid: grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
- Service offerings: grid grid-cols-1 md:grid-cols-2 gap-6

## Component Library

### Navigation
**Sticky Header:** Glass-morphism effect with backdrop-blur, subtle border-bottom
- Logo/Name on left (text-xl font-bold)
- Nav links center (hidden on mobile, hamburger menu)
- CTA button right (primary color)
- Mobile: Full-screen overlay menu with smooth slide-in

### Hero Section (Landing Page)
**Layout:** Full viewport height (min-h-screen) with centered content
- Large gradient background (subtle animated gradient)
- Profile image: Circular, 200px, with subtle glow effect
- Name: text-7xl, gradient text effect
- Title/Tagline: text-2xl, text-secondary
- CTA buttons: Primary + Secondary (outline)
- Scroll indicator: Animated down arrow at bottom

**Background:** Animated gradient mesh or particle effect (canvas-based, subtle)

### About Section
**Two-column layout:** 
- Left: Professional photo (if available) or illustration
- Right: Bio text, education highlight cards
- Education cards: University logo placeholder, degree, CGPA with badge styling
- Work experience timeline with connecting lines

### Achievements/Certificates Section
**Masonry-style grid** or uniform card grid
- Certificate card: Icon (ribbon/badge), title, issuing org, date, "View Credential" link
- Filter tabs: All, Microsoft, Google, Cloud, Data Analytics
- Hover effect: Lift and glow
- Badge count: "16+ Professional Certifications" prominently displayed

### Skills Section
**Visual hierarchy:**
- Category grouping: Technical Skills, Tools & Technologies, Soft Skills
- Skill pills: Rounded badges with icon + label
- Proficiency indicators: Subtle progress bars or dot ratings
- Interactive: Hover reveals description/usage

### Projects Section
**Featured project cards (HOPE-PAWS highlighted):**
- Large card for featured project with screenshot placeholder
- Project image/mockup area
- Title, tech stack tags, description
- Links: Live Demo, GitHub (with icons)
- Additional projects in smaller grid

### Services Section
**Icon-driven cards:**
- Service icon (from Heroicons or Font Awesome)
- Service title, brief description
- Grid layout: 3 columns on desktop, stacked mobile

### Contact Section
**Split layout:**
- Left: Contact form (Name, Email, Message fields, Send button)
- Right: Contact info cards (Email, LinkedIn, Location with icons)
- Form validation with inline error states

### Social Links Page
**Centralized link hub (Linktree-style):**
- Centered single-column layout (max-w-2xl)
- Profile header with image and bio
- Large clickable link cards: LinkedIn, GitHub, Email, Portfolio, Instagram (if applicable)
- Each card: Icon, platform name, handle/description, external link indicator
- Subtle hover animations (scale, glow)

### Admin Panel
**Dashboard layout:**
- Sidebar navigation: Dashboard, Projects, Certificates, Skills, Services
- Main content area with data tables
- Add/Edit forms in modals or separate views
- Action buttons: Edit (blue), Delete (red), Add New (green)
- Confirmation dialogs for destructive actions

## Animations

**Philosophy:** Subtle, purposeful, performance-optimized

**Entrance Animations:**
- Sections: Fade-in with slight upward translate (intersection observer)
- Cards: Staggered fade-in (50ms delay between items)
- Hero: Text reveals with character-by-character fade (subtle)

**Interaction Animations:**
- Buttons: Scale(0.98) on active, smooth color transitions
- Cards: Hover lift (translateY(-4px)), shadow increase, border glow
- Links: Underline expand on hover
- Navigation: Smooth scroll with easing

**Scroll Effects:**
- Parallax on hero background (very subtle, 0.5 ratio)
- Sticky header with blur backdrop on scroll
- Progress indicator showing page completion

**Prohibited:**
- Auto-playing carousels
- Excessive parallax
- Bouncing elements
- Spinning loaders (use skeleton screens)

## Images

**Hero Section:**
- **Large Background Image:** Abstract tech/code pattern or gradient mesh (1920x1080), low opacity overlay
- **Profile Photo:** Professional headshot, circular crop, 300x300px, centered

**About Section:**
- Professional workspace photo or illustration (800x600)

**Projects Section:**
- **HOPE-PAWS:** Screenshot or mockup of the platform interface (1200x800)
- Project thumbnails for additional projects (600x400 each)

**Placeholders:** Use subtle gray backgrounds with icon indicators until real images are added

## SEO Optimization

**Meta Tags (Every Page):**
```
Title: "Kartik Sharma Jaipur | Software Developer | Freelancer"
Description: "Software Developer & Freelancer in Jaipur, turning complex problems into elegant digital solutions. Explore my work and let's build something amazing together."
Keywords: Kartik Sharma, software developer portfolio, web development, Jaipur developer, cloud computing, Python developer, Java programmer, kartiksharma.site
```

**Structured Data (JSON-LD):**
- Person schema for about/home
- WebSite schema with sitelinks searchbox
- BreadcrumbList for navigation

**Technical SEO:**
- Semantic HTML5 (header, nav, main, section, article, footer)
- Heading hierarchy (single h1 per page)
- Alt text for all images describing content
- Descriptive link text (avoid "click here")
- Mobile-first responsive design
- Fast loading (lazy load images, minify CSS)

## Accessibility

- Color contrast ratios: 4.5:1 minimum for normal text
- Focus indicators on all interactive elements (2px outline, primary color)
- Skip to main content link
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Form labels and error messages

## Responsive Breakpoints

- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (multi-column, full layouts)
- Large Desktop: > 1440px (max-width constraints)

This design system creates a professional, modern portfolio that showcases Kartik's achievements while maintaining credibility and trustworthiness through clean, sophisticated design choices.