"use client";

import { useEffect, useRef, useState } from "react";
import style from "./styles/Home/home.module.css";
import transitionStyle from "../components/UI/transition/styles/PageTransition.module.css";

import LandingBlock from "@/components/home/landing/Landing_block";
import SkillsBlock from "@/components/home/Skills/page";
import ProjectsBlock from "@/components/home/Projects/Projects_block";

export default function Home() {
  const landingRef = useRef<HTMLDivElement>(null);
  const combinedRef = useRef<HTMLDivElement>(null);
  const [transitionClass, setTransitionClass] = useState("");
  const animationDuration = 1500; // совпадает с CSS анимацией

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let direction: "up" | "down" = "down";
    let hasEnteredLanding = false; // флаг для предотвращения триггера при загрузке

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      direction = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const observers: IntersectionObserver[] = [];

    if (landingRef.current) {
      const landingObserver = new IntersectionObserver(
        ([entry]) => {
          if (!hasEnteredLanding) {
            // первый вызов игнорируем
            hasEnteredLanding = true;
            return;
          }

          // если нижняя граница вышла и скролл вниз
          if (!entry.isIntersecting && direction === "down") {
            setTransitionClass(transitionStyle.triger);

            setTimeout(() => {
              combinedRef.current?.scrollIntoView({ behavior: "smooth" });
              setTransitionClass(transitionStyle["triger-reverse"]);
            }, animationDuration);
          }
        },
        {
          threshold: 0.5, // половина блока должна быть видна
          rootMargin: "0px 0px -20% 0px", // ловим момент выхода нижней границы
        }
      );
      landingObserver.observe(landingRef.current);
      observers.push(landingObserver);
    }

    // аналогично для combinedRef (верхняя граница)
    if (combinedRef.current) {
      const combinedObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && direction === "up") {
            setTransitionClass(transitionStyle.triger);

            setTimeout(() => {
              landingRef.current?.scrollIntoView({ behavior: "smooth" });
              setTransitionClass(transitionStyle["triger-reverse"]);
            }, animationDuration);
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px 0px 0px", // ловим момент выхода верхней границы
        }
      );
      combinedObserver.observe(combinedRef.current);
      observers.push(combinedObserver);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section className={style.home_wrapper}>
      {/* Анимационный слой */}
      <div className={`${transitionStyle.block_transition} ${transitionClass}`} />

      {/* Первый блок (Landing) */}
      <div id="landing" ref={landingRef} className={style.landing_wrapper}>
        <LandingBlock />
      </div>

      {/* Объединённый блок (Projects + Skills) */}
      <div ref={combinedRef}>
        <ProjectsBlock />
        <SkillsBlock />
      </div>
    </section>
  );
}