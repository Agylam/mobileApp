import "./ClassRangeItem.scss"
import {PropsWithoutRef} from "react";
import {ApiClassRange} from "../../interfaces/api/ClassRange.ts";

interface ClassRangeItemProps {
    classRange: ApiClassRange;
    active: boolean;
    onClick: () => void;
}

export const ClassRangeItem = (props: PropsWithoutRef<ClassRangeItemProps>) => {
    let className = "classrange_item";
    if (props.active) {
        className += " classrange_item_active";
    }

    return (
        <div className={className}>
            <a
                className="classrange_name"
                onClick={props.onClick}
                href="#"
            >
                {props.classRange.name}
            </a>
        </div>
    );
};