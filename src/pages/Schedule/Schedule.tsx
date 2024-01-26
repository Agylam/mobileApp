import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";
import {useLayoutEffect, useMemo} from "react";
import {useGetClassRanges} from "../../hooks/useGetClassRanges.ts";
import {useNavigate} from "react-router";
import {useUserInfo} from "../../hooks/useUserInfo.ts";
import useLocalStorage from "use-local-storage";
import {useGetSchedule} from "../../hooks/useGetSchedule.ts";
import {worder} from "../../utils/worder.ts";

export const Schedule = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo();
    if (userInfo === null) {
        navigate("/");
    }

    const [accessToken] = useLocalStorage("accessToken", "");
    const classRanges = useGetClassRanges(accessToken);

    const [selectedClassRange, setSelectedClassRange] = useLocalStorage<string>("selectedClassRange", "");
    useLayoutEffect(() => {
        console.log("A", selectedClassRange === "", classRanges.data !== undefined, (classRanges?.data?.length || 0) > 0)
        if (selectedClassRange === "" && classRanges.data !== undefined && classRanges.data.length > 0) {
            setSelectedClassRange(classRanges.data[0].uuid);
        }
    }, [classRanges.data, selectedClassRange]);

    let dayOfWeek = 1,
        iHours = 21,
        iMinutes = 58,
        iSeconds = 23,
        offset = 300;
    const nowTimestamp = iHours * 60 + iMinutes;
    console.log("nowTimestamp", nowTimestamp)

    // Костыль
    const schedule = useGetSchedule(selectedClassRange || (classRanges.data ? classRanges.data[0].uuid : ""), dayOfWeek, accessToken);

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
    }, [schedule.data, schedule.error, schedule.isLoading, offset]);
    console.log("schedule_timestamp", schedule_timestamp);

    const index_lesson = useMemo(() => {
        if (schedule_timestamp === null) return null;
        return schedule_timestamp.findIndex((lesson, index) => {
            if (index === schedule_timestamp.length - 1) return true;
            return lesson.start_timestamp <= nowTimestamp && schedule_timestamp[index + 1].start_timestamp > nowTimestamp;
        })
    }, [schedule_timestamp]);
    console.log("index_lesson", index_lesson)

    const isLessonEnded = useMemo(() => {
        if (schedule_timestamp === null || index_lesson === null) return null;
        return nowTimestamp >= schedule_timestamp[index_lesson].end_timestamp;
    }, [schedule_timestamp, index_lesson]);
    console.log("isLessonEnded", isLessonEnded)


    let firstTimerTime, secondTimerTime, firstTimerNaming, secondTimerNaming;
    if (!schedule_timestamp || index_lesson === -1 || index_lesson === null) {
        const firstTimerTime = null
    } else {
        firstTimerTime = schedule_timestamp[index_lesson].end_timestamp - nowTimestamp;
        firstTimerNaming = ['минута', 'минуты', 'минут'];
        if (firstTimerTime <= 1) {
            firstTimerTime = 60 - iSeconds
            firstTimerNaming = ['секунда', 'секунды', 'секунд'];
        }

        if (index_lesson + 1 !== schedule_timestamp.length) {
            secondTimerTime = schedule_timestamp[index_lesson + 1].start_timestamp - nowTimestamp;
            secondTimerNaming = ['минута', 'минуты', 'минут'];
            if (secondTimerTime <= 1) {
                secondTimerTime = 60 - iSeconds
                secondTimerNaming = ['секунда', 'секунды', 'секунд'];
            }
        }

    }

    return (
        <div className="schedule_page">
            <div className="schedule_top">
                <Header/>
                {
                    (schedule_timestamp && index_lesson !== -1 && index_lesson !== null) && <>
                        {(firstTimerNaming && firstTimerTime && index_lesson !== 0) && <Timer
                            estimated_time={isLessonEnded ? (index_lesson + 1 === schedule_timestamp.length ? "Домой" : "Перемена") : firstTimerTime + " " + worder(firstTimerTime, firstTimerNaming)}
                            title={isLessonEnded ? index_lesson + "й урок завершен" : "До конца урока"}
                        />}
                        {(secondTimerNaming && secondTimerTime) && <Timer
                            estimated_time={secondTimerTime + " " + worder(secondTimerTime, secondTimerNaming)}
                            title={index_lesson !== 0 ? "До следующего урока" : "До начала уроков"}
                            isDanger={true}
                        />}
                    </>
                }
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