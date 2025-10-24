import Link from 'next/link'

export default function MoneyStarted() {
  return (
    <section className="money-started">
      <div className="auto-container">
        <div className="money-started__container">
          <div className="section-title dark">
            <span className="subline"> - Now that we&apos;ve covered the basics - </span>
            <h2 className="title">How much money <span>do you need?</span></h2>
          </div>
          <div className="money-started__box">
            <button type="button" className="link">$5k - $25k</button>
            <button type="button" className="link">$25k - $75k</button>
            <button type="button" className="link">$75k - $150k</button>
            <button type="button" className="link">$150k - $500k</button>
            <button type="button" className="link">$500k+</button>
          </div>
          <Link href="/application" className="btn">Get Started</Link>
        </div>
      </div>
    </section>
  )
}
