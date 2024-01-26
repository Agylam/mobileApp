import React, {Suspense} from "react";
import "./MainContainer.scss";
import useLocalStorage from "use-local-storage";


interface MainContainerProps {
    children?: React.ReactNode;
}

export const MainContainer = (props: MainContainerProps) => {
    const [isLightTheme, setIsLightTheme] = useLocalStorage(
        "isLightTheme",
        //!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        true,
    );

    return (
        <div className="main_container" data-theme={isLightTheme ? "light" : "dark"}>
            {props.children}
        </div>
    );
};