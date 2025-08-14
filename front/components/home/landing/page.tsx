"use client"

import style from "./styles/landing.module.css"

export default function LandingBlock() {
    return (
        <div className={style.landing_wrapper}>
            <div className={style.landing_background}>
                <h1 className={style.title}>
                    I help travelers start their
                    <span>
                    own journey into 
                    </span>
                    startups and business
                </h1>
            </div>
        </div>
    );
}