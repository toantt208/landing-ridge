import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - RidgeCrest Financial Group',
  description: 'Thank you for choosing Ridge Crest Financial Group! Your application is being reviewed and one of our agents will contact you shortly.',
  robots: 'index, follow',
}

export default function ThankYou() {
  return (
    <>
      <header className="app-header">
        <div className="app-header__container">
          <Link href="/">
            <div className="app-header__logo">
              <Image src="/images/logo.svg" width={219} height={40} alt="Ridge Crest Financial Group" />
            </div>
          </Link>
        </div>
      </header>
      <main>
        <section className="thankyouMain">
          <div className="layoutContainer" style={{ backgroundColor: 'rgba(0, 28, 65, 0.05)' }}>
            <div className="layoutWrapper">
              <div className="thankYouContainer">
                <Image src="/images/thankyou.svg" width={80} height={88} aria-label="Trophy Icon" alt="Trophy Icon" />
                <div className="titleWrapper">
                  <h1 className="thankYouTitle">Thank You</h1>
                  <p className="thankYouDesc">
                    for choosing Ridge Crest Financial Group! <br />
                    Your application is being reviewed and one of our agents will contact you shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="whatnextMain" style={{ backgroundColor: '#fff' }}>
          <div className="layoutContainer">
            <div className="layoutWrapper">
              <div className="whatnextContainer">
                <h2 className="titleSection">What&apos;s next?</h2>
                <div className="cardsContainer">
                  <div className="card">
                    <div className="imgContainer">
                      <Image
                        src="/images/BvW-onlu.svg"
                        alt="Phone icon"
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="cardInfoWrapper">
                      <h3 className="cardTitle">Wait for a call</h3>
                      <p className="cardInfo">
                        You can expect to receive a call from one of our loan advisors within one business day.
                        We will discuss your business needs and the best loan options for your business objectives.
                        This is your chance to ask any questions about the type of business loan you need and the
                        terms of the loan.
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="imgContainer">
                      <Image
                        src="/images/UTsBIfjq.svg"
                        alt="Discussion icon"
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="cardInfoWrapper">
                      <h3 className="cardTitle">Finalize your application</h3>
                      <p className="cardInfo">
                        To finalize your application, we need to examine your most up-to-date business checking
                        account activity for the past 90 days. For instructions on downloading your bank statements,
                        please visit your bank&apos;s website or Google, &quot;how to download [bank name] bank statements&quot;.
                      </p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="imgContainer">
                      <Image
                        src="/images/DIfRnbjJ.svg"
                        alt="Hands icon"
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="cardInfoWrapper">
                      <h3 className="cardTitle">Count on us</h3>
                      <p className="cardInfo">
                        We&apos;re here for you if you need anything throughout the lending process. Feel free to
                        call us or send an email with any questions or concerns to{' '}
                        <a className="link" href="mailto:admin@ridgecrestfg.com">
                          admin@ridgecrestfg.com
                        </a>{' '}
                        and we&apos;ll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
