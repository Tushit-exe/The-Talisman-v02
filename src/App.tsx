import ScrollVideo from './components/ScrollVideo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import AudienceFit from './sections/AudienceFit'
import HowItWorks from './sections/HowItWorks'
import AuditOffer from './sections/AuditOffer'
import WhatHappensNext from './sections/WhatHappensNext'
import FinalCta from './sections/FinalCta'

export default function App() {
  return (
    <div className="relative">
      <ScrollVideo />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <Philosophy />
          <AudienceFit />
          <HowItWorks />
          <AuditOffer />
          <WhatHappensNext />
          <FinalCta />
        </main>

        <Footer />
      </div>
    </div>
  )
}
