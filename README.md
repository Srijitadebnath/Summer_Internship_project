# Debnath Sanitary & Hardware — Digital Catalogue Web Application

A premium, high-fidelity, and fully responsive digital catalogue web application built for **Debnath Sanitary & Hardware**. Designed to streamline B2B and B2C product queries by allowing users to explore plumbing, hardware, and premium bathroom fitting collections, configure sizes, and generate instant quotations sent directly to store staff via WhatsApp.

---

## 🌟 Core Features

### 1. Interactive Digital Catalogues
- **Pipeline & Fittings Catalogue**: Features industrial-grade pressure pipes (CPVC/UPVC) and equal fittings from authorized brands like **Supreme** and **Finolex**.
- **Bathroom & Fittings Catalogue**: Showcases designer basin mixers, thermostatic diverters, overhead rain showers, and health sprays from premium brands like **ROCA**, **Parryware**, **Bathsense**, and **Ess Ess**.
- **Bleed-Through Protection**: Isolated catalogs matching specific product prefixes (`p` for pipeline, `b` for bathroom) to keep filtering collections accurate.

### 2. High-Performance Media & UI Animations
- **Cinematic Video Headers**: Features auto-playing, loop-muted showcase banners.
- **Chrome Caching Fix**: URLs are appended with cache-busting queries (`?v=1.0.0`) and `preload="auto"` settings to bypass the Chromium media range request error (`net::ERR_CACHE_OPERATION_NOT_SUPPORTED`).
- **Mobile Text Optimization**: Automatically collapses large banners on mobile viewports (<640px) to show only short labels ("New Launch" / "Live Technical Showcase"), keeping the video background visible and clean.
- **Framer Motion Integration**: Smooth slide-overs, interactive modal transitions, and responsive scroll stacks for mobile category decks.

### 3. Integrated Enquiry Cart & WhatsApp Checkout
- **Circular Structure Safety**: Saves a lightweight, flat schema (`{ id, size, quantity }[]`) in local storage, preventing JSON circular parsing failures that stem from saving React Nodes. Reconstitutes icons dynamically from a centralized database.
- **Quantity Adjuster**: Supports standard inline `+` and `-` quantity modifiers.
- **WhatsApp API Integration**: Automatically generates a beautifully formatted, itemized WhatsApp message detailing the brands, names, sizes, quantities, and totals of selected items for instant quoting.

### 4. Interactive Contact Form (EmailJS)
- Features a client-side customer contact submission form backed by **EmailJS** for instant notifications.

---

## 🛠️ Tech Stack & Styling

- **Core**: React 19, TypeScript, Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4) with vanilla CSS variables mapping a custom dark-blue design system:
  - *Primary Theme Accent*: `#0F3A70` (Classic deep blue)
  - *Secondary Theme Accent*: `#1E40AF` / `#0066CC`
  - *Custom Patterns*: Technical blueprint grid backdrops (`.blueprint-grid`) and slanted visual polygon masks (`.slanted-mask`).
- **Icons**: Lucide React

---

## 📂 Project Architecture

```
Summer-Internship-project/
├── public/                 # Static assets (videos, logo icons)
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Reusable presentation components
│   │   ├── Navbar.tsx      # Sticky headers & cart indicators
│   │   ├── Hero.tsx        # Video hero banner & sliding features
│   │   ├── Categories.tsx  # Desktop grids & mobile scroll stacks
│   │   ├── CartDrawer.tsx  # Sliding list of enquiry items
│   │   ├── Contact.tsx     # EmailJS backed feedback panel
│   │   └── ...             # Bathroom & Pipeline Catalogues
│   ├── context/
│   │   └── CartContext.tsx # Centralized product database & state
│   ├── App.tsx             # Route paths, scroll-spy targets
│   ├── index.css           # Tailwind v4 import & custom tokens
│   └── main.tsx            # DOM root registration
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the repository
```bash
git clone <repository-url>
cd Summer-Internship-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the local development server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

### 4. Build for production
To compile TypeScript and build optimized assets for deployment:
```bash
npm run build
```
Vite will output the compiled client files into the `dist/` directory.

### 5. Local preview
To preview the compiled production build locally:
```bash
npm run preview
```

---

## 🔧 Important Technical Solutions

### Chromium Video Cache Error Fix
When streaming static video files (`.mp4`), Chrome/Edge DevTools often report:
`Failed to load resource: net::ERR_CACHE_OPERATION_NOT_SUPPORTED`
This is caused by byte-range request cache collisions. The application resolves this by suffixing video sources with query parameters:
```tsx
src={`${videoSrc}?v=1.0.0`}
```

### SVG React Node Serialization Fix
Storing React components inside local storage throws circular reference exceptions during `JSON.stringify()`. The app solves this in `CartContext.tsx` by:
1. Mapping the cart array to raw items: `{ id: string, size: string, quantity: number }[]`.
2. Saving the raw array to `localStorage`.
3. Hydrating the full components (including SVGs) back into memory upon application mount using a centralized list.
