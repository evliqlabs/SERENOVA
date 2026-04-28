'use client'
import { Search } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

export default function BookingBar({ onBook }: { onBook: () => void }) {
  const { t } = useLang()
  return (
    <div className="bg-white border-b border-black/10 shadow-sm">
      {/* Mobile: stacked, Desktop: horizontal */}
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="flex flex-1 flex-wrap">
          {([
            [t.booking.checkin, 'date'],
            [t.booking.checkout, 'date'],
          ] as [string, string][]).map(([label, type]) => (
            <div key={label} className="flex-1 min-w-[130px] flex flex-col gap-1 px-4 sm:px-6 py-3 border-b sm:border-b-0 border-r border-black/8">
              <label className="text-[10px] tracking-[0.2em] uppercase text-black/35 font-sans">{label}</label>
              <input type={type} className="bg-transparent border-none text-black/70 text-sm outline-none font-sans w-full"/>
            </div>
          ))}
          <div className="flex-1 min-w-[110px] flex flex-col gap-1 px-4 sm:px-6 py-3 border-b sm:border-b-0 border-r border-black/8">
            <label className="text-[10px] tracking-[0.2em] uppercase text-black/35 font-sans">{t.booking.guests}</label>
            <select className="bg-transparent border-none text-black/70 text-sm outline-none font-sans cursor-pointer">
              {[t.booking.guest1, t.booking.guest2, t.booking.guest3, t.booking.guest4].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[130px] flex flex-col gap-1 px-4 sm:px-6 py-3">
            <label className="text-[10px] tracking-[0.2em] uppercase text-black/35 font-sans">{t.booking.roomType}</label>
            <select className="bg-transparent border-none text-black/70 text-sm outline-none font-sans cursor-pointer">
              {[t.booking.any, t.booking.ocean, t.booking.garden, t.booking.beach].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <button onClick={onBook}
          className="bg-black text-white px-6 py-3 sm:py-4 text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-black/85 transition-colors font-sans w-full sm:w-auto">
          <Search size={13}/>{t.booking.checkAvail}
        </button>
      </div>
    </div>
  )
}
