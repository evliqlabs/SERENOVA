'use client'
import { useLang } from '@/contexts/LanguageContext'

const IMG_A = 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=85'
const IMG_B = 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=85'

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section className="py-16 md:py-24 px-5 md:px-16 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Images — stacked on mobile, overlapping on desktop */}
        <div className="relative h-64 sm:h-80 lg:h-[520px]">
          <div className="absolute top-0 left-0 w-[72%] h-[83%] overflow-hidden">
            <img src={IMG_A} alt="Serenova Resort" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] h-[57%] overflow-hidden border-[4px] lg:border-[6px] border-[#fafaf8]">
            <img src={IMG_B} alt="Resort dining" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute top-[44%] left-[56%] -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-3 lg:px-5 lg:py-4 text-center z-10 shadow-xl">
            <span className="font-serif text-2xl lg:text-3xl font-light block leading-none">15</span>
            <span className="text-[9px] lg:text-[10px] tracking-[0.18em] uppercase opacity-50 block mt-1 font-sans">{a.years}</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-black/20"/>
            <span className="text-[10px] tracking-[0.22em] uppercase text-black/35 font-sans">{a.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight mb-5">
            {a.title1} <em className="italic text-black/30">{a.title2}</em> {a.title3}
          </h2>
          <p className="text-black/50 text-sm leading-relaxed mb-3 font-sans">{a.p1}</p>
          <p className="text-black/50 text-sm leading-relaxed mb-8 font-sans">{a.p2}</p>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {([['48', a.rooms], ['3', a.restaurants], ['4.9', a.rating]] as [string,string][]).map(([num,label])=>(
              <div key={label} className="border-l border-black/12 pl-4">
                <div className="font-serif text-2xl lg:text-3xl text-black font-light">{num}</div>
                <div className="text-[10px] text-black/35 tracking-[0.12em] uppercase mt-1 font-sans">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
