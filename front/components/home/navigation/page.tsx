"use client"
import style from "./styles/navigation.module.css"

export default function NavigationBlock() {
    return (
        <div className={style.navigation_wrapper}>
            <div className={style.navigation_block}>
                <div className={style.top_area_left} aria-hidden="true"></div>
                <div className={style.top_area_right} aria-hidden="true"></div>
                    <div className={style.navigation_content}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </div>
                <div className={style.bot_area_left} aria-hidden="true"></div>
                <div className={style.bot_area_right} aria-hidden="true"></div>
            </div>
        </div>
    );
} 