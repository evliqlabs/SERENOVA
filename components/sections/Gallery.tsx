'use client'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const SL_PHOTOS = [
  { id:'1', src:'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=500&q=75', alt:'Bentota Beach Sri Lanka' },
  { id:'2', src:'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=500&q=75', alt:'Sri Lanka tropical resort pool' },
  { id:'3', src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75', alt:'Sri Lanka beach sunset' },
  { id:'4', src:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=75', alt:'Luxury hotel room Sri Lanka' },
  { id:'5', src:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=75', alt:'Resort infinity pool' },
  { id:'6', src:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=75', alt:'Beachfront resort dining' },
  { id:'7', src:'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=500&q=75', alt:'Surfing Bentota Sri Lanka' },
  { id:'8', src:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=500&q=75', alt:'Sri Lanka coconut palms beach' },
  { id:'9', src:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=75', alt:'Hotel ocean view room' },
  { id:'10', src:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=75', alt:'Ayurveda spa Sri Lanka' },
  { id:'11', src:'https://images.unsplash.com/photo-1734279135113-8bd58bc02b69?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1734279135113-8bd58bc02b69?w=500&q=75', alt:'Nine Arch Bridge Ella' },
  { id:'12', src:'https://images.unsplash.com/photo-1708526329630-cbaa07422df7?w=1000&q=85', thumb:'https://images.unsplash.com/photo-1708526329630-cbaa07422df7?w=500&q=75', alt:'Ambuluwawa Tower Sri Lanka' },
]

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const [photos, setPhotos] = useState(SL_PHOTOS)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox(v => v !== null ? (v - 1 + photos.length) % photos.length : null)
  const next = () => setLightbox(v => v !== null ? (v + 1) % photos.length : null)

  return (
    <section id="gallery" className="py-16 md:py-24 px-5 md:px-16 bg-[#f0efed]">
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-black/20"/>
            <span className="text-[10px] tracking-[0.22em] uppercase text-black/35 font-sans">{g.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black">
            {g.title1} <em className="italic text-black/30">{g.title2}</em>
          </h2>
        </div>
        <button onClick={() => setPhotos(p => [...p].sort(() => Math.random() - 0.5))}
          className="flex items-center gap-2 border border-black/15 text-black/40 hover:text-black hover:border-black/30 px-3 py-2 text-xs tracking-widest uppercase font-sans transition-all">
          <RefreshCw size={11}/>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* 2 col mobile, 3 col md, 4 col lg — equal height tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {photos.slice(0, 12).map((photo, i) => (
          <div key={photo.id} className={`relative overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '1' : '1' }}
            onClick={() => setLightbox(i)}>
            <img src={photo.thumb} alt={photo.alt}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" style={{minHeight: 140}}/>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"/>
            <div className="absolute bottom-1.5 right-2 text-[9px] text-white/0 group-hover:text-white/50 transition-colors font-sans">
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].alt}
              className="w-full max-h-[78vh] object-contain"/>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-white/30 text-xs font-sans">{String(lightbox + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</p>
              <p className="text-white/40 text-xs font-sans capitalize truncate max-w-[60%]">{photos[lightbox].alt}</p>
            </div>
          </div>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 bg-white/10 border border-white/20 p-2"><X size={16} className="text-white"/></button>
          <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 p-2.5">
            <ChevronLeft size={18} className="text-white"/>
          </button>
          <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 p-2.5">
            <ChevronRight size={18} className="text-white"/>
          </button>
        </div>
      )}
    </section>
  )
}
