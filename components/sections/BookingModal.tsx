'use client'
import { useState } from 'react'
import { X, CheckCircle, Loader2 } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

type Props = { open: boolean; onClose: () => void }

export default function BookingModal({ open, onClose }: Props) {
  const { t } = useLang()
  const m = t.booking_modal
  const [form, setForm] = useState({ name:'', email:'', phone:'', checkin:'', checkout:'', guests:'2', room:'Ocean Suite', special:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (!form.name || !form.email || !form.phone || !form.checkin || !form.checkout) { setError(m.required); return }
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false); setSuccess(true)
  }

  const close = () => {
    setSuccess(false)
    setForm({ name:'', email:'', phone:'', checkin:'', checkout:'', guests:'2', room:'Ocean Suite', special:'' })
    onClose()
  }

  const inputCls = "w-full bg-[#f8f8f6] border border-black/10 text-black text-sm px-4 py-3 outline-none focus:border-black/30 transition-colors font-sans placeholder:text-black/25 rounded-none"

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4" onClick={close}>
      {/* Slide up on mobile (sheet), centered modal on desktop */}
      <div className="bg-white w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-2xl sm:rounded-none" onClick={e => e.stopPropagation()}>

        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-black/15 rounded-full"/>
        </div>

        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <h3 className="font-serif text-xl sm:text-2xl text-black font-light">{m.title}</h3>
          <button onClick={close} className="text-black/35 hover:text-black transition-colors"><X size={18}/></button>
        </div>

        {success ? (
          <div className="px-6 py-12 text-center">
            <CheckCircle size={36} className="text-black mx-auto mb-4" strokeWidth={1}/>
            <h4 className="font-serif text-xl text-black font-light mb-2">{m.success}</h4>
            <p className="text-black/40 text-sm leading-relaxed mb-6 font-sans">{m.successMsg}</p>
            <a href={`https://wa.me/94757303823?text=${encodeURIComponent(`Hi, booking for ${form.room} — ${form.checkin} to ${form.checkout}. Name: ${form.name}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs tracking-widest uppercase font-medium font-sans">
              Confirm via WhatsApp
            </a>
            <button onClick={close} className="block mt-4 mx-auto text-black/30 text-xs underline font-sans">{m.close}</button>
          </div>
        ) : (
          <div className="px-6 py-6">
            {/* Dates - 2 col always */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{t.booking.checkin} *</label>
                <input type="date" name="checkin" value={form.checkin} onChange={handle} className={inputCls}/>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{t.booking.checkout} *</label>
                <input type="date" name="checkout" value={form.checkout} onChange={handle} className={inputCls}/>
              </div>
            </div>

            {/* Guests + Room - 2 col */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{t.booking.guests}</label>
                <select name="guests" value={form.guests} onChange={handle} className={inputCls}>
                  {['1','2','3','4'].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{t.booking.roomType}</label>
                <select name="room" value={form.room} onChange={handle} className={inputCls}>
                  <option>Ocean Suite — LKR 84,000</option>
                  <option>Garden Villa — LKR 57,000</option>
                  <option>Beachfront Cabana — LKR 1,05,000</option>
                </select>
              </div>
            </div>

            {/* Personal info - full width on mobile */}
            {([['name', m.name, 'text'], ['email', m.email, 'email'], ['phone', m.phone, 'tel']] as [string,string,string][]).map(([name, label, type]) => (
              <div className="mb-3" key={name}>
                <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{label} *</label>
                <input type={type} name={name} value={form[name as keyof typeof form]} onChange={handle} placeholder={label} className={inputCls}/>
              </div>
            ))}

            <div className="mb-5">
              <label className="text-[10px] tracking-widest uppercase text-black/35 block mb-2 font-sans">{m.special}</label>
              <textarea name="special" value={form.special} onChange={handle} rows={3} placeholder={m.special} className={`${inputCls} resize-none`}/>
            </div>

            {error && <p className="text-red-500 text-xs mb-4 font-sans">{error}</p>}

            <button onClick={submit} disabled={loading}
              className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase font-medium hover:bg-black/85 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-sans">
              {loading && <Loader2 size={13} className="animate-spin"/>}
              {loading ? 'Processing...' : m.submit}
            </button>

            {/* Extra bottom padding for mobile safe area */}
            <div className="h-4 sm:h-0"/>
          </div>
        )}
      </div>
    </div>
  )
}
