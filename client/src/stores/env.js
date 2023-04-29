import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        currentBackground: "",
        backgrounds: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1492119884860-63772f175a02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1205&q=80"
        ],
        navbars: {
            rightSideNavbar: false,
        },
        dialogs: {
            register: false,
            login: false,
            theQuizView: true,
        }
    }),
    actions: {
        getRandomBackground() {
            const randomNumber = Math.floor(Math.random(1) * this.backgrounds.length);
            console.log(randomNumber);
            this.currentBackground = this.backgrounds[randomNumber];
        }
    }
});
