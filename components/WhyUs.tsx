import Link from 'next/link'
import Image from 'next/image'

export default function WhyUs() {
  return (
    <section className="whyus-main sec-padd">
      <div className="auto-container">
        <div className="section-title">
          <h2 className="title">Why <span>Ridge Crest Financial Group?</span></h2>
          <p className="description">
            Experience the difference with our exclusive and customized financing options. <br />
            Join those who have elevated their business potential with Ridge Crest.
          </p>
        </div>
        <div className="whyus-container">
          <div className="whyus__content">
            <Image src="/images/Icons.png" width={110} height={110} alt="Transparency & Integrity" />
            <h3 className="title">Transparency & <span>Integrity</span></h3>
            <p>We build trust with clear <br />communication and ethical practices, ensuring you understand every step.</p>
          </div>
          <div className="whyus__content">
            <Image src="/images/Icons-1.png" width={110} height={110} alt="Accountability & Innovation" />
            <h3 className="title">Accountability & <span>Innovation</span></h3>
            <p>We lead with responsibility and <br />constantly improve to offer agile, <br />efficient financing solutions.</p>
          </div>
          <div className="whyus__content">
            <Image src="/images/Icons-2.png" width={110} height={110} alt="Service Excellence" />
            <h3 className="title">Service Excellence & <span>Customer Focus</span></h3>
            <p>We deliver top-tier service by <br />understanding your business needs <br />to help you succeed.</p>
          </div>
        </div>

        <div className="section-title">
          <h2 className="title">Simple <span>Funding Solutions</span></h2>
        </div>
        <div className="solution_container">
          <div className="solution_content content_1">
            <h3 className="title">Term Loans</h3>
            <p>Get cash now with the option to apply for more later.</p>
            <ul>
              <li>Loans from $5k - $7M</li>
              <li>Flexible repayment terms</li>
            </ul>
            <Link href="/application" className="btn">Apply Now</Link>
          </div>
          <div className="solution_content content_2">
            <h3 className="title">Line of Credit</h3>
            <p>A revolving line of credit with fast access to funds.</p>
            <ul>
              <li>Credit limits from $6k - $1.5M</li>
              <li>Competitive rates for revolving credit with unlimited terms</li>
            </ul>
            <Link href="/application" className="btn">Apply Now</Link>
          </div>
          <div className="solution_content content_3">
            <h3 className="title">Revenue Based Financing</h3>
            <p>With increased sales, repay quicker. Enjoy lower payments and more flexibility when sales drop.</p>
            <ul>
              <li>Up to $15M in working capital</li>
              <li>Variable terms against future revenue</li>
            </ul>
            <Link href="/application" className="btn">Apply Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
