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
    }, [isInView]);

    return displayed;
}

function SkillSection({ index, number, title, text, technologies, bgColor = '#E5E5E5', textColor = '#1a1a1a' }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const isTitleInView = useInView(titleRef, { once: true, amount: 1 });
    const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });

    const typedTitle = useTypewriter(title, isTitleInView);

    return (
        <section
            className={styles.skillSection}
            style={{
                '--bg-color': bgColor,
                '--section-index': index,
                backgroundColor: bgColor,
                color: textColor
            }}
        >
            <div className={styles.stickyHeader}>
                <div className={styles.container}>
                    <div className={styles.headerContent}>
                        <span className={styles.sectionNumber}>({number})</span>
                        <h2 className={styles.title} ref={titleRef}>
                            {typedTitle}
                        </h2>
                    </div>
                </div>
            </div>

            <div className={styles.contentBlock}>
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
                                    <span className={styles.techIndex}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
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