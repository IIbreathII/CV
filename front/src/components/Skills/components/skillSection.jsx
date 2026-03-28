import styles from './styles/skillSection.module.css';

// Добавили проп 'index' (принимает 0, 1, 2...)
function SkillSection({ index, number, title, text, technologies, bgColor = '#E5E5E5', textColor = '#1a1a1a' }) {
    return (
        <section
            className={styles.skillSection}
            style={{
                '--bg-color': bgColor,      // Для использования в CSS модуле
                '--section-index': index,   // Критично для z-index
                backgroundColor: bgColor,
                color: textColor
            }}
        >
            {/* 1. Заголовок - теперь он липкий и занимает всю ширину viewport */}
            <div className={styles.stickyHeader}>
                <div className={styles.container}>
                    <div className={styles.headerContent}>
                        <span className={styles.sectionNumber}>({number})</span>
                        <h2 className={styles.title}>{title}</h2>
                    </div>
                </div>
            </div>

            {/* 2. Блок контента - он скроллится */}
            <div className={styles.contentBlock}>
                <div className={styles.container}>
                    <div className={styles.textContent}>
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SkillSection;