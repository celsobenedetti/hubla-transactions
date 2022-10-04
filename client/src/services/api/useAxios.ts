import { useAxios } from "@vueuse/integrations/useAxios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const authHeader = (token: string) => {
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const usePostServer = (
    endpoint: string,
    { data = {}, immediate = false, token = "" } = {},
) => {
    return useAxios(
        `${SERVER_BASE_URL}/${endpoint}`,
        {
            method: "POST",
            headers: authHeader(token),
            data,
        },
        { immediate },
    );
};

export const useGetServer = (endpoint: string, { immediate = false, token = "" } = {}) => {
    return useAxios(
        `${SERVER_BASE_URL}/${endpoint}`,
        {
            method: "GET",
            headers: authHeader(token),
        },
        { immediate },
    );
};
