import { defineStore } from "pinia";

import api from "../boot/axios";

import { useEnvStore } from "./env";

import { shuffle } from "../utils";

export const useCelebrityStore = defineStore("celebrity", {
    state: () => ({
        loading: false,
        url: "/celebrities",
        item: {
            famous_name: "",
            image_url: "",
        },
        items: []
    }),
    actions: {
        getItems() {
            this.loading = true;
            api.get(this.url)
                .then(res => {
                    if (res.status === 200) {
                        this.items = res.data.data;
                    }
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        saveItem() {
            this.loading = true;
            api.post(this.url, this.item)
                .then(res => {
                    if (typeof res.data.data === "number") {
                        this.item.id = res.data.data;
                    }
                    this.afterSaving();
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        afterSaving() {
            const env = useEnvStore();
            env.dialogs.celebrityForm = false;
            env.dialogs.celebrityList = true;
        }
    }
});

export const useTheQuizStore = defineStore("the-quiz", {
    state: () => ({
        loading: false,
        urls: {
            get: "/celebrities"
        },
        status: {
            isPlaying: true,
        },
        stats: {
            answeredCount: 0,
            correctCount: 0,
            incorrectCount: 0,
        },
        item: {},
        items: [],
        currentItemIndex: 0,
        form: {
            famous_name: "",
        },
    }),
    actions: {
        getItem() {
            this.item = this.items[this.currentItemIndex];
        },
        getItems() {
            this.loading = true;
            api.get(this.urls.get)
                .then(res => {
                    if (res.status === 200) {
                        this.items = shuffle(res.data.data);
                        this.getItem();
                    }
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        start() {
            this.restart();
            this.getItems();
        },
        nextItem() {
            if (this.currentItemIndex + 1 === this.items.length) {
                this.end();
                return;
            }
            this.currentItemIndex++;
            this.getItem();
        },
        prevItem() {
            if (this.currentItemIndex <= 0) return;
            this.currentItemIndex--;
            this.getItem();
        },
        checking() {
            const result = this.item.famous_name.toLowerCase() === this.form.famous_name.toLowerCase();

            if (result) {
                this.stats.correctCount++;
            } else {
                this.stats.incorrectCount++;
            }

            this.nextItem();
            this.stats.answeredCount++;
            this.form.famous_name = "";
        },
        end() {
            this.status.isPlaying = false;
            const env = useEnvStore();
            setTimeout(() => {
                env.dialogs.theQuizView = false;
            }, 3000);
        },
        restart() {
            this.stats.correctCount = 0;
            this.stats.incorrectCount = 0;
            this.stats.answeredCount = 0;
            this.currentItemIndex = 0;
            this.form.famous_name = "";
            this.status.isPlaying = true;
        }
    }
});
