import "./Schedule.scss"
import {Header} from "../../components/Header/Header.tsx";
import {Timer} from "../../components/Timer/Timer.tsx";
import {ClassRanges} from "../../components/ClassRanges/ClassRanges.tsx";
import {useEffect, useMemo, useState} from "react";
import {useGetClassRanges} from "../../hooks/useGetClassRanges.ts";
import {useNavigate} from "react-router";
import {useUserInfo} from "../../hooks/useUserInfo.ts";
import useLocalStorage from "use-local-storage";

export const Schedule = () => {
    const navigate = useNavigate();
    const userInfo = useUserInfo();
    if (userInfo === null) {
        navigate("/");
    }

    const [accessToken] = useLocalStorage("accessToken", "");
    const classRanges = useGetClassRanges(accessToken);

    const [selectedClassRange, setSelectedClassRange] = useState<string>("");
    useEffect(() => {
        if (selectedClassRange === "" && classRanges.data !== undefined && classRanges.data.length > 0) {
            setSelectedClassRange(classRanges.data[0].uuid);
        }
    }, []);


    const timer1 = useMemo(() => {

    }, [classRanges]);

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