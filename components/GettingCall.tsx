import Link from 'next/link'
import Image from 'next/image'

export default function GettingCall() {
  return (
    <section className="getting-call">
      <div className="auto-container">
        <div className="getting-call__container sec-padd">
          <div className="text-content">
            <h3 className="title">
              Getting a loan doesn&apos;t have to feel like moving mountains - let us do the heavy lifting. <span>Call today!</span>
            </h3>
            <p className="desciption">
              No expertise. No problem. Let our team of U.S.-based loan advisors guide you through the loan process with transparency, expertise, and personalized support.
            </p>
            <div>
              <h4 className="subtitile">Say Hello!</h4>
              <div className="getting-call_addbox">
                <div>
                  <p><span>Mon-Thu</span></p>
                  <p>9:00am - 7:00pm (ET)</p>
                </div>
                <span className="dline"></span>
                <div>
                  <p><span>Fri</span></p>
                  <p>9:00am - 5:00pm (ET)</p>
                </div>
                <span className="dline"></span>
                <div>
                  <p><span>Sat-Sun</span></p>
                  <p>Closed</p>
                </div>
                <span className="dline"></span>
              </div>
            </div>
            <div className="getting-call_addbox">
              <div>
                <p><span><Link href="tel:1-800-546-2190">1-800-546-2190</Link></span></p>
                <p><Link href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</Link></p>
              </div>
            </div>
          </div>
          <div className="img-content">
            <Image src="/images/smartphone.svg" width={400} height={630} alt="Contact" />
          </div>
        </div>
      </div>
    </section>
  )
}
