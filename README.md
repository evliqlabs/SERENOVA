# Serenova Hotel — Next.js 14 Project

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide React Icons

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Features
- **Multi-language** — EN, Sinhala, Tamil, Chinese, German, French, Japanese, Korean, Russian
  - EN/SI/TA are hand-translated. Others auto-translate via MyMemory API.
- **LKR Pricing** — All room prices in Sri Lankan Rupees
  - Ocean Suite: LKR 84,000/night
  - Garden Villa: LKR 57,000/night
  - Beachfront Cabana: LKR 1,05,000/night
- **Real-time Gallery** — Curated Sri Lanka photos from Unsplash with lightbox + refresh
- **Booking Modal** — Full form with WhatsApp confirmation link
- **WhatsApp CTA** — +94757303823 integrated throughout
- **Embedded Google Map** — Bentota, Sri Lanka location
- **Room Detail Modal** — Click any room to see full details + book

## Project Structure
```
app/
  layout.tsx      ← Root layout with LanguageProvider
  page.tsx        ← Main page assembling all sections
  globals.css     ← Tailwind + Google Fonts
components/
  sections/
    Navbar.tsx         ← Sticky nav + language switcher
    Hero.tsx           ← Fullscreen hero
    BookingBar.tsx     ← Quick booking bar
    About.tsx          ← About section with stats
    Rooms.tsx          ← 3 rooms with modal + LKR prices
    Experiences.tsx    ← 4 curated activities
    Gallery.tsx        ← Masonry gallery + lightbox
    Testimonials.tsx   ← 3 guest reviews with slider
    Location.tsx       ← Map + directions
    WhatsApp.tsx       ← CTA + floating button
    BookingModal.tsx   ← Full booking form
    Footer.tsx         ← Full footer
contexts/
  LanguageContext.tsx  ← All translations + MyMemory API
```

## WhatsApp Number
+94 75 730 3823 (configured in WhatsApp.tsx and BookingModal.tsx)

## Notes
- Gallery uses curated fallback images (no Unsplash API key needed)
- Translation uses MyMemory free API (100 requests/day)
- All prices in LKR (Sri Lankan Rupees) at ~LKR 300/USD rate
