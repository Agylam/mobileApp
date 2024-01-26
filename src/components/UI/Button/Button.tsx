import React from "react";
import "./Button.scss";

interface ButtonProps {
    onClick?: () => void;
    isPrimary?: boolean;
    isDanger?: boolean;
    isDisabled?: boolean;
    type?: "button" | "submit";
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    let btnClass = "button";
    if (props.isPrimary) {
        btnClass += " button_primary";
    }
    if (props.isDanger) {
        btnClass += " button_danger";
    }
    if (props.isDisabled) {
        btnClass += " button_disabled";
    }


    return (
        <button className={btnClass} onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    );
};

export default Button;