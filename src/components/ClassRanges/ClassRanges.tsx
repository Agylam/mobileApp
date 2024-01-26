import "./ClassRanges.scss"
import {useState} from "react";
import {ApiClassRange} from "../../interfaces/api/ClassRange.ts";
import {ClassRangeItem} from "../ClassRangeItem/ClassRangeItem.tsx";

export const ClassRanges = () => {
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
    return (
        <div className="classrange_container">
            {
                classRanges.map(classRange => {
                    return <ClassRangeItem
                        classRange={classRange}
                        key={classRange.uuid}
                    />
                })
            }
        </div>
    );
};