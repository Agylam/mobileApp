import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";

export const Schedule = () => {
    return (
        <div className="schedule_page">
            <div className="schedule_top">
                <Header/>
                <Timer estimated_time="5 минут" title="До конца урока"/>
                <Timer estimated_time="20 минут" title="До следующего урока" isDanger={true}/>
            </div>
            <div className="schedule_bottom">
                <ClassRanges/>
            </div>
        </div>
    );
};