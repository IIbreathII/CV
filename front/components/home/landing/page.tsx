"use client";

import React, { useEffect, useMemo, useState } from "react";
import style from "./styles/landing.module.css";
import Image from "next/image";
import { Span } from "next/dist/trace";

type Segment = {
  text: string;
  bold?: boolean;
  newlineAfter?: boolean;
};

interface TypingBannerProps {
  segments?: Segment[];
  speed?: number; 
  pauseAfter?: number; 
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
}

const defaultSegments: Segment[] = [
  { text: "and I am ready to develop ", bold: false, newlineAfter: true },
  { text: "your idea", bold: true, newlineAfter: false },
  { text: "..//", bold: false, newlineAfter: false },
];

const TypingBanner: React.FC<TypingBannerProps> = ({
  segments = defaultSegments,
  speed = 75,
  pauseAfter = 800,
  loop = false,
  className = "",
  showCursor = true,
}) => {
  const flat = useMemo(() => {
    const res: { char: string | null; bold?: boolean }[] = [];
    for (const seg of segments) {
      for (const ch of seg.text) res.push({ char: ch, bold: seg.bold });
      if (seg.newlineAfter) res.push({ char: null });
    }
    return res;
  }, [segments]);

  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (pos >= flat.length) {
      if (!loop) return;
      const t = setTimeout(() => setPos(0), pauseAfter);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPos((p) => p + 1), speed);
    return () => clearTimeout(t);
  }, [pos, flat.length, speed, loop, pauseAfter]);

  useEffect(() => {
    setPos(0);
  }, [segments]);

  const rendered = flat.slice(0, pos);


  const isFinished = pos >= flat.length;
  const shouldShowCursor = Boolean(showCursor && isFinished);


  const wrapperClass = `${style.typing_inline} ${className}`.trim();

  return (
    <span className={wrapperClass} role="text" aria-live="polite">
      {rendered.map((it, i) => {
        if (it.char === null) return <br key={`br-${i}`} />;
        if (it.bold)
          return (
            <strong key={`c-${i}`} className={style.typed_bold}>
              {it.char}
            </strong>
          );
        return (
          <span key={`c-${i}`} className={style.typed_char}>
            {it.char}
          </span>
        );
      })}
      {shouldShowCursor && (
        <span aria-hidden className={style.cursorContainer}>
          <span className={style.cursor}>|</span>
        </span>
      )}
    </span>
  );
};

export default function LandingBlock() {
  return (
    <div className={style.landing_wrapper}>
      <div className={style.left_side}>
            <h1 className={style.title}>
            Hi! i’m a full stack <strong>web developer</strong>
            <br />
            <TypingBanner
                speed={70}
                segments={[
                { text: "and I am ready to develop ", bold: false, newlineAfter: true },
                { text: "your idea", bold: true, newlineAfter: false },
                { text: "..", bold: false, newlineAfter: false },
                { text: "/", bold: false, newlineAfter: false }
                ]}
                className={style.typing_inline}
                showCursor={true}
            />
            </h1>
        <div role="navigation" aria-label="Навигация по разделам" className={style.navigation}>
          <button className={style.contact_button}>
            <span>let’s contact</span>
            <Image src="/images/landing/arrow.png" alt="стрелка" width={16} height={16} className={style.arrow} />
          </button>
          <button className={style.navigation_button}>my skills</button>
        </div>
      </div>

      <div className={style.character_container}>
        <div className={style.character_animation}>
          <svg
            viewBox="0 0 99 100"
            className={style.gradient_ring}
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3eff88ff" />
                <stop offset="100%" stopColor="rgba(122, 122, 253, 1)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="transparent" stroke="url(#grad)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className={style.character_image} />
        </div>
      </div>
    </div>
  );
}
