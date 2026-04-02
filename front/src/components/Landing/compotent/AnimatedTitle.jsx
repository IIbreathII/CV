import { useState, useEffect } from 'react'
import styles from '../Landing.module.css'

const SEGMENT_SETS = [
    [
        { text: 'Full Stack Developer', style: 'highlight' },
        { text: '\n', style: 'break' },
        { text: 'Redefining', style: 'plain' },
        { text: ' web with End-to-End Solutions', style: 'end_to_end' },
    ],
    [
        { text: "Let's work", style: 'plain' },
        { text: '\n', style: 'break' },
        { text: ' together', style: 'end_to_end' },
        { text: '', style: 'plain' }, // выравниваем длину массива
    ],
]

function useTypingCycle(segmentSets, typeSpeed = 55, deleteSpeed = 25, pauseAfterType = 5000, pauseAfterDelete = 300) {
    const [setIndex, setSetIndex] = useState(0)
    const [charCount, setCharCount] = useState(0)
    const [phase, setPhase] = useState('typing')

    const segments = segmentSets[setIndex]
    const fullLength = segments.map(s => s.text).join('').length

    useEffect(() => {
        let timeout

        if (phase === 'typing') {
            if (charCount < fullLength) {
                timeout = setTimeout(() => setCharCount(c => c + 1), typeSpeed)
            } else {
                timeout = setTimeout(() => setPhase('deleting'), pauseAfterType)
            }
        }

        if (phase === 'deleting') {
            if (charCount > 0) {
                timeout = setTimeout(() => setCharCount(c => c - 1), deleteSpeed)
            } else {
                timeout = setTimeout(() => {
                    setSetIndex(i => (i + 1) % segmentSets.length)
                    setPhase('typing')
                }, pauseAfterDelete)
            }
        }

        return () => clearTimeout(timeout)
    }, [charCount, phase, fullLength])

    let remaining = charCount
    const displayed = segments.map(seg => {
        if (seg.style === 'break') return { ...seg, visible: remaining > 0 ? '\n' : '' }
        const slice = seg.text.slice(0, remaining)
        remaining = Math.max(0, remaining - seg.text.length)
        return { ...seg, visible: slice }
    })

    const done = phase === 'typing' && charCount >= fullLength
    const currentSegIdx = displayed.findIndex(s => s.visible.length < s.text.length && s.style !== 'break')

    return { displayed, done, currentSegIdx }
}

function Cursor() {
    return <span className={styles.cursor}>|</span>
}

function AnimatedTitle() {
    const { displayed, done, currentSegIdx } = useTypingCycle(SEGMENT_SETS)

    return (
        // Контейнер Grid заставляет дочерние элементы накладываться друг на друга
        <div style={{ display: 'grid' }}>

            {/* 1. ЭЛЕМЕНТ-ПРИЗРАК (Ghost Element) */}
            {/* Он рендерит самый длинный блок текста (SEGMENT_SETS[0]). */}
            {/* visibility: 'hidden' скрывает его визуально, но оставляет его физические размеры */}
            <h2 style={{ visibility: 'hidden', gridArea: '1 / 1', margin: 0, pointerEvents: 'none' }}>
                <span>{SEGMENT_SETS[0][0].text}</span>
                <br />
                <span>{SEGMENT_SETS[0][2].text}</span>
                <span className={styles.end_to_end}>{SEGMENT_SETS[0][3].text}</span>
            </h2>

            {/* 2. АНИМИРОВАННЫЙ БЛОК */}
            {/* gridArea: '1 / 1' помещает его ровно поверх призрака */}
            <h2 style={{ gridArea: '1 / 1', margin: 0 }}>
                <span>
                    {displayed[0].visible}
                    {!done && currentSegIdx === 0 && <Cursor />}
                </span>

                {displayed[1].visible && <br />}

                {displayed[2].visible && (
                    <span className={displayed[2].style === 'end_to_end' ? styles.end_to_end : undefined}>
                        {displayed[2].visible}
                        {!done && currentSegIdx === 2 && <Cursor />}
                    </span>
                )}

                {displayed[3].visible && (
                    <span className={displayed[3].style === 'end_to_end' ? styles.end_to_end : undefined}>
                        {displayed[3].visible}
                        {!done && currentSegIdx === 3 && <Cursor />}
                    </span>
                )}

                {done && <Cursor />}
            </h2>
        </div>
    )
}

export default AnimatedTitle