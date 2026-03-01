import React, { useEffect, useRef } from 'react'

let devfolioLoader = null
function loadDevfolioSdk() {
  if (devfolioLoader) return devfolioLoader
  devfolioLoader = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve()
    if (window.__DEVFOLIO_SDK_LOADED) return resolve()

    const existing = document.querySelector('script[src="https://apply.devfolio.co/v2/sdk.js"]')
    if (existing) {
      if (existing.getAttribute('data-devfolio-loaded')) {
        window.__DEVFOLIO_SDK_LOADED = true
        return resolve()
      }
      existing.addEventListener('load', () => {
        window.__DEVFOLIO_SDK_LOADED = true
        existing.setAttribute('data-devfolio-loaded', '1')
        resolve()
      })
      existing.addEventListener('error', reject)
      return
    }

    const s = document.createElement('script')
    s.src = 'https://apply.devfolio.co/v2/sdk.js'
    s.async = true
    s.defer = true
    s.addEventListener('load', () => {
      window.__DEVFOLIO_SDK_LOADED = true
      s.setAttribute('data-devfolio-loaded', '1')
      resolve()
    })
    s.addEventListener('error', reject)
    document.head.appendChild(s)
  })
  return devfolioLoader
}

export default function DevfolioApply({ slug = 'hack-heist-2', theme = 'dark' }) {
  const hostRef = useRef(null)

  useEffect(() => {
    if (!hostRef.current) return

    const selector = `.apply-button[data-hackathon-slug="${slug}"]`
    const existing = document.querySelector(selector)

    if (existing) {
      if (!hostRef.current.contains(existing)) {
        hostRef.current.appendChild(existing)
      }
    } else {
      const btn = document.createElement('div')
      btn.className = 'apply-button'
      btn.setAttribute('data-hackathon-slug', slug)
      btn.setAttribute('data-button-theme', theme)
      hostRef.current.appendChild(btn)
    }

    let mounted = true
    loadDevfolioSdk()
      .then(() => {
        if (!mounted) return
        try {
          if (window.Devfolio && typeof window.Devfolio.render === 'function') {
            window.Devfolio.render()
          } else if (window.Devfolio && typeof window.Devfolio.reload === 'function') {
            window.Devfolio.reload()
          }
        } catch (e) {
          // noop
        }
      })
      .catch(() => { })

    return () => {
      mounted = false
    }
  }, [slug, theme])

  return (
    <div className="mt-8">
      <div className="flex justify-start">
        <div
          ref={hostRef}
          className="relative z-40 h-11 w-[312px] flex items-center justify-start"
        />
      </div>
    </div>
  )
}
