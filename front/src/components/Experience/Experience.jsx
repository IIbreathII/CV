import styles from './Experience.module.css'

function Experience() {
  return (
    <section className={styles.experience_wrapper} id="experience">
      <div className={styles.experience}>
        <img
          src="./assets/image/bunny.png"
          alt="Experience cover"
          className={styles.coverImage}
        />
        <div className={styles.content_wrapper}>
          <div className={styles.job}>
            <img
              src="./assets/image/cv_photo.png"
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.jobText}>
              <p className={styles.jobTitle}>Full stack developer</p>
              <p className={styles.jobStack}>node.js core stack</p>
            </div>
          </div>
          <div className={styles.textGroup}>
            <h2 className={styles.heading}>My Experience</h2>
            <p className={styles.description}>
              Over the years I've built scalable <span>full-stack applications</span> using{' '}
              <span>Node.js</span>, <span>React</span>, and modern cloud infrastructure.
              I focus on clean architecture, <span>performance</span>, and shipping products
              that users actually enjoy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
