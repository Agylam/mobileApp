import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";

export const Schedule = () => {
    return (
        <div className="schedule_page">
            <div className="schedule_top">
                <Header/>
                <Timer/>
                <Timer/>
            </div>
            <div className="schedule_bottom">
                <ClassRanges/>
            </div>
        </div>
    );
};