import styles from './Projects.module.css'
import ProjectCard from './components/ProjectCard'

const projectsData = [
  {
    id: 1,
    title: "Teams Schedule Helper",
    description: "An open source platform for managing teams and scheduling meetings directly integrated with Microsoft Teams.",
    gifUrl: "./assets/project_preview/schedule.png",
    gifLink: "https://github.com/orgs/Horizon-Office/repositories",
    technologies: [
      { name: "Azure", icon: "./assets/tech_icons/Microsoft_Azure.png" },
      { name: "Microsoft graph", icon: "./assets/tech_icons/Microsoft_graph.png" },
      { name: "Nest.js", icon: "./assets/tech_icons/nest.png" },
      { name: "Next.js", icon: "./assets/tech_icons/white/next.png" },
      { name: "TypeScript", icon: "./assets/tech_icons/typescript.png" },
      { name: "Redux", icon: null },
      { name: "Redis", icon: null },
      { name: "Type ORM", icon: null },
      { name: "PostgreSQL", icon: "./assets/tech_icons/white/postgrees.png" }
    ],
  },
  {
    id: 2,
    title: "Shveina rota",
    description: "A volunteer platform supporting the Ukrainian military by coordinating the production and delivery of handmade clothing and gear.",
    gifUrl: "./assets/project_preview/Shveya.png",
    gifLink: "https://shveinarota.org/en",
    technologies: [
      { name: "Next.js", icon: "./assets/tech_icons/white/next.png" },
      { name: "Nest.js", icon: "./assets/tech_icons/nest.png" },
      { name: "MySQL", icon: "./assets/tech_icons/white/mySQL.png" },
      { name: "Type ORM", icon: null },
      { name: "TypeScript", icon: null }
    ]
  }
]

function Projects() {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Recent Projects</h2>
        <div className={styles.projectsList}>
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              gifUrl={project.gifUrl}
              projectLink={project.gifLink}
              technologies={project.technologies}
              socialLinks={project.socialLinks}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects