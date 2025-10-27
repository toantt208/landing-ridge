import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - RidgeCrest Financial Group',
  description: 'This Privacy Policy shall be effective as of July 1, 2024. This website is owned and operated by Ridgecrest Financial LLC ("Ridgecrest"). We at Ridgecrest respect and protect the privacy of visitors to our websites, and the privacy of our customers.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    locale: 'en_US',
    type: 'article',
    title: 'Privacy Policy - ridgecrestfg',
    description: 'This Privacy Policy shall be effective as of July 1, 2024. This website is owned and operated by Ridgecrest Financial LLC ("Ridgecrest"). We at Ridgecrest respect and protect the privacy of visitors to our websites, and the privacy of our customers.',
    url: 'https://ridgecrestfg.com/privacy-policy/',
    siteName: 'ridgecrestfg',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main>
        <section className="breadcrumb-main">
          <div className="auto-container">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li>&gt;</li>
                <li className="active">Privacy Policy</li>
              </ul>
            </nav>
          </div>
        </section>

        <section className="hero-inside transparent">
          <div className="auto-container">
            <h2 className="hero-title">Privacy Policy</h2>
          </div>
        </section>

        <section className="terms-main">
          <div className="auto-container">
            <div className="terms-container">
              <p>This Privacy Policy shall be effective as of July 1, 2024.</p>
              <p>
                This website is owned and operated by Ridgecrest Financial LLC (&quot;Ridgecrest&quot;). We at Ridgecrest respect and
                protect the privacy of visitors to our websites, and the privacy of our customers. We respect and value the
                privacy of our clients and have developed this Privacy Policy to demonstrate our commitment to protecting
                your privacy. Except where otherwise noted, this Privacy Policy applies to and describes our information
                handling practices when you access our services, which
                include our content located on this website, or any other websites, pages, features, or content we own or
                operate (collectively, the &quot;Site(s)&quot;) or third-party applications relying on API, and related services
                (referred to collectively hereinafter as &quot;Services&quot;).
              </p>
              <p>
                These Sites are general audience websites and we do not knowingly collect personal, or other, information
                from children under the age of 18. If you are under the age of 18, please do not use our site. If we suspect
                that information provided to us is, in fact, personal information of an individual younger than 18 years of
                age, such information will be deleted, aggregated, or anonymized as soon as possible. Please notify us if
                you know of any individuals under the age of 18 using
                our services so we can take action to prevent access to our services.
              </p>
              <p>Ridgecrest is a small business marketplace to assist small businesses in accessing and managing capital.
                Our Privacy Policy applies to everyone who utilizes our Sites.</p>
              <p>
                We encourage you to review Ridgecrest&apos;s <Link href="/terms-of-use">Terms of Use</Link>.
                Where we require your consent to process your personal information, we will ask for your consent to the
                collection, use, and disclosure of your personal information as described further below. We may provide
                additional &quot;just-in-time&quot; disclosures or information about the data processing practices of specific
                Services. These notices may supplement or clarify our privacy
                practices or may provide you with additional choices about how we process your data.
              </p>
              <p><strong>1. Types of Information that is collected</strong></p>
              <p>We collect several types of information about you and your business when you access our Sites.</p>
              <p>
                Our Sites collects information that identifies, relates to, describes, references, is reasonably capable of
                being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer,
                household, or device(&quot;Personal Information&quot;).<br />
                Personal information does not include:
              </p>
              <ul>
                <li>Publicly available information from government records.</li>
                <li>Deidentified or aggregated consumer information.</li>
              </ul>
              <p>To establish an account and access our Services, we&apos;ll ask you to provide us with some important
                information about you. This information is either required by law (e.g. to verify your identity), necessary
                to provide the requested services (e.g. you will need to provide three (3) months of bank statements), or is
                relevant for certain specified purposes, described in greater detail below. As we add new features and
                Services, you may be asked to provide additional information.</p>
              <p>Please note that we may not be able to serve you at all, or our Services may be degraded if you choose not
                to share certain information with us.</p>
              <p><strong>1.1</strong> Information we collect directly from you:</p>
              <p>We collect information directly from you about you.</p>
              <ul>
                <li><strong> Personal Identification Information:</strong> Full name, date of birth, demographic information
                  (e.g. nationality, gender) signature, utility bills, photographs, phone number, home address, IP Address,
                  social security number, and/or email.</li>
                <li><strong>Formal Identification Information:</strong> Government issued identity document such as
                  Passport, Driver&apos;s License, National Identity Card, State ID Card, Tax ID number, passport number,
                  driver&apos;s license details, national identity card details, visa information, and/or any other information
                  deemed necessary to comply with our legal obligations under financial, consumer protection, and commercial
                  lending laws.</li>
                <li><strong>Institutional Information:</strong> Employer Identification number (or comparable number issued
                  by a government), proof of legal formation (e.g. Articles of Incorporation), personal identification
                  information for all material beneficial owners.</li>
                <li><strong>Financial Information:</strong> Bank account information, Tax return information, Federal and
                  State Tax ID, Profit and Loss Statements, Income statements, Credit Score, Business Invoices, and Wire
                  Instructions.</li>
                <li><strong>Transaction Information:</strong> Information about the transactions you make on our Services,
                  such as the name of the recipient, your name, the amount, and/or timestamp.</li>
                <li><strong>Employment Information:</strong> Office location, job title, and/or description of role.</li>
                <li><strong>Correspondence:</strong> Survey responses, information provided to our support team or user
                  research team.</li>
                <li><strong>Business Information:</strong> Type of business, list of officers, members, or managers of the
                  business, articles of incorporation, certificates of good standing, and ownership structure.</li>
              </ul>
              <p>
                The documents and information collected are securely stored and safeguarded. To fulfill our service
                obligations to you, you provide your permission to share any and all information provided to or obtained by
                Ridgecrest on your behalf with lenders, with other businesses who may need this information to fulfill its
                services to Ridgecrest, for Ridgecrest&apos;s business purposes, or to fulfill regulatory or other legal
                requirements. Under no circumstances will we disclose, transmit, or
                share in any way, these documents without your permission, unless being disclosed pursuant to legal and
                regulatory requirements which prohibit this notification.
              </p>
              <p><strong>1.2</strong> Information we collect from you automatically</p>
              <p>We collect information about your computer&apos;s interactions with our Sites for a variety of purposes.</p>
              <p>We receive and store certain types of information automatically, such as whenever you interact with the
                Sites or use the Services. This information helps us address customer support issues, improve the
                performance of our Sites and applications, provide you with a streamlined and personalized experience, and
                protect your account from fraud by detecting unauthorized access. Information collected automatically
                includes:</p>
              <ul>
                <li><strong> Online Identifiers:</strong> Geo location/tracking details, browser fingerprint, operating
                  system, browser name and version, and/or device IP addresses.</li>
                <li><strong>Usage Data:</strong> Authentication data, security questions, click-stream data, public social
                  networking posts, and other data collected via cookies and similar technologies.</li>
              </ul>
              <p>For example, we may automatically receive and record the following information on our server logs:</p>
              <ul>
                <li>How you came to and use the Services;</li>
                <li>Device type and unique device identification numbers;</li>
                <li>Device event information (such as crashes, system activity and hardware settings, browser type, browser
                  language, the date and time of your request and referral URL);</li>
                <li>How your device interacts with our Sites and Services, including pages accessed and links clicked;</li>
                <li>Geographic location; and,</li>
                <li>Other technical data collected through cookies, pixel tags and other similar technologies that uniquely
                  identify your browser.</li>
              </ul>
              <p>We may also use identifiers to recognize you when you access our Sites via an external link, such as a link
                appearing on a third-party site.</p>
              <p><strong>1.3</strong> Information collected from third parties</p>
              <p>We may obtain the following types of information about you from third party sources.</p>
              <p>From time to time, we may obtain information about you from third party sources as required or permitted by
                applicable law. These sources may include:</p>
              <ul>
                <li><strong> Public Databases &amp; ID Verification Partners:</strong> We obtain information about you from
                  public databases and ID verification partners for purposes of verifying your identity in accordance with
                  applicable law.</li>
                <li><strong>Credit Bureaus:</strong> With your consent, we obtain information from credit bureaus, including
                  your credit report. We will not disclose your credit report without your explicit permission. We obtain
                  your credit information to better provide services to you, to match you with appropriate lenders, to
                  ensure your identity, and to avoid fraud.</li>
                <li>
                  <strong>Financial Institution:</strong> With your consent, we obtain information directly from your
                  financial institution, including copies of your account statements. We obtain this information to assist
                  in providing Services to you, including the underwriting process. To do this, we utilize Finicity,
                  Ocrolus, and Plaid. Finicity&apos;s privacy policy, available at
                  <a href="https://www.finicity.com/privacy/" target="_blank" rel="nofollow noopener">https://www.finicity.com/privacy/</a> describes its collection and use of
                  personal data. Ocrolus&apos;s privacy policy, available at <a href="https://www.ocrolus.com/privacy-policy/" target="_blank" rel="nofollow noopener">https://www.ocrolus.com/privacy-policy/</a>, describes its
                  collection and use of personal data. Plaid&apos;s privacy policy, available at
                  <a href="https://plaid.com/legal/#consumers" target="_blank" rel="nofollow noopener">https://plaid.com/legal/#consumers</a>, describes its collection and use of
                  personal data.
                </li>
                <li><strong>Joint Marketing Partners &amp; Resellers:</strong> For example, unless prohibited by applicable
                  law, joint marketing partners or resellers may share information about you with us so that we can better
                  understand which of our Services may be of interest to you.</li>
                <li><strong>Advertising Networks &amp; Analytics Providers:</strong> We work with these providers to provide
                  us with de-identified information about how you found our Sites and how you interact with the Sites and
                  Services. This information may be collected prior to account creation.</li>
                <li><strong>Third Party Service Providers:</strong> Ridgecrest customers who use certain of our products are
                  subject to third-party privacy policies, including WePay, whose privacy policy is maintained at <a href="https://go.wepay.com/privacy-policy/" target="_blank" rel="nofollow noopener">https://go.wepay.com/privacy-policy/</a>.</li>
              </ul>
              <p><strong>1.4</strong> Data Anonymization and Data Aggregation</p>
              <p>We may use data we have anonymized and aggregated for any business purpose.</p>
              <p>Anonymization is a data processing technique that removes or modifies personal information so that it
                cannot be associated with a specific individual. Except for this section, none of the other provisions of
                this Privacy Policy applies to anonymized or aggregated customer data (i.e. information about our customers
                that we combine together so that it no longer identifies or references an individual customer).</p>
              <p>Ridgecrest may use anonymized or aggregate customer data for any business purpose, including to better
                understand customer needs and behaviors, improve our products and services, conduct business intelligence
                and marketing, and detect security threats. We may perform our own analytics on anonymized data or enable
                analytics provided by third parties.</p>
              <p>Types of data we may anonymize include, transaction data, click-stream data, performance metrics, and fraud
                indicators. Moreover, should you request that your information be deleted in accordance with the policies
                set forth more fully below, your information will be anonymized or aggregated, which complies with
                applicable law regarding deletion of personal information.</p>
              <p><strong>2. How information is collected</strong></p>
              <p>We obtain information about you during the application process, and also through your interactions with our
                Sites.</p>
              <p>
                Where we require your consent to process your personal information, we will ask for your consent to the
                collection, use, and disclosure of your personal information as described further below. We may provide
                additional &quot;just-in-time&quot; disclosures or information about the data processing practices of specific
                Services. These notices may supplement or clarify our privacy practices or may provide you with additional
                choices about how we process your data, If you do not agree with or
                you are not comfortable with any aspect of this Privacy Policy, you should immediately discontinue access or
                use of our Services
              </p>
              <p>We obtain the categories of personal information listed below from the following sources:</p>
              <ul>
                <li>Directly from you: For example, from forms you complete or by using our Products and Services.</li>
                <li>Indirectly from you: For example, from observing your actions on our Sites.</li>
                <li>Third Parties: For example, from third-party services which you connect to as part of using our
                  Services.</li>
              </ul>
              <p>
                During the Application Process: To process your initial application for funding, we may require your name,
                address, phone number, email address and other personal information. We may also require the name of your
                business, its address, its federal and state tax ID, the type of business, business location, average
                monthly sales, state of incorporation, name of Landlord. Such information is used primarily to process your
                order or as otherwise described herein. This is information
                you provide to us through our Sites.
              </p>
              <p>
                Emails and telephone calls: We require an email address from you when you register for our services. We use
                your email for both transactional (e.g., application status, application updates, application confirmation,
                etc.) and promotional (e.g., newsletters, new product offerings, event notifications, special third-party
                offers) purposes. E-mail messages we send you may contain code that enables our database to track your usage
                of the e-mails, including whether the email was
                opened and what links (if any) were clicked. If you would rather not receive promotional emails from us,
                please see the section below labeled &quot;Choice/Opt-Out&quot;. We reserve the right to send you certain
                communications relating to the Ridgecrest services, such as service announcements and administrative
                messages, without offering you the opportunity to opt out of receiving<br />
                them. We may also contact you by telephone or text message (including to any wireless number you may provide
                to us) solely in connection with Ridgecrest&apos;s services. If you would rather not receive telephone calls or
                text messages from us, you may change or delete your number from your account preferences page(s), or ask to
                be removed from our contact list if you receive a call or text message from us. We fully comply with the
                requirements of the U.S. CAN-SPAM Act, the Telephone
                Sales Rule, and the Telephone Consumer Protection Act (TCPA).
              </p>
              <p>
                Log files: Any time you visit any of our Sites, our servers automatically gather information from your
                browser (such as your IP addresses, browser type, Internet service provider (ISP), referring/exit pages,
                platform type, date/time stamp, and number of clicks) to analyze trends, administer the site, prevent fraud,
                track visitor movement in the aggregate, and gather broad demographic information. For example, we may log
                your IP address for system administration purposes. IP
                addresses are logged to track a user&apos;s session. This gives us an idea of which parts of our site users are
                visiting. We do not share the log files externally.
              </p>
              <p>
                Cookies: We use &quot;cookies&quot; to keep track of some types of information while you are visiting our Sites or
                using our services. Cookies are very small files placed on your computer, and they allow us to count the
                number of visitors to our Sites and distinguish repeat visitors from new visitors. They also allow us to
                save user preferences and track user trends. We rely on cookies for the proper operation of our Sites;
                therefore if your browser is set to reject all cookies, the Sites
                will not function properly. Users who refuse cookies assume all responsibility for any resulting loss of
                functionality. We do not link the cookies to any personally identifiable information.
              </p>
              <p>Web Beacons: &quot;Web beacons&quot; (also known as &quot;clear gifs&quot; and &quot;pixel tags&quot;) are small transparent graphic
                images that are often used in conjunction with cookies in order to further personalize our Sites for our
                users and to collect a limited set of information about our visitors. We may also use web beacons in email
                communications in order to understand the behavior of our customers. We do not link the web beacons to any
                personally identifiable information.</p>
              <p>
                Other sources and third parties: We may obtain information about you from third parties. We combine this
                third-party data with information we already have about you to create tailored advertising and other
                relevant product recommendations. If you provide information about others, or if others give us your
                information, we will only use that information for the specific reason for which it was provided to us. Any
                information obtained from a third-party will be used to assist
                matching your business with various lenders.
              </p>
              <p>The sites contain links to other websites that are maintained by third parties. These third parties are
                solely responsible for their own websites and we encourage you to reach out to such third parties for copies
                of and information regarding their security practices. We do not control, and are not responsible for, the
                privacy and security practices of these third parties.</p>
              <p><strong>3. How your information is used</strong></p>
              <p>We use your information for a variety of reasons, all of which support Ridgecrest&apos;s Sites and Services.</p>
              <p>Provide Ridgecrest services: We process your personal information to provide the Services to you. For
                example, when you wish to seek business financing from one of our financing partners, we require certain
                information such as your identification, contact information, and income information. We cannot provide you
                with Services without such information.</p>
              <p>
                To provide Service communications: We send administrative or account-related information to you to keep you
                updated about our Services, inform you of relevant security issues or updates, or provide other
                transaction-related information. Without such communications, you may not be aware of important developments
                relating to your account that may affect how you can use our Services. You may not opt-out of receiving
                critical service communications, such as emails or mobile
                notifications sent for legal or security purposes;
              </p>
              <p>To provide Customer service: We process your personal information when you contact us to resolve any
                questions, disputes, collect fees, or to troubleshoot problems. Without processing your personal information
                for such purposes, we cannot respond to your requests and ensure your uninterrupted use of the Services;</p>
              <p>For research and development purposes: We process your personal information to better understand the way
                you use and interact with Ridgecrest&apos;s Services. In addition, we use such information to customize, measure,
                and improve Ridgecrest&apos;s Services and the content and layout of our applications, and to develop new
                services. Without such processing, we cannot ensure your continued enjoyment of our Services;</p>
              <p>To enhance your experience: We process your personal information to provide a personalized experience, and
                implement the preferences you request. For example, you may choose to provide us with access to certain
                personal information stored by third parties. Without such processing, we may not be able to ensure your
                continued enjoyment of part or all of our Services;</p>
              <p>To facilitate corporate acquisitions, mergers, or transactions: We may process any information regarding
                your account and use of our Services as is necessary in the context of corporate acquisitions, mergers, or
                other corporate transactions. You have the option of closing your account if you do not wish to have your
                personal information processed for such purposes.</p>
              <p>To maintain legal and regulatory compliance: Most of our core Services are subject to laws and regulations
                requiring us to collect, use, and store your personal information in certain ways. For example, Ridgecrest
                must identify and verify customers using our Services in order to comply with commercial lending laws across
                jurisdictions.</p>
              <p>To enforce our terms in our user agreement and other agreements: Ridgecrest handles sensitive information,
                such as your identification and financial data, so it is very important for us and our customers that we
                actively monitor, investigate, prevent, and mitigate any potentially prohibited or illegal activities,
                enforce our agreements with third parties, and/or prevent and detect violations of our posted user agreement
                or agreements for other Services;</p>
              <p>To detect and prevent fraud: We process your personal information in order to help detect, prevent, and
                mitigate fraud and abuse of our services and to protect you against account compromise or information loss;
              </p>
              <p>To ensure Quality control: We process your personal information for quality control and staff training to
                make sure we continue to provide you with accurate information. If we do not process personal information
                for quality control purposes, you may experience issues on the Services;</p>
              <p>
                To ensure network and information security: We process your personal information in order to enhance
                security, monitor and verify identity or service access, combat spam or other malware or security risks and
                to comply with applicable security laws and regulations. The threat landscape on the internet is constantly
                evolving, which makes it more important than ever that we have accurate and up-to-date information about
                your use of our Services. Without processing your personal
                information, we may not be able to ensure the security of our Services.
              </p>
              <p><strong>4. Disclosure of information to third parties</strong></p>
              <p>We may disclose your personal information as required by law, to provide the Services, and for legitimate
                business purposes.</p>
              <p>We may share your personal information by disclosing it to a third party for a business purpose. We only
                make these business purpose disclosures under written contracts that describe the purposes, require the
                recipient to keep the personal information confidential, and prohibit using the disclosed information for
                any purpose except performing the contract.</p>
              <p><em>4.1. Disclosure By Law:</em></p>
              <p>You acknowledge and agree that we may disclose information you provide if required to do so by law, at the
                request of a third party, or if we, in our sole discretion, believe that disclosure is reasonable to (1)
                comply with the law, requests or orders from law enforcement, or any legal process (whether or not such
                disclosure is required by applicable law) and (2) protect or defend Ridgecrest´s, or a third party´s, rights
                or property.</p>
              <p><em>4.2. Lenders and/or brokers.</em></p>
              <p>
                By signing up for our services or submitting a request for a business loan product or service as offered on
                the sites, you signify your agreement to proceed and that you are consenting, acknowledging and agreeing to
                the disclosure of your information with lenders and/or brokers within our network. We will not perform a
                credit check without your authorization. Please be aware that the lenders, brokers, and/or other service
                providers with whom you are matched and with whom your
                information is shared may retain your information, even if you do not enter into an agreement for their
                products or services. Please contact each such party directly regarding their privacy and information
                policies. Also, if you enter into an agreement with a lender, broker, or other service provider through the
                Ridgecrest service and make changes to the information you have provided to us, we may share the updated
                information with such lenders, brokers, and/or service providers.
              </p>
              <p><em>4.3. Disclosure to Trusted Third Parties By Us:</em></p>
              <p>
                Upon completing a profile on the site, and filling out the entirety of the application, we will share your
                information with third party service providers with whom you are matched. A list of those partners can be
                found on our partners page. By accepting the <Link href="/terms-of-use">Terms of
                  Use</Link>, you agree to receive various marketing materials from our trusted third parties, including
                potential lenders and service providers. We are not responsible for
                the material of the third parties or their actions. Your information may also be shared with third-party
                contractors that provide services to Ridgecrest and are bound by this privacy policy. Your information will
                be treated as private and confidential by such third parties and not used for any other purpose than you
                authorize. In addition, from time to time, we may share personal information (such as e-mail or mailing
                address) about our user base with carefully selected third
                parties, so they can offer goods and services that we believe may be of interest to our users. If you do not
                wish to receive offers from our trusted partners, you can change your email preferences at any time by
                following the steps outlined in the &quot;Choice/Opt-Out&quot; section below.
              </p>
              <p><em>4.4. Service Providers</em></p>
              <p>With service providers under contract who help with parts of our business operations. Our contracts require
                these service providers to only use your information in connection with the services they perform for us,
                and prohibit them from selling your information to anyone else. Examples of the types of service providers
                we may share personal information with (other than those mentioned above) include:</p>
              <ul>
                <li>Network infrastructure</li>
                <li>Cloud storage</li>
                <li>Payment processing</li>
                <li>Transaction monitoring</li>
                <li>Security</li>
                <li>Document repository services</li>
                <li>Customer support</li>
                <li>Internet (e.g. ISPs)</li>
                <li>Data analytics</li>
                <li>Information Technology</li>
                <li>Marketing</li>
              </ul>
              <p><em>4.5. Other Companies</em></p>
              <p>With companies or other entities that we plan to merge with or be acquired by. You will receive prior
                notice of any change in applicable policies.</p>
              <p><em>4.6. Third party advertising platforms and providers</em></p>
              <p>We may share certain personal information with, or make certain personal information available to, third
                party advertising platforms and providers, such as Usage Data and Online Identifiers, when you visit certain
                of our Sites or certain portions of our Sites.</p>
              <p><em>4.7. Professionals</em></p>
              <p>With our professional advisors who provide banking, legal, compliance, insurance, accounting, or other
                consulting services in order to complete third party financial, technical, compliance and legal audits of
                our operations or otherwise comply with our legal obligations.</p>
              <p><em>4.8. Miscellaneous</em></p>
              <p>We may disclose your personal information for any purpose with which you consent.</p>
              <p><strong>5. Updating, accessing, retaining, and deleting your information</strong></p>
              <p>You may choose to update, access, or delete your data; however, we may be legally required to retain your
                information to comply with the law.</p>
              <p>
                You may update or access your contact information at any time by logging into your account and making any
                change or update. Any changes made will be updated<br />
                immediately.
              </p>
              <p>If you want to stop using your account you may deactivate it. When you deactivate an account, your
                information will not be sent to any further lenders, brokers, or other third parties, but the information
                will not be deleted. By deactivating your account you will have the ability to restore the account in its
                entirety.</p>
              <p>You may delete your account from Ridgecrest in certain circumstances upon submitting a request to
                Ridgecrest to delete your account. In certain circumstances, Ridgecrest is legally required to continue to
                maintain the information in your account. In these circumstances, Ridgecrest will place your account into a
                deactivated status, will opt you out of all communications, and will disable your access to the account.</p>
              <p>
                In the event that Ridgecrest is able to comply with your request to delete your account, data you provide to
                Ridgecrest will be retained by Ridgecrest in a commercially reasonable manner and to comply with relevant
                lending laws. Once your account is deleted, Ridgecrest will not share your information, and will only use
                your data for internal research and Ridgecrest marketing. Data that is retained by Ridgecrest will be
                retained for a commercially reasonable period of time as
                determined by Ridgecrest in conformance with applicable law.
              </p>
              <p>
                We store your personal information securely throughout the life of your Ridgecrest Account. We will only
                retain your personal information for as long as necessary to fulfill the purposes for which we collected it,
                including for the purposes of satisfying any legal, accounting, or reporting obligations or to resolve
                disputes. While retention requirements vary by jurisdiction, information about our typical retention periods
                for different aspects of your personal information are
                described below.
              </p>
              <ol>
                <li>
                  Personal information collected to comply with our legal obligations under financial, consumer protection,
                  and commercial credit laws may be retained after<br />
                  account closure for as long as required under such laws.
                </li>
                <li>
                  Contact Information such as your name, email address and telephone number for marketing purposes is
                  retained on an ongoing basis until you unsubscribe.<br />
                  Thereafter we will add your details to our suppression list to ensure we do not inadvertently market to
                  you.
                </li>
                <li>
                  Content that you post on our such as support desk comments, photographs, videos, blog posts, and other
                  content may be kept after you close your account<br />
                  for audit and crime prevention purposes (e.g. to prevent a known fraudulent actor from opening a new
                  account).
                </li>
                <li>Recording of our telephone calls with you may be kept for a period of up to six years.</li>
              </ol>
              <p>Information collected via technical means such as cookies, web page counters and other analytics tools is
                kept for a period of up to one year from expiry of the cookie.</p>
              <p><strong>Opting out of receiving electronic communications from us.</strong> If you no longer wish to
                receive promotional email communications from us, please follow the instructions provided in Section 7
                below.</p>
              <p><strong>Your California privacy rights.</strong> In addition to the above, if you are a California
                resident, please review our California Privacy Notice to learn more about the personal information we
                collect, use and disclose, as well as your privacy rights related to your personal information under the
                California Consumer Privacy Act (CCPA) and its amendment, the California Privacy Rights Act (CPRA), as well
                as other state laws.</p>
              <p><strong>6. Security</strong></p>
              <p>We have taken steps to protect your information in a commercially reasonable manner.</p>
              <p>
                We have extensive security measures in place to protect the loss, misuse and alteration of the information
                stored in our database. These measures include the use of industry standard encryption methods and
                administrative access to site data, as well as other proprietary security measures which are applied to all
                repositories and transfers of user information. We will exercise reasonable care in providing secure
                transmission of information between your computer and our servers,
                but given that no information transmitted over the Internet can be guaranteed 100% secure, we cannot ensure
                or warrant the security of any information transmitted to us over the Internet and hence accept no liability
                for any unintentional disclosure. For further information, please see our <Link href="/terms-of-use">Terms of Use</Link>.
              </p>
              <p>In the event there is a data breach at Ridgecrest, Ridgecrest will notify you as soon as reasonably
                practicable. We will notify you that a breach occurred, and any additional information needed to fulfill our
                obligation with breach notification laws and regulations.</p>
              <p>Do not share your account login and/or password with any other individual. Your account login and/or
                password is sensitive and your sharing of your account information may lead to additional exposure to your
                account.</p>
              <p><strong>7. Choice / Opt out of Marketing</strong></p>
              <p>You may choose to discontinue your use of our services.</p>
              <p>You may choose to stop receiving our newsletter or marketing emails by following the unsubscribe
                instruction included in these emails or you can contact us at <a href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</a>.</p>
              <p>You can choose not to provide us with certain information, but this will likely result in the inability to
                use certain features of the site and to obtain the services and products you are seeking. As a general
                matter, do not post personal information on public forums. You are solely responsible for the posting of any
                personal information on public forums.</p>
              <p>
                If, after signing up for our services, you decide you no longer wish to receive our services or future
                contact from lenders, brokers, or other third parties to which your<br />
                information has been referred, you may cancel your account as discussed herein. Upon canceling your account,
                your information will no longer be sent to lenders, brokers, or other third parties. This does not guarantee
                that these lenders, brokers, or other third parties will cease contacting you or using your information.
                Please be sure to reach out to all lenders, brokers, and/or other third parties to ensure they cease
                contacting you.
              </p>
              <p>
                Certain federal and state regulations require that we maintain a record of your information for certain
                periods of time. Due to these regulations, we may be unable to<br />
                completely delete your information from our database until the time requirements of these regulations have
                expired.
              </p>
              <p><strong>8. California Privacy Notice</strong></p>
              <p>In addition to the rights provided for above, the information contained in this section applies solely to
                those individuals who reside in the State of California. We adopt this notice to comply with the California
                Consumer Privacy Act of 2018 and California Privacy Rights Act of 2020 (together, the &quot;CCPA&quot;) and any terms
                defined in the CCPA have the same meaning when used in this Policy.</p>
              <p>
                Effective January 1, 2020, pursuant to the California Consumer Privacy Act of 2018 (&quot;CCPA&quot;), California
                residents have certain rights in relation to their personal<br />
                information, subject to limited exceptions. Any terms defined in the CCPA have the same meaning when used in
                this California Privacy Notice.
              </p>
              <p><strong>8.1 Personal information we collect</strong></p>
              <p>Ridgecrest may collect, or has collected, the following categories of personal information from California
                residents within the last twelve (12) months:</p>
              <div className="tabel-grp">
                <table className="table">
                  <tbody>
                    <tr>
                      <td width="131"><strong>CATEGORY</strong></td>
                      <td width="493"><strong>EXAMPLES</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Identifiers</strong></td>
                      <td width="493"><strong>First and last name; email address; phone number; home address; social
                        security number, driver&apos;s license, passport, or </strong><strong>other government issued identity
                        document; password and account credentials; Employer Identification Number (or comparable number
                        issued by a government); and other contact and personal identification information</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Personal information categories </strong><strong>listed in the
                      </strong><strong>California Civ </strong><strong>Code&nbsp; §</strong><strong>1798.80(e)</strong>
                      </td>
                      <td width="493"><strong>First and last name; phone number; home address; signature; social security
                        number, driver&apos;s license, passport, or other government issued identity document; payment card
                        information; bank account information</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Internet or other </strong><strong>electronic activity information</strong>
                      </td>
                      <td width="493">
                        <strong>Cookie identifiers; pixel tags; embedded scripts; tags; IP address, device identifier,
                          device type, operating system and&nbsp; </strong><strong>Internet browser type, screen resolution,
                          operating system name and version, device manufacturer and model, language, plug-ins, add-ons, and
                          the language version of the Websites </strong><strong>and Apps you are visiting; geolocation data,
                          browsing history, time spent on the Platform, pages visited, links clicked,
                        </strong><strong>language preferences, patterns of use, and the pages that led </strong><strong>or
                          referred you to our Platform including individual Websites </strong><strong>and Apps</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Characteristics of </strong><strong>protected </strong><strong>classifications
                        under </strong><strong>California or federal law</strong></td>
                      <td width="493"><strong>Date of birth; demographic information (e.g., nationality, gender)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Commercial information</strong></td>
                      <td width="493"><strong>Payment histories; account balances and activity; products and services that
                        you have purchased, obtained, or considered; utility bills; profit and loss statements; income
                        statements; </strong><strong>credit score and other credit report information; information about
                        transactions you make on the Services; and/or other purchasing or consumer histories, tendencies,
                        and preferences</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Geolocation data</strong></td>
                      <td width="493"><strong>Global Positioning System (&quot;GPS&quot;) data based on your IP address</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Audio, electronic, or visual information</strong></td>
                      <td width="493"><strong>Photographs; recordings of calls to or from our customer service
                        centers</strong></td>
                    </tr>
                    <tr>
                      <td width="131">
                        <strong>Professional or </strong><strong>employment-<br />
                          related information</strong>
                      </td>
                      <td width="493"><strong>Office location, job title, and/or description of role</strong></td>
                    </tr>
                    <tr>
                      <td width="131"><strong>Inferences about you</strong></td>
                      <td width="493"><strong>Inferences based on information about an individual to create a profile about
                        a consumer reflecting the individual&apos;s </strong><strong>preferences, characteristics,
                        psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and
                      </strong><strong>aptitudes</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Please note that because of the overlapping nature of certain of the categories of personal information
                identified above, which are required by state law, some of the personal information we collect may be
                reasonably classified under multiple categories.</p>
              <p><strong>Sensitive personal information.</strong> Certain of the personal information that we collect, as
                described above, may constitute &quot;sensitive personal information&quot; under California law, including:</p>
              <ul>
                <li>Social security, driver&apos;s license, state identification card, and/or passport number</li>
                <li>Account log-in combined with any required security or access codes, passwords, or other credentials
                  allowing access to an account</li>
                <li>Precise geolocation</li>
                <li>Racial and/or ethnic origin</li>
                <li>Personal information concerning sex life or sexual orientation</li>
              </ul>
              <p>The specific types of personal information we collect are further detailed in Section 1 of this Privacy
                Policy. Personal information does not include information excluded from the CCPA&apos;s scope.</p>
              <p>
                Ridgecrest will not retain any information we collect form you for longer than is reasonably necessary for
                the disclosed purpose of using such information. Our determination of precise retention periods will be
                based on (i) the length of time we have an ongoing relationship with you; (ii) whether there is a legal
                obligation to which we are subject; and (iii) whether retention is advisable in light of our legal position
                (such as in regard to applicable statutes of limitations,
                litigation or regulatory investigations).
              </p>
              <p><strong>8.2 Uses of personal information</strong></p>
              <p>Ridgecrest may collect, use, or disclose personal information about California residents for purposes
                listed in Section 3 of this Privacy Policy.</p>
              <p>The sensitive personal information that we collect as described in Section 10.1 above may be used for any
                of these purposes.</p>
              <p><strong>8.3 Sources of personal information</strong></p>
              <p>Ridgecrest may collect personal information about California residents from the categories of sources
                listed in Sections 1.3 and 2 of this Privacy Policy.</p>
              <p><strong>8.4 Disclosure of personal information</strong></p>
              <p>We may disclose your personal information to the categories of service providers and third parties
                identified in Section 4 of this Privacy Policy, and in ways that are described in that section.</p>
              <p>
                This includes disclosure of your personal information to service providers for a business purpose. When we
                disclose personal information for a business purpose, we enter a contract that describes the purpose and
                requires the recipient to both keep that personal information confidential and not to use it for any purpose
                except performing the contract. In the preceding twelve (12) months, we have disclosed each categories of
                personal information listed in Section 8(a), including
                the listed sensitive personal information, for a business purpose.
              </p>
              <p>
                In addition, Ridgecrest &quot;sells&quot;/&quot;shares&quot; certain personal information, as those terms are defined by the
                CCPA, for purposes of cross-contextual behavioral advertising, as that term is defined by the CCPA.
                Specifically, as with many online companies, Ridgecrest partners with third parties advertising platforms
                and similar providers to manage our marketing of Ridgecrest on other platforms, where such advertising is
                based on your past visits to our Sites and Services. These third
                party partners may use technologies, such as cookies and pixels, to gather information about your activities
                on the Sites and Services to deliver such advertising to you when you visit their platforms. Please also
                review our disclosures in Sections 1.2, 2, and 5 of our Privacy Policy for more information about this
                activity.
              </p>
              <p>The CCPA requires us to identify the categories of personal information that we have &quot;sold&quot;/&quot;shared&quot; under
                the CCPA in the preceding twelve (12) months. In the last twelve (12) months, we have &quot;sold&quot;/&quot;shared&quot; the
                following categories of personal information to advertising partners for cross-context behavioral
                advertising purposes:</p>
              <ul>
                <li>Identifiers</li>
                <li>Internet or other electronic network activity information</li>
                <li>Personal information categories listed in the California Civ Code § 1798.80(e)</li>
                <li>Internet or other electronic activity information</li>
              </ul>
              <p><strong>8.5 Your California privacy rights</strong></p>
              <p>The CCPA provides California residents with specific privacy rights regarding their personal information.
                This section describes your CCPA rights and explains how to exercise those rights.</p>
              <p>If you are a California resident, you have the right to make the following requests under applicable
                California law in relation to your personal information, subject to certain exceptions:</p>
              <ul>
                <li>Right to Know. You have the right to, up to twice in a 12-month period, request what personal
                  information we collect, use, disclose, and/or sell, and to whom, as applicable. You may request either a
                  report disclosing the general categories of the personal information we collect, or a report disclosing
                  the specific pieces of personal information we collect.</li>
                <li>Right to Delete. You have the right to request, under certain circumstances, the deletion of your
                  personal information that we collect.</li>
                <li>Right to Opt-Out of Sale or Sharing. You have the right to opt-out of the &quot;sale&quot;/&quot;sharing&quot; of your
                  personal information, as those terms are defined under California law.</li>
                <li>Right to Limit Use and Disclosure. You have the right to limit the use or disclosure of your sensitive
                  personal information to only the uses necessary for us to provide our products and services to you, or for
                  certain other authorized purposes. We will not use or disclose your sensitive personal information after
                  you have exercised your right unless you subsequently provide consent for the use of your sensitive
                  personal information for additional purposes.</li>
                <li>Right to Correct. You have the right to request the correction of your inaccurate personal information.
                </li>
                <li>Right to Non-Discrimination. You have the right not to receive discriminatory treatment for the exercise
                  of the privacy rights described above.</li>
              </ul>
              <p><strong>How to submit a request.</strong></p>
              <p>You can exercise your rights by contacting us at <a href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</a>, or by contacting customer service at
                1-800-546-2190, so that we may consider your request.</p>
              <p>Any request you submit to us is subject to an identification and residency verification process as
                permitted by the CCPA. We will not fulfill your request unless you have provided sufficient information that
                enables us to reasonably verify that you are the consumer about whom we collected the personal information
                on. In order to verify you, you must provide us with first name, last name, and email address.</p>
              <p>
                <strong>Requests by authorized agents.</strong> If you are a California resident, you may designate an
                authorized agent to make a request to access or a request to delete on your behalf. We will respond to your
                authorized agent&apos;s request if they submit proof that they are authorized to be able to act on your behalf,
                or submit evidence you have provided them with power of attorney pursuant to California Probate Code section
                4000 to 4465. We may deny requests from authorized agents
                who do not submit proof that they have been authorized by you to act on their behalf, or are unable to
                verify their identity
              </p>
              <p><strong>Household data.</strong> We currently do not collect household data. If we receive a request
                submitted by all members of a household, we will individually respond to each request. We will not be able
                to comply with any request by a member of a household under the age of 18, as we do not collect personal
                information from any person under the age of 18.</p>
              <p><strong>Responses.</strong> We will respond to your request within forty-five (45) days after receipt of a
                Verifiable Consumer Request for a period covering twelve (12) months and for no more than twice in a
                twelve-month period. Ridgecrest reserves the right to extend the response time by an additional forty-five
                (45) days when reasonably necessary and provided consumer notification of the extension is made within the
                first forty-five (45) days.</p>
              <p>These rights are subject to various exclusions and exceptions under California law and other applicable
                laws. In addition, if we are unable to verify your identity to a degree of certainty as required by the CCPA
                through any reasonable method, we will state that we are unable to verify in a written response to you along
                with a reason as to why there is no reasonable method by which we can verify your identity.</p>
              <p><strong>Direct marketing by third parties.</strong> Ridgecrest does not disclose personal information to
                third parties for their own direct marketing purposes. However, California residents additionally have the
                right to request information regarding such practices under California&apos;s &quot;Shine the Light&quot; law. If you are a
                California resident and would like to inquire further, please email <a href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</a>.</p>
              <p>We will continue to update our business practices as direct regulatory guidance becomes available.</p>
              <p><strong>8.6 Notice of Right to Opt-Out</strong></p>
              <p>As detailed in Section 10.4 above, Ridgecrest &quot;sells&quot;/&quot;shares&quot; personal information with third parties for
                purposes of cross-context behavioral advertising, as those terms are defined by the CCPA.</p>
              <p>If you wish to opt-out of the &quot;sale&quot;/&quot;sharing&quot; of the limited personal information that is gathered when
                you visit our Sites and Services for purposes of cross-context behavioral advertising, please email <a href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</a>.</p>
              <p><strong>9. Special Notice to Vermont Residents</strong></p>
              <p>Vermont residents have access to additional limits on the sharing of their personal information subject to
                certain exceptions.</p>
              <p>
                Vermont law places additional limits on sharing information about Vermont residents so long as they remain
                residents of Vermont. In accordance with Vermont law, we will not share information we collect about Vermont
                residents to companies outside of Ridgecrest except: (1) As permitted by law; (2) To companies that perform
                marketing or other services on our behalf; (3) Name, contact and transaction and experience information to
                other financial institutions with which we have joint
                marketing agreements; or (4) With the authorization or consent of the Vermont resident. We also will not
                share non-transactional information about Vermont residents received from others within the Ridgecrest
                family of companies except with the authorization or consent of the Vermont resident.
              </p>
              <p><strong>10. Notification of Privacy Policy Changes</strong></p>
              <p>We reserve the right to update this Privacy Policy and will notify you if we do so; however, we encourage
                you to regularly review this policy for the latest information.</p>
              <p>We may update this privacy policy to reflect changes to our information practices. If we make any material
                changes we will notify you by email (sent to the email address specified in your account) or by means of a
                notice on this Site. We encourage you to periodically review this page for the latest information on our
                privacy policy. When we make changes to this Privacy Policy we will revise the revision date at the top of
                the Privacy Policy.</p>
              <p><strong>11. Contact Information</strong></p>
              <p>If you have any questions about this Privacy Policy or wish to exercise one of your privacy rights, please
                contact us using the following information:</p>
              <p>
                1200 Brickell Avenue, Suite 1950 #1006<br />
                Miami, FL 33131<br />
                Telephone: 1-800-546-2190<br />
                Email: <a href="mailto:admin@ridgecrestfg.com">admin@ridgecrestfg.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
