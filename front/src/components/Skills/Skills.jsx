import { useRef, useState, useEffect } from 'react';
import styles from './Skills.module.css';
import SkillSection from './components/skillSection';

const skillsData = [
  // ... твой массив данных без изменений
  {
    id: 1, number: "01", title: "Frontend",
    text: "Building responsive and interactive user interfaces using modern web technologies.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    bgColor: "var(--color-foreground)", textColor: "var(--color-font)"
  },
  {
    id: 2, number: "02", title: "Backend",
    text: "Creating robust and scalable server-side applications and APIs.",
    technologies: ["Node.js", "NestJS", "Express", "PostgreSQL", "Redis", "MySQL"],
    bgColor: "var(--color-accent)", textColor: "var(--color-background)"
  },
  {
    id: 3, number: "03", title: "Cloud & DevOps",
    text: "Deploying and managing applications in the cloud with automated workflows.",
    technologies: ["Azure", "Docker", "CI/CD", "Git", "Nginx"],
    bgColor: "var(--color-accent-white)", textColor: "var(--color-foreground)"
  }
];

function Skills() {
  const headerRefs = useRef([]);
  const [headerHeights, setHeaderHeights] = useState([]);

  useEffect(() => {
    const measure = () => {
      const heights = headerRefs.current.map(el => el?.offsetHeight ?? 0);
      setHeaderHeights(heights);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Идеальный отступ — это сумма высот всех предыдущих заголовков
  const getStickyTop = (index) =>
    headerHeights.slice(0, index).reduce((acc, h) => acc + h, 0);

  return (
    <section className={styles.skills} id="skills">
      {skillsData.map((skill, index) => (
        <SkillSection
          key={skill.id}
          index={index}
          number={skill.number}
          title={skill.title}
          text={skill.text}
          technologies={skill.technologies}
          bgColor={skill.bgColor}
          textColor={skill.textColor}
          stickyTop={headerHeights.length ? getStickyTop(index) : null}
          headerRef={el => (headerRefs.current[index] = el)}
        />
      ))}
    </section>
  );
}

export default Skills;