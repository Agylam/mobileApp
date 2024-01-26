import React, {Suspense, useEffect} from "react";
import "./MainContainer.scss";
import useLocalStorage from "use-local-storage";
import {SWRConfig} from "swr";
import {Spinner} from "../Spinner/Spinner.tsx";
import {useJwtKeepAlive} from "../../hooks/useJwtKeepAlive.ts";
import {SWRDevTools} from "swr-devtools";


interface MainContainerProps {
    children?: React.ReactNode;
}

export const MainContainer = (props: MainContainerProps) => {
    const [isLightTheme, setIsLightTheme] = useLocalStorage(
        "isLightTheme",
        //!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        true,
    );

    useJwtKeepAlive();
    const [accessToken] = useLocalStorage("accessToken", "");

    useEffect(() => {
        console.log("useLocalStorage token changed", accessToken);
    }, [accessToken]);

    useEffect(() => {
        console.log("localStorage token changed", localStorage.accessToken);
    }, [localStorage.accessToken]);

    useEffect(() => {
        console.log("localStorageFunc token changed", localStorage.getItem("accessToken"));
    }, [localStorage.getItem("accessToken")]);



    return (
        <SWRDevTools>
            <SWRConfig value={{
                suspense: true, onError: (error, key) => {
                    console.log("Error", error, key);
                }
            }}>
                <div className="main_container" data-theme={isLightTheme ? "light" : "dark"}>
                    <Suspense fallback={<Spinner/>}>
                        {props.children}
                    </Suspense>
                </div>
            </SWRConfig>
        </SWRDevTools>
    );
};