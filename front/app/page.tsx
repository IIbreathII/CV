import Image from "next/image";
import style from "../styles/Home/home.module.css"
import LandingBlock from "@/components/home/landing/page";
import SkillsBlock from "@/components/home/Skills/page";
import NavigationBlock from "@/components/home/navigation/page";
import ProjectsBlock from "@/components/home/Projects/page";

export default function Home() {
  return (
  <section className={style.home_wrapper}>  
    <LandingBlock />
    <NavigationBlock />
    <ProjectsBlock />
    <SkillsBlock />
  </section>
  );
}
