import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        navbars: {
            rightSideNavbar: false,
        },
        dialogs: {
            register: false,
            login: false,
        }
    })
});
