import { useRef, useState, useEffect } from 'react';
import { useInView, motion } from 'framer-motion';
import styles from './styles/skillSection.module.css';

function useTypewriter(text, isInView, speed = 50) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!isInView || done) return;
        setDisplayed('');
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [isInView, text, done]);

    return displayed;
}

function SkillSection({
    index, number, title, text, technologies, bgColor, textColor,
    stickyTop, headerRef, sectionRef
}) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });
    const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });
    const typedTitle = useTypewriter(title, isTitleInView);

    return (
        <section
            ref={sectionRef}
            className={styles.skillSection}
            style={{
                '--bg-color': bgColor,
                backgroundColor: bgColor,
                color: textColor,
                position: stickyTop !== null ? 'sticky' : 'relative',
                top: stickyTop !== null ? `${stickyTop}px` : 'auto',
                zIndex: index + 1,

                // Жестко ограничиваем высоту
                maxHeight: stickyTop !== null ? `calc(100vh - ${stickyTop}px)` : '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className={styles.stickyHeader} ref={headerRef}>
                <div className={styles.container}>
                    <div className={styles.headerContent}>
                        <span className={styles.sectionNumber}>({number})</span>
                        <h2 className={styles.title} ref={titleRef}>
                            {typedTitle}
                        </h2>
                    </div>
                </div>
            </div>

            {/* ДОБАВЛЕН класс customScroll и minHeight: 0 */}
            <div
                className={`${styles.contentBlock} ${styles.customScroll}`}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: 0
                }}
            >
                <div className={styles.container}>
                    <motion.div
                        ref={contentRef}
                        className={styles.textContent}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <p className={styles.description}>{text}</p>
                        <ul className={styles.techList}>
                            {technologies.map((tech, i) => (
                                <li key={i} className={styles.techItem}>
                                    <span className={styles.techIndex}>{String(i + 1).padStart(2, '0')}</span>
                                    <span className={styles.techName}>{tech}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default SkillSection;