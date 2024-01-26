import "./ClassRangeItem.scss"
import {PropsWithoutRef} from "react";
import {ApiClassRange} from "../../interfaces/api/ClassRange.ts";

interface ClassRangeItemProps {
    classRange: ApiClassRange;
}

export const ClassRangeItem = (props: PropsWithoutRef<ClassRangeItemProps>) => {
    return (
        <div className="classrange_item">
            <p className="classrange_name">{props.classRange.name}</p>
        </div>
    );
};