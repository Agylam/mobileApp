import {FullLogo} from "../../components/UI/FullLogo/FullLogo";
import "./Main.scss"
import {AuthForm} from "../../components/AuthForm/AuthForm.tsx";

export const Main = () => {
    return (
        <div className="main_page">
            <FullLogo/>
            <AuthForm/>
        </div>
    );
};