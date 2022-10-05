import { useAxios } from "@vueuse/integrations/useAxios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const authHeader = (token: string) => {
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const usePostServer = (
    endpoint: string,
    { data = {}, immediate = false, token = "", headers = {} } = {},
) => {
    return useAxios(
        `${SERVER_BASE_URL}/${endpoint}`,
        {
            method: "POST",
            headers: {
                ...headers,
                ...authHeader(token),
            },
            data,
        },
        { immediate },
    );
};

export const useGetServer = (
    endpoint: string,
    { immediate = false, token = "", headers = {} } = {},
) => {
    return useAxios(
        `${SERVER_BASE_URL}/${endpoint}`,
        {
            method: "GET",
            headers: {
                ...headers,
                ...authHeader(token),
            },
        },
        { immediate },
    );
};

export const useDeleteServer = (
    endpoint: string,
    { immediate = false, token = "", headers = {} } = {},
) => {
    return useAxios(
        `${SERVER_BASE_URL}/${endpoint}`,
        {
            method: "DELETE",
            headers: {
                ...headers,
                ...authHeader(token),
            },
        },
        { immediate },
    );
};
