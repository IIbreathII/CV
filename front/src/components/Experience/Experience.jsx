import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Experience.module.css'

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

// Вспомогательный компонент для удобного выделения цветом
const Accent = ({ children }) => (
  <span style={{ color: 'var(--color-accent, #FB3640)' }}>{children}</span>
)

function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })

  return (
    <section className={styles.experience_wrapper} id="experience" ref={sectionRef}>
      <div className={styles.experience}>
        <img
          src="./assets/image/bunny.png"
          alt="Experience cover"
          className={styles.coverImage}
        />
        <div className={styles.content_wrapper}>
          <div className={styles.contentInner}>

            <motion.div
              className={styles.job}
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <div className={styles.avatarWrapper} />
              <div className={styles.jobText}>
                <p className={styles.jobTitle}>Full stack developer</p>
                <p className={styles.jobStack}>node.js core stack</p>
              </div>
            </motion.div>

            <motion.div
              className={styles.textGroup}
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            >
              <h2 className={styles.heading}>My Experience</h2>
              {/* Replaced <p> with <div> to semantically correctly nest the list */}
              <div className={styles.description}>
                <p>
                  I am a <Accent>Full Stack Developer</Accent> with 1.5 years of experience.
                  My core stack is based on the <Accent>Node.js</Accent> ecosystem (<Accent>React / Next.js</Accent> on the frontend and <Accent>NestJS / Express</Accent> on the backend).
                </p>
                <br />
                <p>
                  In my projects, I have been responsible for the full development lifecycle, handling everything from UI design to API architecture, complex integrations, and deployment.
                </p>
                <br />
                <p><strong>Key responsibilities and skills:</strong></p>
                <ul className={styles.skillsList}>
                  <li>Creating UIs and developing high-performance client interfaces using <Accent>React</Accent> and <Accent>Next.js</Accent></li>
                  <li>Managing complex application states (<Accent>Redux</Accent>)</li>
                  <li>Designing server architecture and building REST APIs (CRUD, pagination) with <Accent>NestJS</Accent> and <Accent>Express</Accent></li>
                  <li>Working with relational databases (<Accent>PostgreSQL, MySQL</Accent>) and caching data using <Accent>Redis</Accent> on the backend</li>
                  <li>Integrating external services (in-depth experience with <Accent>Microsoft Graph API</Accent>)</li>
                  <li>Optimizing heavy asynchronous processes and bulk operations</li>
                  <li>Deep practical experience developing with <Accent>TypeScript</Accent></li>
                  <li>Version control and collaboration: <Accent>Git</Accent> (branching, code review), <Accent>Jira</Accent></li>
                  <li>Containerization (<Accent>Docker</Accent>), deployment, and application maintenance</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience