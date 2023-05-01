import { defineStore } from "pinia";

import api from "../boot/axios";

import { useEnvStore } from "./env";

export const useUserStore = defineStore("user", {
    state: () => ({
        loading: false,
        alertMessages: {
            error: "",
        },
        urls: {
            register: "/users/register",
            login: "/users/login",
            user: "/users",
            users: "/stats/users"
        },
        credentials: {
            email: "",
            password: "",
            c_password: "",
        },
        isLoggedIn: false,
        me: {},
        item: {},
        items: []
    }),
    actions: {
        register(cb) {
            this.loading = true;

            api.post(this.urls.register, this.credentials)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.message;
                        cb("error", res.data.message);
                        return;
                    }

                    cb("success", "Успешно регистриране на нов потребител.");
                    const env = useEnvStore();
                    env.dialogs.register = false;
                    env.dialogs.login = true;
                })
                .catch((err) => {
                    cb("error", err.message);
                })
                .finally(() => this.loading = false);
        },
        login(cb) {
            this.loading = true;

            api.post(this.urls.login, this.credentials)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.message;
                        this.logout();
                        cb("error", res.data.message);
                        return;
                    }
                    cb("success", "Успешно влизане в профила.");
                    this.afterLogin(res.data.data.token);
                })
                .catch((err) => {
                    cb("error", err.message);
                    this.alertMessages.error = err.message;
                })
                .finally(() => this.loading = false);
        },
        afterLogin(token) {
            localStorage.setItem("token", token);
            api.defaults.headers.authorization = `Bearer ${token}`;
            this.isLoggedIn = true;
            const env = useEnvStore();
            env.dialogs.login = false;
            env.dialogs.register = false;
            env.navbars.rightSideNavbar = true;
            this.alertMessages.error = "";
            this.getUser();
        },
        logout() {
            localStorage.clear();
            api.defaults.headers.authorization = null;
            this.isLoggedIn = false;
            this.me = {};
        },
        getUser() {
            api.get(this.urls.user)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.data.message;
                        this.logout();
                        return;
                    }

                    this.me = res.data.data;
                })
                .catch((err) => {
                    this.alertMessages.error = err.message;
                    this.logout();
                })
                .finally(() => this.loading = false);
        },
        getItems(cb) {
            this.loading = true;
            api.get(this.urls.users)
                .then(res => {
                    if (typeof res.data.data === "object") {
                        this.items = res.data.data;
                        return;
                    }

                    cb("error", res.data.message);
                })
                .catch(err => {
                    cb("error", err.message);
                })
                .finally(() => this.loading = false);
        }
    }
});
