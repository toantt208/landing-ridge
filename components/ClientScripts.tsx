'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ClientScripts() {
  useEffect(() => {
    // Initialize accordion and mobile menu after jQuery loads
    const initializeScripts = () => {
      if (typeof window !== 'undefined' && (window as any).$) {
        const $ = (window as any).$

        // Accordion functionality
        $(".accordion-header").off('click').on('click', function() {
          $(".accordion-content").not($(this).next()).slideUp()
          $(".accordion-header").not(this).removeClass("active")
          $(this).next().slideToggle()
          $(this).toggleClass("active")
        })

        // Mobile menu toggle
        $('.humberget').off('click').on('click', function() {
          $('.header_nav').toggleClass('header_nav-toggle')
          $('body').toggleClass('overlay')
        })
      }
    }

    // Try to initialize immediately if jQuery is already loaded
    if ((window as any).$) {
      initializeScripts()
    }

    // Also set up a listener for when jQuery loads
    const timer = setInterval(() => {
      if ((window as any).$) {
        initializeScripts()
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Script
        src="/js/jquery.min.js"
        strategy="beforeInteractive"
      />
    </>
  )
}
