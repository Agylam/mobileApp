import {apiFetcher, HttpMethod} from "../utils/fetcher";

export const refreshToken = () => {
    return apiFetcher()<{ accessToken: string }>("/auth/refresh/", {}, HttpMethod.POST);
};