"use client"

import style from "./styles/landing.module.css"
import Image from 'next/image';


export default function LandingBlock() {
    return (
        <div className={style.landing_wrapper}>
            <div className={style.back_1}>
                <div className={style.landing_background}>
                    <h1 className={style.title}>
                        Lorem self Ipsum
                        <span>
                        own Lorem Ipsum
                        </span>
                        Lorem Ipsum and Lorem Ipsum
                    </h1>
                    <div role="navigation" aria-label="Навигация по разделам" className={style.navigation}>
                        <button className={style.contact_button}>
                        let’s contact
                        <a href="">let’s contact </a>
                        <Image
                            src="/images/landing/arrow.png"
                            alt="стрелка"
                            width={5}
                            height={5}
                            className={style.arrow}
                        />
                        </button>
                        <button className={style.navigation_button}>more</button>
                    </div>
                </div>           
            </div>
        </div>
    );
}