import styles from './styles/ProjectCard.module.css'

function ProjectCard({ title, description, gifUrl, technologies, socialLinks }) {
    return (
        <article className={styles.projectCard}>

            {/* Левая часть: Инфо */}
            <div className={styles.infoBlock}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                <ul className={styles.techList}>
                    {technologies.map((tech, index) => (
                        <li key={index} className={styles.techItem}>
                            {/* Рендерим картинку только если icon не null */}
                            {tech.icon && (
                                <img
                                    src={tech.icon}
                                    alt={`${tech.name} icon`}
                                    className={styles.techIcon}
                                />
                            )}
                            <span className={styles.techName}>{tech.name}</span>
                        </li>
                    ))}
                </ul>
                {socialLinks && socialLinks.length > 0 && (
                    <div className={styles.socialLinks}>
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer" /* Безопасность при открытии в новой вкладке */
                                className={styles.socialLink}
                                aria-label={`Link to project on ${link.name || 'external site'}`}
                            >
                                <img
                                    src={link.icon}
                                    alt="link icon"
                                    className={styles.socialIcon}
                                />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Правая часть: Медиа/Гифка */}
            <div className={styles.mediaBlock}>
                {gifUrl ? (
                    <img src={gifUrl} alt={`${title} preview`} className={styles.gifImage} />
                ) : (
                    <div className={styles.placeholder}></div>
                )}
            </div>

        </article>
    )
}

export default ProjectCard