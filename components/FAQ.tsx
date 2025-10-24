'use client'

import { useState } from 'react'
import Link from 'next/link'
import '../styles/accordion.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-main sec-padd">
      <div className="auto-container">
        <div className="section-title">
          <h2 className="heading">Frequently <span>asked questions</span></h2>
        </div>
        <div className="faq__container">
          <div className="faq__content">
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 0 ? 'active' : ''}`} onClick={() => toggleAccordion(0)} style={{ cursor: 'pointer' }}>
                Who is Ridge Crest Financial Group?
              </h3>
              <div className={`accordion-content ${openIndex === 0 ? 'open' : ''}`}>
                <p>
                  Ridge Crest Financial Group is a leading provider of specialized financial solutions designed to help small and medium-sized businesses reach their full potential.
                </p>
              </div>
            </div>
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 1 ? 'active' : ''}`} onClick={() => toggleAccordion(1)} style={{ cursor: 'pointer' }}>
                What financial solutions does Ridge Crest Financial offer?
              </h3>
              <div className={`accordion-content ${openIndex === 1 ? 'open' : ''}`}>
                <p>
                  Ridge Crest Financial offers flexible term loans, lines of credit, and creative, customized financing solutions tailored to your business needs.
                </p>
              </div>
            </div>
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 2 ? 'active' : ''}`} onClick={() => toggleAccordion(2)} style={{ cursor: 'pointer' }}>
                Do I need to provide securities to qualify?
              </h3>
              <div className={`accordion-content ${openIndex === 2 ? 'open' : ''}`}>
                <p>
                  No, Ridge Crest Financial Group offers unsecured loans. In specific cases, RCFG may secure our loans with a general lien on your business assets and a personal guarantee. Rest assured, your personal assets are not used as collateral.
                </p>
              </div>
            </div>
          </div>

          <div className="faq__content">
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 3 ? 'active' : ''}`} onClick={() => toggleAccordion(3)} style={{ cursor: 'pointer' }}>
                How can Ridge Crest Financial help my business?
              </h3>
              <div className={`accordion-content ${openIndex === 3 ? 'open' : ''}`}>
                <p>
                  Ridge Crest Financial Group provides customized financing options, including flexible loans and lines of credit tailored to your needs. With expert guidance and continuous support, we help your business thrive and succeed.
                </p>
              </div>
            </div>
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 4 ? 'active' : ''}`} onClick={() => toggleAccordion(4)} style={{ cursor: 'pointer' }}>
                What can I use the funding towards?
              </h3>
              <div className={`accordion-content ${openIndex === 4 ? 'open' : ''}`}>
                <p>
                  Ridge Crest Financial Group allows flexibility in the use of funds, provided they are for legitimate business purposes.
                </p>
              </div>
            </div>
            <div className="accordion-section">
              <h3 className={`accordion-header ${openIndex === 5 ? 'active' : ''}`} onClick={() => toggleAccordion(5)} style={{ cursor: 'pointer' }}>
                Can I qualify for a business loan or line of credit if I have bad credit?
              </h3>
              <div className={`accordion-content ${openIndex === 5 ? 'open' : ''}`}>
                <p>
                  Absolutely! Each applicant is considered on a case-by-case basis. Even with bad credit, you can still qualify for a business loan or line of credit. We consider your overall business health, not just your credit score.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="funding__container">
          <h3 className="title">Get the Funding <span>You Need</span></h3>
          <Link href="/application" className="btn">Start Now</Link>
        </div>
      </div>
    </section>
  )
}
