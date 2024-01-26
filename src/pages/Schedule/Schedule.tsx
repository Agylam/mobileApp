import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";
import {useState} from "react";
import {ApiClassRange} from "../../interfaces/api/ClassRange.ts";

export const Schedule = () => {
    const [classRanges, setClassRanges] = useState<ApiClassRange[]>([
        {
            "uuid": "cdf6ef82-a0f7-42c6-8f0c-2b84c166f05d",
            "name": "9-11",
            "start_sound": {
                "uuid": "9720692c-e924-4d44-85ec-cd151e686cad"
            },
            "end_sound": {
                "uuid": "f6ac15f4-e524-47c6-8848-6eb33c6fd70e"
            }
        },
        {
            "uuid": "d19e24a7-ad83-4b52-8b94-2507dac2eba9",
            "name": "1-4",
            "start_sound": {
                "uuid": "f6ac15f4-e524-47c6-8848-6eb33c6fd70e"
            },
            "end_sound": {
                "uuid": "9720692c-e924-4d44-85ec-cd151e686cad"
            }
        }
    ])
    const [selectedClassRange, setSelectedClassRange] = useState(classRanges[0].uuid || "");

    return (
        <div className="schedule_page">
            <div className="schedule_top">
                <Header/>
                <Timer estimated_time="5 минут" title="До конца урока"/>
                <Timer estimated_time="20 минут" title="До следующего урока" isDanger={true}/>
            </div>
            <div className="schedule_bottom">
                <ClassRanges
                    selectedClassRange={selectedClassRange}
                    setSelectedClassRange={setSelectedClassRange}
                    classRanges={classRanges}
                />
            </div>
        </div>
    );
};