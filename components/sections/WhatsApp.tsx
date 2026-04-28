'use client'
import { MessageCircle } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const WA = '94757303823'

export default function WhatsAppCTA() {
  const { t } = useLang()
  const w = t.whatsapp
  return (
    <section className="py-20 px-6 text-center bg-black">
      <div className="max-w-xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-3">{w.title}</h2>
        <p className="text-white/40 text-sm leading-relaxed mb-8 font-sans">{w.desc}</p>
        <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium hover:bg-white/90 transition-opacity font-sans">
          <MessageCircle size={16} strokeWidth={1.5}/>{w.btn}
        </a>
        <p className="text-white/20 text-xs tracking-widest mt-5 font-sans">{w.number}</p>
      </div>
    </section>
  )
}

export function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-black flex items-center justify-center shadow-2xl hover:bg-black/85 transition-colors border border-black/20"
      aria-label="Chat on WhatsApp">
      <MessageCircle size={24} className="text-white" strokeWidth={1.5}/>
    </a>
  )
}
