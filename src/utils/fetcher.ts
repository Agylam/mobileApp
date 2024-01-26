export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export const fetcher = (accessToken = "") => {
    return async <T = unknown>(uri: string, data = {}, method: HttpMethod = HttpMethod.GET): Promise<T> => {
        const unparsed_response = await fetch(import.meta.env.VITE_BASE_API_URL + uri, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            method,
            body: method !== HttpMethod.GET ? JSON.stringify(data) : null
        });

        let resp: T & { message?: string };

        try {
            resp = await unparsed_response.json();
        } catch (e) {
            console.error();
            throw new Error(unparsed_response.statusText);
        }

        if (!unparsed_response.ok) {
            if (resp.message !== undefined) {
                throw new Error(resp.message);
            }
            console.error("Произошла ошибка при получении данных. URI: " + uri);
            throw new Error(unparsed_response.statusText);
        }


        return resp;
    };
};

export const apiFetcher = () => fetcher(JSON.parse(localStorage.getItem('acceccToken') || "\"\""))