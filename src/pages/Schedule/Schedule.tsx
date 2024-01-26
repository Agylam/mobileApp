import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";
import {useEffect, useMemo} from "react";
import {useGetClassRanges} from "../../hooks/useGetClassRanges.ts";
import {useNavigate} from "react-router";
import {useUserInfo} from "../../hooks/useUserInfo.ts";
import useLocalStorage from "use-local-storage";
import {useGetSchedule} from "../../hooks/useGetSchedule.ts";

export const Schedule = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo();
    if (userInfo === null) {
        navigate("/");
    }

    const [accessToken] = useLocalStorage("accessToken", "");
    const classRanges = useGetClassRanges(accessToken);

    const [selectedClassRange, setSelectedClassRange] = useLocalStorage<string>("selectedClassRange", "");
    useEffect(() => {
        if (selectedClassRange === "" && classRanges.data !== undefined && classRanges.data.length > 0) {
            setSelectedClassRange(classRanges.data[0].uuid);
        }
    }, [classRanges.data]);

    const dayOfWeek = 1;
    const iHours = 12,
        iMinutes = 30,
        offset = 300;
    const nowTimestamp = iHours * 60 + iMinutes;
    console.log("nowTimestamp", nowTimestamp)
    const schedule = useGetSchedule(selectedClassRange || "", dayOfWeek, accessToken);

    const schedule_timestamp = useMemo(() => {
        if (schedule.data === undefined || schedule.isLoading === true || schedule.error !== undefined) {
            return null;
        }
        return schedule.data.map(day => {
            return {
                ...day,
                start_timestamp: day.start_hour * 60 + day.start_minute + offset,
                end_timestamp: day.end_hour * 60 + day.end_minute + offset
            }
        }).sort((a, b) => a.start_timestamp - b.start_timestamp)
    }, [schedule.data, schedule.error, schedule.isLoading]);
    console.log("schedule_timestamp", schedule_timestamp);

    const index_lesson = useMemo(() => {
        if (schedule_timestamp === null) return null;
        return schedule_timestamp.findIndex((lesson, index) => {
            if (index === schedule_timestamp.length - 1) return true;
            return lesson.start_timestamp < nowTimestamp && schedule_timestamp[index + 1].start_timestamp > nowTimestamp;
        })
    }, [schedule_timestamp, nowTimestamp]);
    console.log("index_lesson", index_lesson)

    // const isLessonEnded = useMemo(() => {
    //     if(schedule_timestamp === null || index_lesson )
    //     return notSchedule > schedule_timestamp[index_lesson];
    // },[schedule_timestamp, nowTimestamp, index_lesson]);

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
                    classRanges={classRanges.data || []}
                />
            </div>
        </div>
    );
};