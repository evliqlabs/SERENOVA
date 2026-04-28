'use client'
import { useState } from 'react'
import { ArrowRight, X, Users, Maximize2, Wind, Waves } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const LKR = (n: number) => `LKR ${n.toLocaleString('en-LK')}`

type RoomDef = {
  key: string; img: string; img2: string; pricePerNight: number
  badge: string | null; size: string; guests: number; features: string[]
  name: string; type: string
}

const ROOMS: RoomDef[] = [
  { key:'suite', img:'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=85', img2:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85', pricePerNight:84000, badge:'popular', size:'65 m²', guests:2, features:['Ocean View','King Bed','Jacuzzi','Butler Service'], name:'Ocean Horizon Suite', type:'Featured Suite' },
  { key:'villa', img:'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85', img2:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85', pricePerNight:57000, badge:null, size:'80 m²', guests:3, features:['Garden View','King Bed','Private Pool','Kitchenette'], name:'Tropical Garden Villa', type:'Private Villa' },
  { key:'cabana', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85', img2:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=900&q=85', pricePerNight:105000, badge:'new', size:'45 m²', guests:2, features:['Beachfront','Queen Bed','Open Shower','Sun Deck'], name:'Beachfront Cabana', type:'Beachfront' },
]

export default function Rooms({ onBook }: { onBook: () => void }) {
  const { t } = useLang()
  const r = t.rooms
  const [selected, setSelected] = useState<RoomDef | null>(null)

  const roomData: RoomDef[] = [
    { ...ROOMS[0], name: r.suite.name, type: r.suite.type },
    { ...ROOMS[1], name: r.villa.name, type: r.villa.type },
    { ...ROOMS[2], name: r.cabana.name, type: r.cabana.type },
  ]

  return (
    <section id="rooms" className="py-16 md:py-24 px-5 md:px-16 bg-[#f0efed]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-black/20"/>
            <span className="text-[10px] tracking-[0.22em] uppercase text-black/35 font-sans">{r.tag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black">
            {r.title1} <em className="italic text-black/30">{r.title2}</em> {r.title3}
          </h2>
        </div>
        <button onClick={onBook} className="self-start flex items-center gap-2 text-black/50 border border-black/15 hover:border-black/35 hover:text-black px-4 py-2 text-xs tracking-widest uppercase transition-all font-sans">
          {r.viewAll} <ArrowRight size={11}/>
        </button>
      </div>

      {/* Cards — single col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
        {roomData.map((room) => (
          <div key={room.key} className="relative group overflow-hidden bg-white cursor-pointer" onClick={() => setSelected(room)}>
            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
              <img src={room.img} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(0,0,0,0.78) 0%,transparent 55%)'}}/>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              {room.badge && (
                <div className="absolute top-3 left-3 bg-white text-black text-[9px] tracking-widest uppercase px-2 py-1 font-medium font-sans">
                  {room.badge === 'popular' ? r.popular : r.new}
                </div>
              )}
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1 font-sans">{room.type}</div>
              <div className="font-serif text-lg md:text-xl text-white font-light mb-2">{room.name}</div>
              <div className="flex items-center justify-between">
                <div className="text-white/60 text-xs font-sans">
                  {r.from} <span className="text-white text-sm font-medium">{LKR(room.pricePerNight)}</span> {r.perNight}
                </div>
                <div className="w-7 h-7 border border-white/25 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                  <ArrowRight size={11} className="text-white group-hover:text-black transition-colors"/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 md:p-6" onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <img src={selected.img2} alt={selected.name} className="w-full h-full object-cover"/>
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 bg-white border border-black/15 p-2 hover:bg-black hover:text-white transition-all">
                <X size={14}/>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-[10px] tracking-[0.2em] uppercase text-black/35 mb-1 font-sans">{selected.type}</div>
              <h3 className="font-serif text-2xl md:text-3xl text-black font-light mb-2">{selected.name}</h3>
              <div className="font-serif text-xl text-black mb-5">{LKR(selected.pricePerNight)} <span className="text-sm text-black/40 font-sans">{r.perNight}</span></div>
              <div className="grid grid-cols-3 gap-3 mb-6 border-y border-black/8 py-5">
                <div className="flex items-center gap-1.5 text-black/50 text-xs font-sans"><Maximize2 size={13}/>{selected.size}</div>
                <div className="flex items-center gap-1.5 text-black/50 text-xs font-sans"><Users size={13}/>{selected.guests}</div>
                <div className="flex items-center gap-1.5 text-black/50 text-xs font-sans"><Wind size={13}/>AC</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.features.map(f => <span key={f} className="border border-black/12 text-black/45 text-xs px-3 py-1.5 tracking-wider font-sans">{f}</span>)}
              </div>
              <button onClick={() => { setSelected(null); onBook() }} className="w-full bg-black text-white py-3.5 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 font-sans">
                <Waves size={13}/>{t.nav.book}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
