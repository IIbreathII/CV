import styles from './Landing.module.css'
import { useState } from 'react'

const project_title = "Schedule Helper"
const project_tech_icons = [
  { name: 'Azure', icon: './assets/tech_icons/Microsoft_Azure.png' },
  { name: 'Next', icon: './assets/tech_icons/next.png' },
  { name: 'Microsoft Graph', icon: './assets/tech_icons/Microsoft_graph.png' },
  { name: 'Nest', icon: './assets/tech_icons/nest.png' },
  { name: 'Tailwind', icon: './assets/tech_icons/tailwind.png' },
  { name: 'Typescript', icon: './assets/tech_icons/typescript.png' },
  { name: 'Redux', icon: null },
  { name: 'Postgresql', icon: './assets/tech_icons/postgresql.png' },
  { name: 'Type ORM', icon: null },
  { name: 'Redis', icon: null },
  { name: 'mySQL', icon: './assets/tech_icons/mySQL.png' }
]

const social_icons = [
  { name: 'GitHub', icon: './assets/social_icons/github.png', link: 'https://github.com/IIbreathII?tab=overview&from=2026-03-01&to=2026-03-23' },
  { name: 'LinkedIn', icon: './assets/social_icons/linkedin.png' },
  { name: 'Discord', icon: './assets/social_icons/discord.png' },
]


function Landing() {

  return (
    <section className={styles.landing} id="landing">
      <div className={styles.title_cv_group}>
        <div className={styles.title_block}>
          <h2> <span> Full Stack Developer </span> Redefining
            <span className={styles.end_to_end}> web with End-to-End Solutions</span>
          </h2>
        </div>
        <div className={styles.cv_block}>
          <h2>Download CV</h2>
        </div>
      </div>

      <div className={styles.expirience_projects_group}>
        <div className={styles.expirience_block}>
          <h2>Experience</h2>
          <p>
            <span>Artem Starikov</span> is a passionate <span>Full Stack Developer</span> with <span>1.5 years</span>
            of experience building open source projects.
            <span>Based in Ukraine,</span>
            crafting clean <span>Frontend</span> interfaces and reliable <span>Backend</span> solutions.
          </p>
        </div>
        <div className={styles.projects_block}>
          <div className={styles.project_header}>
            <h2>Recent Projects</h2>
            <div className={styles.transition_icon}></div>
          </div>
          <div className={styles.project_cards_body}>
            <div className={styles.project_card_giff}>
            </div>
            <h2>{project_title}</h2>
            <div className={styles.project_tech_icons}>
              {project_tech_icons.map((tech) => (
                <div key={tech.name} className={styles.tech_card}>
                  {tech.icon && <img src={tech.icon} alt={tech.name} />}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.social_contact_group}>
        <div className={styles.contact_block}>
          <div className={styles.contact_header}>
            <p>Let's work together, <br />Just click!</p>
            <div className={styles.transition_icon}></div>
          </div>
          <h2>Contact</h2>
        </div>
        <div className={styles.social_block}>
          {social_icons.map((icon) => (
            <div key={icon.name} className={styles.social_icon}>
              <img src={icon.icon} alt={icon.name} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Landing