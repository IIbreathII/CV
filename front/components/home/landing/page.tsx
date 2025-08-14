"use client"

import style from "./styles/landing.module.css"

export default function LandingBlock() {
    return (
        <div className={style.landing_wrapper}>
            <div className={style.landing_block}>
                <h1 className={style.title}>
                    I help travelers start their
                    <span>
                    own journey into 
                    </span>
                    startups and business
                </h1>
            </div>
            <img 
                src="/landing/landing_back.png" 
                alt="landing background"
                className={style.landing_background_image}
            />
        </div>
    );
}