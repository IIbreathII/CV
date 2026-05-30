import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import LoadingScreen from './components/UI/loadingScreen/LoadingScreen.jsx'
import { useAppReady } from './hooks/useAppReady'

const RootLayout = () => {
  const isAppReady = useAppReady()

  // Убираем статический preload-veil из index.html — он больше не нужен,
  // т.к. React уже смонтировался и LoadingScreen взял управление
  useEffect(() => {
    document.getElementById('preload-veil')?.remove()
  }, [])

  const [isFirstVisit] = useState(() => {
    return !sessionStorage.getItem('hasVisitedBefore')
  })

  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => setMinTimePassed(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [isFirstVisit])

  const shouldHide = isAppReady && minTimePassed

  useEffect(() => {
    if (shouldHide && isFirstVisit) {
      sessionStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [shouldHide, isFirstVisit])

  return (
    <>
      {isFirstVisit && <LoadingScreen isReady={shouldHide} />}
      <App />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootLayout />
  </StrictMode>
)