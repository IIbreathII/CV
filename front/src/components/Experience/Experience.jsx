import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Experience.module.css'

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

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
              <p className={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsu
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience