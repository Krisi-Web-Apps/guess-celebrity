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
        register() {
            this.loading = true;

            api.post(this.urls.register, this.credentials)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.message;
                        return;
                    }

                    this.login();
                })
                .catch((err) => console.log(err))
                .finally(() => this.loading = false);
        },
        login() {
            this.loading = true;

            api.post(this.urls.login, this.credentials)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.message;
                        this.logout();
                        return;
                    }

                    this.afterLogin(res.data.data.token);
                })
                .catch((err) => {
                    console.log(err);
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
        }
    }
});
