import {useEffect} from "react";
import {isExpired} from "react-jwt";
import {refreshToken} from "../api/refreshToken";
import useLocalStorage from "use-local-storage";

const accessTokenCheckIntervalMs = 3000;


export const useJwtKeepAlive = () => {
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

    useEffect(() => {
        let updateInterval: NodeJS.Timeout;
        const updateAccessToken = async () => {
            if (!accessToken || !isExpired(accessToken)) {
                return;
            }

            try {
                const {accessToken} = await refreshToken();
                setAccessToken(accessToken);
            } catch (e) {
                clearInterval(updateInterval);
                setAccessToken("");
                console.error("Ошибка обновления токена");
            }
        };

        if (accessToken && !isExpired(accessToken)) {
            updateInterval = setInterval(updateAccessToken, accessTokenCheckIntervalMs);
            return () => {
                clearInterval(updateInterval);
            };
        }
    }, [accessToken, setAccessToken]);
};