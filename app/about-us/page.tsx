import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us - Ridge Crest Financial Group',
  description: 'Learn about Ridge Crest Financial Group, our mission to help small and medium-sized businesses with customized financing solutions, and our core values of transparency, integrity, and service excellence.',
}

export default function AboutUs() {
  return (
    <>
      <Header />
      <main>
        <section className="breadcrumb-main">
        <div className="auto-container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li> &gt; </li>
              <li className="active">About Us</li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="about-main sec-padd">
        <div className="auto-container">
          <div className="about-container">
            <div className="text-content">
              <div className="section-title left">
                <h2 className="heading">Who <span>We Are</span></h2>
              </div>
              <p>Our mantra is in our name. At Ridge Crest Financial Group, we aim to help small and medium-sized businesses extend their frontier potential.</p>
              <p>The team at RCFG believes in the power of exploration and the spirit of moving forward through uncharted territory. We envision a new era of business financing where your entrepreneurial journey is supported by a trusted partner with decades of experience.</p>
              <p>By offering exclusive and customized financing options, we help you capitalize on opportunities and confidently navigate the path to success. Our dedicated team is here to support you every step of the way, ensuring you have the resources and guidance to achieve your business goals.</p>
            </div>
            <div className="img-content">
              <Image src="/images/RCFG-Team-pic1.png" width={500} height={428} alt="Who We Are Img" />
            </div>
          </div>
          <div className="mission-container">
            <div className="section-title">
              <h2 className="title">Our <span>Mission</span></h2>
            </div>
            <p>Our mission is to elevate your business potential and provide an excellent experience through premium financial solutions tailored to your unique needs. We strive to be more than just a lender; we are your ally in achieving your greatest potential. At Ridge Crest Financial Group, we are committed to being your financial partner, providing the tools and advice you need to build a successful business.</p>
          </div>
        </div>
      </section>

      <section className="what-we-offer sec-padd">
        <div className="auto-container">
          <div className="section-title">
            <h2 className="title">What We <span>Offer</span></h2>
          </div>
          <div className="what-we-offer__container">
            <div className="what-we-offer__content">
              <div className="img-content">
                <Image src="/images/Icons-17.svg" width={64} height={64} alt="Quick Application" />
              </div>
              <p>Quick, simple, and streamlined application process with zero obligations.</p>
            </div>
            <div className="what-we-offer__content">
              <div className="img-content">
                <Image src="/images/Icons-18.svg" width={64} height={64} alt="Fast Funding" />
              </div>
              <p>Funding within 1 day for qualified applicants.</p>
            </div>
            <div className="what-we-offer__content">
              <div className="img-content">
                <Image src="/images/Icons-16-1.svg" width={64} height={64} alt="Flexible Options" />
              </div>
              <p>Tailored financing options flexible payment options.</p>
            </div>
            <div className="what-we-offer__content">
              <div className="img-content">
                <Image src="/images/Icons-19.svg" width={64} height={64} alt="Personal Support" />
              </div>
              <p>A real person by your side, every step of the way.</p>
            </div>
            <div className="what-we-offer__content">
              <div className="img-content">
                <Image src="/images/Icons-20.svg" width={64} height={64} alt="Experience" />
              </div>
              <p>RCFG has over 12 years of experience in the business lending space.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="business-decisions sec-padd">
        <div className="auto-container">
          <div className="section-title">
            <h2 className="title">Our <span>Values</span></h2>
            <p>Our core values are the foundation of Ridge Crest Financial Group,<br />
              guiding every decision and interaction we have with our customers.</p>
          </div>
          <div className="business-decisions__container">
            <div className="business-decisions__content business-decisions__content--value">
              <Image src="/images/Icons-3.png" width={110} height={110} alt="Transparency & Integrity" />
              <h3 className="title">Transparency & <span>Integrity</span></h3>
              <p>We ensure clear and honest communication, ensuring you understand every step of the funding process. We aim to do what&apos;s right and ethical, building lasting relationships based on trust and respect.</p>
            </div>
            <div className="business-decisions__content business-decisions__content--value">
              <Image src="/images/Icons.svg" width={110} height={110} alt="Accountability & Innovation" />
              <h3 className="title">Accountability & <span>Innovation</span></h3>
              <p>We own our actions and outcomes and strive to be trusted industry leaders. We constantly seek to improve our services and offer smarter, more efficient financing solutions.</p>
            </div>
            <div className="business-decisions__content business-decisions__content--value">
              <Image src="/images/Icons-6-1.svg" width={110} height={110} alt="Service Excellence & Customer Focus" />
              <h3 className="title">Service Excellence & <span>Customer Focus</span></h3>
              <p>Dedicated to delivering the highest standard of service, exceeding expectations by understanding your business&apos;s needs, and providing personalized solutions that help you succeed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="get-funding">
        <div className="auto-container">
          <div className="get-funding-container">
            <h3 className="title">Get the Funding <span>You Need</span></h3>
            <p>Join those who have elevated their business potential with Ridge Crest Financial Group. Experience the difference with our exclusive and customized financing options. Let&apos;s explore the future of your business together.</p>
            <Link href="/application" className="btn">Get Started Today</Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
