import { LoadingState, StoreCommit } from "../../interfaces/vuex";

export default {
    state: () => ({ isLoading: true }),

    actions: {
        initLoading({ commit }: StoreCommit) {
            commit("setLoading", true);
        },
        resolveLoading({ commit }: StoreCommit) {
            commit("setLoading", false);
        },
    },
    mutations: {
        setLoading(state: LoadingState, payload: boolean) {
            state.isLoading = payload;
        },
    },

    getters: {
        isLoading: (state: LoadingState) => state.isLoading,
    },
};
