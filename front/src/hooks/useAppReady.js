import { useEffect, useState } from 'react'

export function useAppReady() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setIsReady(true)
        })
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return isReady
}