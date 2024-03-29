import "./Header.scss"
import Button from "../UI/Button";
import {logOut} from "../../utils/logOut";

export const Header = () => {
    return (
        <div className="header">
            <div className="header_left">
                <p className="header_title">
                    Звонки
                </p>
                <p className="header_date">
                    Понедельник, 28 апреля
                </p>
            </div>
            <div className="header_right">
                <Button isDanger={true} onClick={logOut}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};