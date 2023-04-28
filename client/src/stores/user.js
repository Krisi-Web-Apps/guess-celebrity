import api from "../boot/axios";
import { defineStore } from "pinia";

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
            cpassword: "",
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
                        this.alertMessages.error = res.data.data.message;
                        return;
                    }

                    this.login();
                })
                .catch((err) => console.log(err))
                .finally(() => this.loading = false);
        },
        login(cb) {
            this.loading = true;
            
            api.post(this.urls.login, this.credentials)
                .then((res) => {
                    if (res.data.status !== "success") {
                        this.alertMessages.error = res.data.message;
                        return;
                    }

                    this.afterLogin(res.data.data.token);
                    cb();
                })
                .catch((err) => console.log(err))
                .finally(() => this.loading = false);
        },
        afterLogin(token) {
            localStorage.setItem("token", token);
            api.defaults.headers.authorization = `Bearer ${token}`;
            this.isLoggedIn = true;
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
                        return;
                    }

                    console.log(res.data.data);
                    this.me = res.data.data;
                })
                .catch((err) => console.log(err))
                .finally(() => this.loading = false);
        }
    }
});
