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
          <div className={styles.contentInner}>
            <div className={styles.job}>
              <div className={styles.avatarWrapper} />
              <div className={styles.jobText}>
                <p className={styles.jobTitle}>Full stack developer</p>
                <p className={styles.jobStack}>node.js core stack</p>
              </div>
            </div>
            <div className={styles.textGroup}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
