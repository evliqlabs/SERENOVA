'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Play, Globe, ChevronDown, Menu, X } from 'lucide-react'
import { useLang, LANGUAGES, LangCode } from '@/contexts/LanguageContext'

// 10 verified real Sri Lanka photos - fetched directly from Unsplash photo pages
const PLACES = [
  {
    name: 'Sigiriya Rock Fortress',
    region: 'Central Province',
    tag: 'UNESCO World Heritage',
    distance: '180 km from resort',
    desc: 'An ancient 200m rock fortress rising from the jungle — one of the 8 wonders of Asia, built by King Kashyapa in 477 AD.',
    img: 'https://images.unsplash.com/photo-1711797750174-c3750dd9d7c9?w=1800&q=90&fit=crop',
  },
  {
    name: 'Sigiriya Lion Gate',
    region: 'Dambulla, Sri Lanka',
    tag: 'Ancient Citadel',
    distance: '180 km from resort',
    desc: 'Scale the lion-paw stairway carved into the rock face — summit for 360° views across the jungle canopy at sunrise.',
    img: 'https://images.unsplash.com/photo-1704797390901-e1d20bd46647?w=1800&q=90&fit=crop',
  },
  {
    name: 'Nine Arch Bridge',
    region: 'Ella, Badulla District',
    tag: 'Iconic Rail Viaduct',
    distance: '220 km from resort',
    desc: 'Watch the blue hill-country train emerge from the mist on this 1921 colonial viaduct — the most photographed spot in Sri Lanka.',
    img: 'https://images.unsplash.com/photo-1706766958001-176b3d7800ff?w=1800&q=90&fit=crop',
  },
  {
    name: 'Ella Nine Arches',
    region: 'Ella, Hill Country',
    tag: 'Aerial Drone View',
    distance: '220 km from resort',
    desc: 'From the sky, the viaduct cuts through dense emerald rainforest — a masterpiece of stone engineering surrounded by tea estates.',
    img: 'https://images.unsplash.com/photo-1734279135113-8bd58bc02b69?w=1800&q=90&fit=crop',
  },
  {
    name: "Adam's Peak · Sri Pada",
    region: 'Sabaragamuwa Province',
    tag: 'Sacred Pilgrimage',
    distance: '140 km from resort',
    desc: '5,243 ft above sea level — pilgrims climb through the night by lantern light to witness a sunrise that paints the clouds gold.',
    img: 'https://images.unsplash.com/photo-1539021929149-88832c42bc15?w=1800&q=90&fit=crop',
  },
  {
    name: 'Ambuluwawa Tower',
    region: 'Gampola, Kandy District',
    tag: 'Panoramic Landmark',
    distance: '95 km from resort',
    desc: 'A unique spiral tower atop a biodiversity complex — 360° views across misty peaks, deep valleys, and the lush rainforest below.',
    img: 'https://images.unsplash.com/photo-1708526329630-cbaa07422df7?w=1800&q=90&fit=crop',
  },
  {
    name: 'Knuckles Mountain Range',
    region: 'Matale District',
    tag: 'UNESCO Biosphere Reserve',
    distance: '120 km from resort',
    desc: 'A UNESCO biosphere with jagged peaks rising above the clouds — ancient trails, hidden waterfalls, and rare sri lankan leopards.',
    img: 'https://images.unsplash.com/photo-1573072749128-bc1197a58dbc?w=1800&q=90&fit=crop',
  },
  {
    name: 'Mirissa Beach',
    region: 'Southern Coast',
    tag: 'Blue Whale Watching',
    distance: '70 km from resort',
    desc: 'A crescent paradise on the Indian Ocean — spot blue whales Nov–April, surf perfect tropical waves, watch the sun melt into the sea.',
    img: 'https://images.unsplash.com/photo-1734279135115-6d8984e08206?w=1800&q=90&fit=crop',
  },
  {
    name: 'Galle Fort',
    region: 'Southern Province',
    tag: 'UNESCO Colonial Fort',
    distance: '45 km from resort',
    desc: 'A living Dutch fort built in 1588 — cobblestone alleys lined with boutique hotels, galleries, and ocean ramparts glowing at night.',
    img: 'https://images.unsplash.com/photo-1744330763088-30a60fef3594?w=1800&q=90&fit=crop',
  },
  {
    name: 'Colombo · Lotus Tower',
    region: 'Western Province',
    tag: 'South Asia Landmark',
    distance: '65 km from resort',
    desc: "Sri Lanka's capital skyline — the 350m Lotus Tower, South Asia's tallest self-supported structure, illuminates Colombo every night.",
    img: 'https://images.unsplash.com/photo-1742277295017-2d8ae9d88395?w=1800&q=90&fit=crop',
  },
]

export default function SriLankaPlaces({ onBook }: { onBook: () => void }) {
  const { t, lang, setLang } = useLang()
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [dir, setDir] = useState<'right' | 'left'>('right')
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentLang = LANGUAGES.find(l => l.code === lang)

  const go = (next: number, d: 'right' | 'left') => {
    if (transitioning || next === current) return
    if (timerRef.current) clearInterval(timerRef.current)
    setDir(d)
    setPrev(current)
    setTransitioning(true)
    setCurrent(next)
    setTimeout(() => { setPrev(null); setTransitioning(false) }, 750)
  }
  const goNext = () => go((current + 1) % PLACES.length, 'right')
  const goPrev = () => go((current - 1 + PLACES.length) % PLACES.length, 'left')
  const goTo = (i: number) => go(i, i > current ? 'right' : 'left')

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [current])

  const place = PLACES[current]

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
      {/* Slides */}
      {PLACES.map((p, i) => {
        const isActive = i === current
        const isPrev = i === prev
        return (
          <div key={i} className="absolute inset-0"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.75s ease',
            }}>
            <img
              src={p.img}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                transition: 'transform 7s ease-out',
              }}
            />
            {/* Gradient */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)'
            }} />
          </div>
        )
      })}

      {/* Top bar: logo + nav */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-14 py-4 md:py-6">
        <div className="font-serif text-xl md:text-2xl text-white tracking-widest font-light uppercase">
          SEREN<span style={{ opacity: 0.4 }}>OVA</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {(['#rooms', '#experiences', '#gallery', '#location'] as const).map((href, i) => {
            const labels = [t.nav.rooms, t.nav.experiences, t.nav.gallery, t.nav.location]
            return (
              <a key={href} href={href}
                className="text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase font-sans transition-colors">
                {labels[i]}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Language selector */}
          <div className="relative hidden sm:block">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 border border-white/25 px-2 md:px-3 py-2 text-xs text-white/60 hover:text-white hover:border-white/50 tracking-wider uppercase font-sans transition-colors">
              <Globe size={12} />
              <span className="hidden sm:inline">{currentLang?.native}</span>
              <ChevronDown size={10} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-black/10 w-44 z-50 shadow-xl">
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code as LangCode); setLangOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-xs flex items-center gap-3 font-sans transition-colors ${lang === l.code ? 'bg-black/6 text-black' : 'text-black/45 hover:bg-black/4 hover:text-black'}`}>
                    <span>{l.flag}</span><span>{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button onClick={onBook}
            className="hidden sm:block bg-white text-black px-3 md:px-5 py-2 text-xs tracking-widest uppercase font-medium hover:bg-white/90 transition-colors font-sans">
            {t.nav.book}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden absolute inset-0 z-30 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
          {(['#rooms', '#experiences', '#gallery', '#location', '#contact'] as const).map((href, i) => {
            const labels = [t.nav.rooms, t.nav.experiences, t.nav.gallery, t.nav.location, t.nav.contact]
            return (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white text-lg tracking-[0.2em] uppercase font-sans transition-colors">
                {labels[i]}
              </a>
            )
          })}
          {/* Mobile language selector */}
          <div className="grid grid-cols-3 gap-2 mt-4 px-6 w-full max-w-xs">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code as LangCode); setMobileOpen(false) }}
                className={`text-xs py-2 px-1 border font-sans ${lang === l.code ? 'border-white/40 text-white bg-white/10' : 'border-white/20 text-white/50'}`}>
                {l.native}
              </button>
            ))}
          </div>
          <button onClick={() => { onBook(); setMobileOpen(false) }}
            className="bg-white text-black px-8 py-3 text-xs tracking-widest uppercase font-medium mt-4 font-sans">
            {t.nav.book}
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-14 pb-28 md:pb-32">
        {/* Welcome tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-px bg-white/40" />
          <span className="text-[10px] tracking-[0.28em] uppercase text-white/55 font-sans">
            {t.places.tag}
          </span>
        </div>

        {/* Place name — big */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-none mb-2 max-w-4xl">
          {place.name}
        </h1>

        {/* Region + tag badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 border border-white/25 bg-black/25 backdrop-blur-sm px-3 py-1">
            <MapPin size={10} className="text-white/55" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-white/60 font-sans">{place.region}</span>
          </div>
          <div className="border border-white/15 bg-black/25 backdrop-blur-sm px-3 py-1">
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 font-sans">{place.tag}</span>
          </div>
          <div className="border border-white/15 bg-black/25 backdrop-blur-sm px-3 py-1">
            <span className="text-[10px] tracking-[0.12em] text-white/40 font-sans">{place.distance}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mb-8 font-sans">
          {place.desc}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={onBook}
            className="flex items-center gap-2.5 bg-white text-black px-7 py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:bg-white/90 transition-colors font-sans">
            <ArrowRight size={13} />{t.hero.exploreRooms}
          </button>
          <a href="#experiences"
            className="flex items-center gap-2.5 text-white/65 border border-white/25 px-7 py-3.5 text-xs tracking-[0.15em] uppercase hover:border-white/55 hover:text-white transition-all font-sans">
            <Play size={12} />{t.hero.experiences}
          </a>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button onClick={goPrev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 bg-black/25 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-white transition-all group">
        <ChevronLeft size={18} className="text-white group-hover:text-black transition-colors" />
      </button>
      <button onClick={goNext}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 bg-black/25 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-white transition-all group">
        <ChevronRight size={18} className="text-white group-hover:text-black transition-colors" />
      </button>

      {/* Counter + scroll hint */}
      <div className="absolute bottom-8 right-6 md:right-14 z-20 flex flex-col items-end gap-3">
        <span className="text-white/30 text-xs font-sans tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(PLACES.length).padStart(2, '0')}
        </span>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/35"
            style={{ animation: 'lineGrow 2s ease-in-out infinite' }} />
          <style>{`@keyframes lineGrow{0%,100%{opacity:0.3;transform:scaleY(0.5)}50%{opacity:1;transform:scaleY(1)}}`}</style>
          <span className="text-[9px] tracking-[0.18em] uppercase text-white/25 font-sans"
            style={{ writingMode: 'vertical-rl' }}>{t.hero.scroll}</span>
        </div>
      </div>

      {/* Thumbnail strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-14 py-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <style>{`.thumbrow::-webkit-scrollbar{display:none}`}</style>
          <div className="thumbrow flex gap-1.5">
            {PLACES.map((p, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="relative flex-shrink-0 overflow-hidden transition-all duration-300"
                style={{
                  width: i === current ? '88px' : '64px',
                  height: '44px',
                  opacity: i === current ? 1 : 0.4,
                  outline: i === current ? '1.5px solid rgba(255,255,255,0.6)' : 'none',
                  outlineOffset: '2px',
                }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-0.5 left-1 text-[8px] text-white/70 font-sans leading-tight line-clamp-1">
                  {p.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/8">
        <div key={`pb-${current}`} className="h-full bg-white/50"
          style={{ animation: 'slideProgress 6.5s linear forwards' }} />
        <style>{`@keyframes slideProgress{from{width:0%}to{width:100%}}`}</style>
      </div>

      {/* Rating badge */}
      <div className="absolute top-24 right-6 md:right-14 z-20 bg-black/30 backdrop-blur-md border border-white/15 px-4 py-3 text-center hidden md:block">
        <div className="font-serif text-2xl text-white font-light">4.9</div>
        <div className="flex justify-center gap-0.5 my-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <div className="text-[9px] tracking-widest text-white/35 uppercase font-sans">Rating</div>
      </div>
    </section>
  )
}
