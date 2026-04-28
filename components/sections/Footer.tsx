'use client'
import { Phone, Mail, MapPin, Share2, Camera, Video } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  return (
    <footer id="contact" className="bg-[#f0efed] border-t border-black/8">
      <div className="px-5 md:px-16 py-12 md:py-16">
        {/* 1 col mobile → 2 col sm → 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          <div>
            <div className="font-serif text-2xl text-black tracking-widest uppercase font-light mb-3">
              SEREN<span className="opacity-25">OVA</span>
            </div>
            <p className="text-black/35 text-xs leading-relaxed max-w-xs font-sans">{f.desc}</p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-black/30 mb-4 font-sans">{f.quickLinks}</div>
            <ul className="flex flex-col gap-2">
              {f.links.map((link, i) => <li key={i}><a href="#" className="text-black/40 hover:text-black text-xs font-sans transition-colors">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-black/30 mb-4 font-sans">{f.expTitle}</div>
            <ul className="flex flex-col gap-2">
              {f.expLinks.map((link, i) => <li key={i}><a href="#experiences" className="text-black/40 hover:text-black text-xs font-sans transition-colors">{link}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-black/30 mb-4 font-sans">{f.contactTitle}</div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-black/35 text-xs font-sans">
                <MapPin size={12} strokeWidth={1.4} className="mt-0.5 flex-shrink-0"/>Bentota, Southern Province, Sri Lanka
              </li>
              <li><a href="tel:+94757303823" className="flex items-center gap-2 text-black/35 hover:text-black text-xs font-sans transition-colors"><Phone size={12} strokeWidth={1.4}/>+94 75 730 3823</a></li>
              <li><a href="mailto:hello@serenova.lk" className="flex items-center gap-2 text-black/35 hover:text-black text-xs font-sans transition-colors"><Mail size={12} strokeWidth={1.4}/>hello@serenova.lk</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-black/20 text-[11px] font-sans text-center sm:text-left">{f.copyright}</span>
          <div className="flex gap-2.5">
            {([Share2, Camera, Video] as const).map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-black/10 hover:border-black/30 flex items-center justify-center transition-colors group">
                <Icon size={13} className="text-black/25 group-hover:text-black/50" strokeWidth={1.4}/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
