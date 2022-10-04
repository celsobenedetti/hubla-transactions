import { Commit } from "vuex";

export interface IUserSessionState {
    token: string;
}

export interface LoadingState {
    isLoading: boolean;
}

export interface State {
    loading: LoadingState;
}

export interface StoreCommit {
    commit: Commit;
}
