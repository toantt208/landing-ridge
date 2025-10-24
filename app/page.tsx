import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import Requirements from '@/components/Requirements'
import OurProcess from '@/components/OurProcess'
import MoneyStarted from '@/components/MoneyStarted'
import BusinessDecisions from '@/components/BusinessDecisions'
import GettingCall from '@/components/GettingCall'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Requirements />
        <OurProcess />
        <MoneyStarted />
        <BusinessDecisions />
        <GettingCall />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
