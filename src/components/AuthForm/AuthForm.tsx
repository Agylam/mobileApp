import React, {useState} from "react";
import "./AuthForm.scss"
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth} from "../../api/auth.ts";
import {useNavigate} from "react-router";
import useLocalStorage from "use-local-storage";

export const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const navigate = useNavigate();
    const [_, setAccessToken] = useLocalStorage("accessToken", "");

    const onAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await auth(email, password);
            localStorage.accessToken = JSON.stringify(response.accessToken);
            setTimeout(() => {
                navigate("/schedule");
                console.log("TM", localStorage.accessToken);
            }, 1000);
        } catch (e) {
            console.error("AuthFrom error:", e);
        }
    };

    return (
        <div className="auth_form">
            <form id="auth" onSubmit={onAuthSubmit}>
                <Input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="Почта"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Пароль"
                />
                <Button type="submit">Войти</Button>
            </form>
            <div className="auth_links">
                <a href="#" className="auth_link">Регистрация</a>
                <a href="#" className="auth_link">Забыли пароль?</a>
            </div>
        </div>
    );
};