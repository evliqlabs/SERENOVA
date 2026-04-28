'use client'
import { Waves, Leaf, Sailboat, ChefHat } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const ICONS = [Waves, Leaf, Sailboat, ChefHat]
const EXP_IMGS = [
  'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=85',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=85',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=85',
]

export default function Experiences() {
  const { t } = useLang()
  const e = t.experiences
  return (
    <section id="experiences" className="py-16 md:py-24 px-5 md:px-16 bg-[#fafaf8]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end mb-10 md:mb-14">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-black/20"/>
            <span className="text-[10px] tracking-[0.22em] uppercase text-black/35 font-sans">{e.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight">
            {e.title1} <em className="italic text-black/30">{e.title2}</em> {e.title3}
          </h2>
        </div>
        <p className="text-black/45 text-sm leading-relaxed font-sans">{e.desc}</p>
      </div>

      {/* 2 col on mobile, 4 col on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {e.items.map((item, i) => {
          const Icon = ICONS[i]
          return (
            <div key={i} className="group bg-white border border-black/6 hover:border-black/15 transition-all overflow-hidden">
              <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden">
                <img src={EXP_IMGS[i]} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              </div>
              <div className="p-4 md:p-6">
                <div className="w-9 h-9 border border-black/10 flex items-center justify-center mb-3 group-hover:border-black/25 transition-colors">
                  <Icon size={16} className="text-black/45" strokeWidth={1.3}/>
                </div>
                <div className="font-serif text-base md:text-lg text-black font-light mb-2">{item.name}</div>
                <p className="text-black/40 text-xs leading-relaxed font-sans hidden sm:block">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
