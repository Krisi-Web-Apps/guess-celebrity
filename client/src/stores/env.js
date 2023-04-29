import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        currentBackground: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        navbars: {
            rightSideNavbar: false,
        },
        dialogs: {
            register: false,
            login: false,
            theQuizView: true,
        }
    })
});
