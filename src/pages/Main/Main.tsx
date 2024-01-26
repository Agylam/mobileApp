import {FullLogo} from "../../components/UI/FullLogo/FullLogo";
import "./Main.scss"
import {AuthForm} from "../../components/AuthForm/AuthForm.tsx";
import {useUserInfo} from "../../hooks/useUserInfo.ts";
import {useNavigate} from "react-router";

export const Main = () => {
    const navigate = useNavigate();

    const userInfo = useUserInfo();
    if (userInfo !== null) {
        navigate("/schedule");
    }
    return (
        <div className="main_page">
            <FullLogo/>
            <AuthForm/>
        </div>
    );
};