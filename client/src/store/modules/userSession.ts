/* import { ActionContext } from "vuex"; */
import { useStorage } from "@vueuse/core";
import { IUserSessionState } from "../../interfaces/vuex";

export default {
    state: () => ({
        token: useStorage("jwtToken", ""),
    }),

    mutations: {
        setToken(state: IUserSessionState, payload: string) {
            state.token = payload;
        },
        logUserOut(state: IUserSessionState) {
            state.token = "";
        },
    },

    actions: {
        /* async fetchBookmarks(context: ActionContext<IUserSessionState, {}>) { */
        /*     if (!context.getters.sessionToken) return; */
        /*     context.commit("setBookmarks", await getUserBookmarks(context.getters.sessionToken)); */
        /* }, */
    },

    getters: {
        sessionToken: (state: IUserSessionState) => state.token,
    },
};
