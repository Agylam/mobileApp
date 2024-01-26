import "./Timer.scss"
import {PropsWithoutRef} from "react";

interface TimerProps {
    title: string;
    estimated_time: string;
    isDanger?: boolean;
}

export const Timer = (props: PropsWithoutRef<TimerProps>) => {
    let btnClass = "timer";
    if (props.isDanger) {
        btnClass += " timer_danger";
    }
    return (
        <div className={btnClass}>
            <p className="timer_name">{props.title}</p>
            <p className="estimated_time">{props.estimated_time}</p>
        </div>
    );
};