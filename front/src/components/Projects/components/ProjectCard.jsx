import { motion } from 'framer-motion'
import styles from './styles/ProjectCard.module.css'

const fromLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
}

const fromRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
}

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

function ProjectCard({ title, description, gifUrl, technologies, socialLinks, projectLink }) {
    return (
        <motion.article
            className={styles.projectCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div
                className={styles.infoBlock}
                variants={container}
            >
                <motion.h3
                    className={styles.title}
                    variants={fromLeft}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {title}
                </motion.h3>

                <motion.p
                    className={styles.description}
                    variants={fromLeft}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {description}
                </motion.p>

                <motion.ul
                    className={styles.techList}
                    variants={container}
                >
                    {technologies.map((tech, index) => (
                        <motion.li
                            key={index}
                            className={styles.techItem}
                            variants={fromLeft}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            {tech.icon && (
                                <img
                                    src={tech.icon}
                                    alt={`${tech.name} icon`}
                                    className={styles.techIcon}
                                />
                            )}
                            <span className={styles.techName}>{tech.name}</span>
                        </motion.li>
                    ))}
                </motion.ul>

                {socialLinks && socialLinks.length > 0 && (
                    <motion.div
                        className={styles.socialLinks}
                        variants={fromLeft}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
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
                    </motion.div>
                )}
            </motion.div>

            <motion.a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
                className={styles.mediaBlock}
                variants={fromRight}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.02 }}
            >
                {gifUrl ? (
                    <img src={gifUrl} alt={`${title} preview`} className={styles.gifImage} />
                ) : (
                    <div className={styles.placeholder}></div>
                )}
            </motion.a>

        </motion.article >
    )
}

export default ProjectCard