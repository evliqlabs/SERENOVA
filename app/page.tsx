'use client'
import { useState } from 'react'
import Navbar from '@/components/sections/Navbar'
import SriLankaPlaces from '@/components/sections/SriLankaPlaces'
import BookingBar from '@/components/sections/BookingBar'
import About from '@/components/sections/About'
import Rooms from '@/components/sections/Rooms'
import Experiences from '@/components/sections/Experiences'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import Location from '@/components/sections/Location'
import WhatsAppCTA, { WhatsAppFloat } from '@/components/sections/WhatsApp'
import Footer from '@/components/sections/Footer'
import BookingModal from '@/components/sections/BookingModal'
import { useLang } from '@/contexts/LanguageContext'

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const { lang } = useLang()
  return (
    <main style={{ opacity: 1, transition: 'opacity 0.3s' }}>
      {/* Sticky nav - appears after scrolling past hero */}
      <Navbar onBookNow={() => setBookingOpen(true)} />
      {/* Hero = Sri Lanka Places fullscreen slider with nav embedded */}
      <SriLankaPlaces onBook={() => setBookingOpen(true)} />
      <BookingBar onBook={() => setBookingOpen(true)} />
      <About />
      <Rooms onBook={() => setBookingOpen(true)} />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Location />
      <WhatsAppCTA />
      <Footer />
      <WhatsAppFloat />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  )
}
