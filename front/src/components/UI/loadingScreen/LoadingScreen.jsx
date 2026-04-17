import { useEffect, useRef } from 'react'
import styles from './styles/LoadingScreen.module.css'

function LoadingScreen({ isReady }) {
    const wrapperRef = useRef(null)

    useEffect(() => {
        // Если еще не готовы — ничего не делаем
        if (!isReady || !wrapperRef.current) return

        const el = wrapperRef.current

        // Как только isReady стал true, запускаем анимацию скрытия
        el.classList.add(styles.hidden)

        // Ждем конца анимации и полностью убираем из DOM, 
        // чтобы не перекрывать клики (даже с прозрачностью/трансформом)
        const handleTransitionEnd = () => {
            el.style.display = 'none'
        }

        el.addEventListener('transitionend', handleTransitionEnd, { once: true })

        return () => {
            el.removeEventListener('transitionend', handleTransitionEnd)
        }
    }, [isReady])

    // CSS не меняем, он у тебя отличный!
    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.inner}>
                <p className={styles.text}>
                    Greetings just need a time for magic
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                    <span className={styles.dot}>.</span>
                </p>
            </div>
        </div>
    )
}

export default LoadingScreen