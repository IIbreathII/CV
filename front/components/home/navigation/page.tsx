"use client"
import Image from "next/image";
import style from "./styles/navigation.module.css"
import React, { useEffect, useRef } from "react";

export default function NavigationBlock() {
    
    const textRef = useRef<HTMLParagraphElement>(null); // <p>, а не h1

    useEffect(() => {
        if (textRef.current) {
        const text = textRef.current.innerText;
        textRef.current.innerHTML = text
            .split("")
            .map(
            (char, i) =>
                `<span style="animation-delay:${i * 0.1}s">${char}</span>`
            )
            .join("");
        }
    }, []);

    return (
        <div className={style.navigation_wrapper}>
            <div className={style.navigation_block}>
                <div className={style.navigation_content}>
                    <div className={style.navigation_about} >
                        <div className={style.about_content}>
                            <div className={style.about_top}>
                                <div className={style.developer_img} aria-hidden="true"> </div>
                                <h2>Hi! I'm ready to cooperate with you</h2>
                            </div>
                            <div className={style.about_bot}>
                                <span>
                                    I specialize in building full-stack web applications that are fast, reliable, 
                                    and user-friendly. With a 
                                    strong foundation in both front-end and back-end technologies, 
                                    I help turn ideas into real products — whether
                                    it's for a business, a startup, or a product team.
                                    I'm always open to collaborating on new initiatives, especially 
                                    startups and ambitious tech projects. Let’s build something great together.
                                </span>
                            </div>
                        </div>
                        <button className={style.button_about}>
                            <p ref={textRef}>Click_for_more</p>
                        </button>
                    </div>

                    <div className={style.navigation_projects}>

                    </div>

                    <div className={style.navigation_skills}>

                    </div>

                    <div className={style.navigation_contact}>

                    </div>

                    <div className={style.navigation_blog}>

                    </div>
                </div>

            </div>
        </div>
    );
} 