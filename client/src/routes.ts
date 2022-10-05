import { RouterOptions } from "vue-router";

export const routes: RouterOptions["routes"] = [
    /* { path: "/movies/:id", name: "movie", component: () => import("./views/Movie.vue") }, */
    /* { path: "/search", name: "search", component: () => import("./views/Search.vue") }, */
    { path: "/", name: "search", component: () => import("./views/Home.vue") },
    { path: "/signin", name: "signin", component: () => import("./views/SignIn.vue") },
    { path: "/signup", name: "signup", component: () => import("./views/SignUp.vue") },
    /* { path: "/watchlist", name: "watchlist", component: () => import("./views/Watchlist.vue") }, */
];
