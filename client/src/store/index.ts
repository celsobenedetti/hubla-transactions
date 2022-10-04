import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { State } from "../interfaces/vuex";

import loadingModule from "./modules/loading";
import userSessionModule from "./modules/userSession";

export const store = createStore<State>({
    modules: {
        loading: loadingModule,
        userSession: userSessionModule,
    },
});

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = () => baseUseStore(key);
