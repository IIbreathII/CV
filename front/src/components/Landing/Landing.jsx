import styles from './Landing.module.css'
import AnimatedTitle from './compotent/AnimatedTitle'
import { motion } from 'framer-motion'

const project_tech_icons = [
  { name: 'Azure', icon: '/assets/tech_icons/Microsoft_Azure.png' },
  { name: 'Next', icon: '/assets/tech_icons/next.png' },
  { name: 'Microsoft Graph', icon: '/assets/tech_icons/Microsoft_graph.png' },
  { name: 'Nest', icon: '/assets/tech_icons/nest.png' },
  { name: 'Tailwind', icon: '/assets/tech_icons/tailwind.png' },
  { name: 'Typescript', icon: '/assets/tech_icons/typescript.png' },
  { name: 'Postgresql', icon: '/assets/tech_icons/postgresql.png' }, // исправил путь (был ./)
  { name: 'Redux', icon: null },
  { name: 'Redis', icon: null },
]

const social_icons = [
  { name: 'GitHub', icon: '/assets/social_icons/github.png', link: 'https://github.com/IIbreathII' },
  { name: 'LinkedIn', icon: '/assets/social_icons/linkedin.png', link: 'https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D0%B5%D0%BC-%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BA%D0%BE%D0%B2-92a300360/' },
  { name: 'Discord', icon: '/assets/social_icons/discord.png', link: 'https://discord.com/users/1471826882096926720' },
  { name: 'Telegram', icon: '/assets/social_icons/telegram.png', link: 'https://t.me/Temastarichok' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
}

// ✅ Исправлено: scale: 0.5 → scale: 1 (был баг — блоки рендерились в полразмера)
const liftHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -3, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
}

const staggerChild = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function Landing() {
  const scrollToSection = (id) => {
    const target = document.querySelector(id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.landing_wrapper} id="landing">
      <div className={styles.landing}>

        <motion.div
          className={styles.title_block}
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
        >
          <AnimatedTitle />
        </motion.div>

        <motion.div
          className={styles.cv_block}
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }}
          onClick={() => window.open('/documents/CV_Artem_Starikov.docx', '_blank', 'noopener,noreferrer')}
          style={{ cursor: 'pointer' }}
        >
          <h2>My CV</h2>
        </motion.div>

        <motion.div
          className={styles.projects_block}
          variants={{ ...fadeUp, ...liftHover }}
          custom={0.3}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => scrollToSection('#projects')}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.project_header}>
            <h2>Recent Projects</h2>
            <div className={styles.transition_icon} />
          </div>

          <div className={styles.project_cards_body}>
            <div className={styles.project_card_giff} />
            <h2 className={styles.tech_stack_title}>Tech stack</h2>
            <motion.div
              className={styles.project_tech_icons}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {project_tech_icons.map((tech) => (
                <motion.div
                  key={tech.name}
                  className={styles.tech_card}
                  variants={staggerChild}
                >
                  {tech.icon && (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={styles.expirience_block}
          variants={{ ...fadeUp, ...liftHover }}
          custom={0.35}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => scrollToSection('#experience')}
          style={{ cursor: 'pointer' }}
        >
          <h2>Experience</h2>
          <p>
            <span>Artem Starikov</span> is a passionate <span>Full Stack Developer</span> with <span>1.5 years </span>
            of experience building open source projects.
            <span> Based in Ukraine, </span>
            crafting clean <span>Frontend</span> interfaces and reliable <span>Backend</span> solutions.
          </p>
        </motion.div>

        <motion.div
          className={styles.contact_block}
          variants={{ ...fadeUp, ...liftHover }}
          custom={0.4}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => scrollToSection('#contact')}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.contact_header}>
            <p>Let's work together,<br />Just click!</p>
            <div className={styles.transition_icon} />
          </div>
          <h2>Contact</h2>
        </motion.div>

        <motion.div
          className={styles.social_block}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {social_icons.map((icon) => (
            <motion.div
              key={icon.name}
              className={styles.social_icon}
              whileHover={{ scale: 1.15, y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={icon.icon}
                alt={icon.name}
                width={32}
                height={32}
                fetchPriority="high"
                decoding="async"
                onClick={() => window.open(icon.link, '_blank', 'noopener,noreferrer')}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Landing