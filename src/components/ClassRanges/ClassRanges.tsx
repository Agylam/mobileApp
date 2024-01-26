import "./ClassRanges.scss"
import {PropsWithoutRef} from "react";
import {ApiClassRange} from "../../interfaces/api/ClassRange.ts";
import {ClassRangeItem} from "../ClassRangeItem/ClassRangeItem.tsx";

interface ClassRangeProps {
    selectedClassRange: string;
    setSelectedClassRange: (selectedClassRange: string) => void;
    classRanges: ApiClassRange[]
}

export const ClassRanges = (props: PropsWithoutRef<ClassRangeProps>) => {
    const onClassRangeClick = (classRange: string) => {
        return () => {
            props.setSelectedClassRange(classRange);
        }
    }

    return (
        <div className="classrange_container">
            {
                props.classRanges.map(classRange => {
                    return <ClassRangeItem
                        classRange={classRange}
                        key={classRange.uuid}
                        active={props.selectedClassRange === classRange.uuid}
                        onClick={onClassRangeClick(classRange.uuid)}
                    />
                })
            }
        </div>
    );
};