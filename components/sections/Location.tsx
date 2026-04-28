'use client'
import { Plane, Train, Globe, ArrowRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const SL_LOCATION = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=88'
const ICONS = [Plane, Train, Globe]

export default function Location() {
  const { t } = useLang()
  const l = t.location
  return (
    <section id="location" className="bg-[#fafaf8]">
      {/* Stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Image */}
        <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden">
          <img src={SL_LOCATION} alt="Bentota Beach" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/30"/>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-5 py-3 flex items-center justify-between gap-3">
            <div>
              <div className="font-serif text-base sm:text-lg text-white font-light">{l.place}</div>
              <div className="text-[9px] tracking-widest uppercase text-white/45 mt-0.5 font-sans">{l.coast}</div>
            </div>
            <a href="https://maps.google.com/?q=Bentota,Sri+Lanka" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-3 py-1.5 text-[10px] tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-all font-sans whitespace-nowrap">
              <ArrowRight size={11}/>{l.directions}
            </a>
          </div>
        </div>

        {/* Details */}
        <div className="px-5 sm:px-8 md:px-14 py-12 md:py-16 bg-[#fafaf8]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-black/20"/>
            <span className="text-[10px] tracking-[0.22em] uppercase text-black/35 font-sans">{l.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-4">
            {l.title1} <em className="italic text-black/30">{l.title2}</em> {l.title3}
          </h2>
          <p className="text-black/45 text-sm leading-relaxed mb-8 font-sans">{l.desc}</p>

          <div className="flex flex-col gap-5 mb-8">
            {l.items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-9 h-9 border border-black/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-black/40" strokeWidth={1.4}/>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black mb-0.5 font-sans">{item.title}</div>
                    <div className="text-xs text-black/40 leading-relaxed font-sans">{item.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Google Map embed */}
          <div className="border border-black/10 overflow-hidden h-36 sm:h-44">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.04478839948!2d79.9305!3d6.4750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2294e4b6b5f1d%3A0x23a0aa17bbfea2c1!2sBentota!5e0!3m2!1sen!2slk!4v1693000000000!5m2!1sen!2slk"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
