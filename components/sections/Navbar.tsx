'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useLang, LANGUAGES, LangCode } from '@/contexts/LanguageContext'

export default function Navbar({ onBookNow }: { onBookNow: () => void }) {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const currentLang = LANGUAGES.find(l => l.code === lang)

  useEffect(() => {
    // Only show sticky navbar after the hero section ends
    const fn = () => setScrolled(window.scrollY > window.innerHeight - 80)
    fn(); window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (!scrolled && !mobileOpen) return null // Hidden over hero — hero has its own nav

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-black/8 transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <a href="#home" className="font-serif text-2xl text-black tracking-widest font-light uppercase">
          SEREN<span className="opacity-25">OVA</span>
        </a>
        <ul className="hidden lg:flex gap-8 list-none">
          {([['#rooms', t.nav.rooms], ['#experiences', t.nav.experiences], ['#gallery', t.nav.gallery], ['#location', t.nav.location], ['#contact', t.nav.contact]] as [string, string][]).map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-black/45 hover:text-black text-xs tracking-widest uppercase transition-colors font-sans">{label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 border border-black/12 px-3 py-2 text-xs text-black/45 hover:text-black hover:border-black/25 tracking-wider uppercase font-sans transition-colors">
              <Globe size={12} />
              <span>{currentLang?.native}</span>
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
          <button onClick={onBookNow}
            className="bg-black text-white px-5 py-2 text-xs tracking-widest uppercase font-medium hover:bg-black/85 transition-colors font-sans">
            {t.nav.book}
          </button>
        </div>
        <button className="lg:hidden text-black" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/8 px-6 py-6 flex flex-col gap-4">
          {([['#rooms', t.nav.rooms], ['#experiences', t.nav.experiences], ['#gallery', t.nav.gallery], ['#location', t.nav.location], ['#contact', t.nav.contact]] as [string, string][]).map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}
              className="text-black/50 text-sm tracking-widest uppercase py-1 border-b border-black/6 font-sans">{label}</a>
          ))}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code as LangCode); setMobileOpen(false) }}
                className={`text-xs py-2 px-1 border font-sans ${lang === l.code ? 'border-black/40 text-black bg-black/5' : 'border-black/12 text-black/35'}`}>
                {l.native}
              </button>
            ))}
          </div>
          <button onClick={() => { onBookNow(); setMobileOpen(false) }}
            className="bg-black text-white py-3 text-xs tracking-widest uppercase font-medium mt-2 font-sans">
            {t.nav.book}
          </button>
        </div>
      )}
    </nav>
  )
}
