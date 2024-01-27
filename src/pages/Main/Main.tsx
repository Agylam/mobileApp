import {FullLogo} from "../../components/UI/FullLogo/FullLogo";
import "./Main.scss"
import {AuthForm} from "../../components/AuthForm/AuthForm.tsx";
import {useUserInfo} from "../../hooks/useUserInfo.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export const Main = () => {
    const navigate = useNavigate();

    const userInfo = useUserInfo();
    useEffect(() => {
        if (userInfo !== null) {
            navigate("/schedule");
        }
    }, []);

    return (
        <div className="main_page">
            <FullLogo/>
            <AuthForm/>
        </div>
    );
};