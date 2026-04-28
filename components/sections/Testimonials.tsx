'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const EXTRA = [
  { stars:5, quote:'"The attention to detail is extraordinary — from the handwritten welcome note to the local Sri Lankan breakfast. This is true hospitality."', name:'James & Sophia Laurent', country:'Paris, France' },
  { stars:5, quote:'"Woke up to the sound of waves every morning. The beachfront cabana was worth every rupee. We will be back every single year."', name:'David Chen', country:'Singapore' },
]

export default function Testimonials() {
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const reviews = [{ stars:5, quote:t.testimonials.quote, name:t.testimonials.author, country:t.testimonials.location }, ...EXTRA]
  const rev = reviews[idx]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-black/15"/>
          <span className="text-[10px] tracking-[0.22em] uppercase text-black/30 font-sans">Guest Stories</span>
          <div className="w-8 h-px bg-black/15"/>
        </div>
        <div className="flex justify-center gap-1.5 mb-6">
          {[...Array(rev.stars)].map((_,i)=>(
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="rgba(10,10,10,0.6)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ))}
        </div>
        <blockquote className="font-serif text-xl md:text-2xl italic font-light text-black leading-relaxed mb-6">{rev.quote}</blockquote>
        <div className="text-[11px] tracking-[0.18em] uppercase text-black/35 font-sans">
          <strong className="text-black/60 not-italic">{rev.name}</strong>&nbsp;·&nbsp;{rev.country}
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={()=>setIdx(i=>(i-1+reviews.length)%reviews.length)} className="border border-black/12 p-2 hover:border-black/30 transition-colors"><ChevronLeft size={16} className="text-black/45"/></button>
          <div className="flex gap-2">
            {reviews.map((_,i)=>(
              <button key={i} onClick={()=>setIdx(i)} className="h-px transition-all" style={{width:i===idx?'2rem':'1rem',background:i===idx?'#0a0a0a':'rgba(10,10,10,0.2)'}}/>
            ))}
          </div>
          <button onClick={()=>setIdx(i=>(i+1)%reviews.length)} className="border border-black/12 p-2 hover:border-black/30 transition-colors"><ChevronRight size={16} className="text-black/45"/></button>
        </div>
      </div>
    </section>
  )
}
