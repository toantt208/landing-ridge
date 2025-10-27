'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An error occurred. Please try again later.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="contact-main sec-padd">
          <div className="auto-container">
            <div className="section-title">
              <h2 className="title mb-10">Contact <span>Us</span></h2>
              <p>Any question or remarks? Just write us a message!</p>
            </div>
            <div className="contact-container">
              <div className="text-content">
                <span className="textIcon1"></span>
                <span className="textIcon2"></span>
                <div>
                  <h3 className="title">Contact Information</h3>
                  <p>Say something to start a live chat!</p>
                </div>
                <div className="connect">
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#37008F"></path>
                    </svg>
                    admin@ridgecrestfg.com
                  </span>
                </div>
                <div className="social">
                  <a href="https://www.facebook.com/people/Ridge-Crest-FG/61561639512371/" target="_blank" rel="noopener nofollow">
                    <Image src="/images/facebook.svg" width={24} height={24} loading="lazy" alt="facebook" />
                  </a>
                  <a href="https://www.linkedin.com/company/ridgecrestfg" target="_blank" rel="noopener nofollow">
                    <Image src="/images/linkedin.svg" width={24} height={24} loading="lazy" alt="linkedin" />
                  </a>
                </div>
              </div>
              <div className="form-content">
                {submitStatus === 'error' && (
                  <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '5px', color: '#721c24' }}>
                    {errorMessage}
                  </div>
                )}
                {submitStatus === 'success' ? (
                  <div className="gform_confirmation_wrapper gform_wrapper gform-theme gform-theme--foundation gform-theme--framework gform-theme--orbital ">
                    <div className="gform_confirmation_message_5 gform_confirmation_message">
                      <div className="contact-confirmation">
                        <h3>Thank You!</h3>
                        <p>Your message was sent successfully.</p>
                        <p>We&apos;ve received your inquiry and will reach out within 24h.</p>
                        <div className="btn-grp">
                          <Link href="/" className="btn">Back to Home</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                <div className="gf_browser_chrome gform_wrapper gform-theme gform-theme--foundation gform-theme--framework gform-theme--orbital" data-form-theme="orbital" data-form-index="0" id="gform_wrapper_5">
                  <form onSubmit={handleSubmit} className="gform_form" id="gform_5">
                    <div className="gform-body gform_body">
                      <div className="gform_fields top_label form_sublabel_below description_below validation_below">
                        <fieldset className="gfield gfield--type-name gfield--input-type-name gfield--width-half gfield_contains_required field_sublabel_hidden_label gfield--no-description">
                          <legend className="gfield_label gform-field-label gfield_label_before_complex">
                            First Name<span className="gfield_required"><span className="gfield_required gfield_required_asterisk">*</span></span>
                          </legend>
                          <div className="ginput_complex ginput_container ginput_container--name">
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="Write your First Name"
                              aria-required="true"
                              required
                            />
                          </div>
                        </fieldset>
                        <fieldset className="gfield gfield--type-name gfield--input-type-name gfield--width-half gfield_contains_required field_sublabel_hidden_label gfield--no-description">
                          <legend className="gfield_label gform-field-label gfield_label_before_complex">
                            Last Name<span className="gfield_required"><span className="gfield_required gfield_required_asterisk">*</span></span>
                          </legend>
                          <div className="ginput_complex ginput_container ginput_container--name">
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Write your Last Name"
                              aria-required="true"
                              required
                            />
                          </div>
                        </fieldset>
                        <div className="gfield gfield--type-email gfield--input-type-email gfield--width-half gfield_contains_required field_sublabel_below gfield--no-description">
                          <label className="gfield_label gform-field-label">
                            Email<span className="gfield_required"><span className="gfield_required gfield_required_asterisk">*</span></span>
                          </label>
                          <div className="ginput_container ginput_container_email">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="large"
                              placeholder="Write your Email"
                              aria-required="true"
                              required
                            />
                          </div>
                        </div>
                        <div className="gfield gfield--type-phone gfield--input-type-phone gfield--width-half gfield_contains_required field_sublabel_below gfield--no-description">
                          <label className="gfield_label gform-field-label">
                            Phone Number<span className="gfield_required"><span className="gfield_required gfield_required_asterisk">*</span></span>
                          </label>
                          <div className="ginput_container ginput_container_phone">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="large"
                              placeholder="Write your Mobile Number"
                              aria-required="true"
                              required
                            />
                          </div>
                        </div>
                        <fieldset className="gfield gfield--type-name gfield--input-type-name gfield--width-full field_sublabel_hidden_label gfield--no-description">
                          <legend className="gfield_label gform-field-label gfield_label_before_complex">Subject</legend>
                          <div className="ginput_complex ginput_container ginput_container--name">
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder="Write your Subject"
                            />
                          </div>
                        </fieldset>
                        <div className="gfield gfield--type-textarea gfield--input-type-textarea gfield--width-full field_sublabel_below gfield--no-description">
                          <label className="gfield_label gform-field-label">Message</label>
                          <div className="ginput_container ginput_container_textarea">
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="textarea small"
                              placeholder="Write your message.."
                              rows={10}
                              cols={50}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gform_footer top_label">
                      <input
                        type="submit"
                        className="gform_button button"
                        value={isSubmitting ? 'Sending...' : 'Send Message'}
                        disabled={isSubmitting}
                      />
                    </div>
                  </form>
                </div>
                  </>
                )}
                <Image className="formIcon" src="/images/letter-send.svg" alt="Form Img" width={240} height={112} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
