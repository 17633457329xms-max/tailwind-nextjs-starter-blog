'use client'

import { useEffect } from 'react'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID
const scriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js'

export default function UmamiAnalytics() {
  useEffect(() => {
    if (!websiteId || document.querySelector('script[data-website-id]')) return

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = scriptSrc
    script.setAttribute('data-website-id', websiteId)
    document.head.appendChild(script)

    return () => script.remove()
  }, [])

  return null
}
