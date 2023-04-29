import { defineStore } from "pinia";

import api from "../boot/axios";
import { shuffle } from "../utils";

export const useCelebrityStore = defineStore("celebrity", {
    state: () => ({
        loading: false,
        dialogs: {
            all: false,
        },
        urls: {
            get: "/celebrities"
        },
        item: {},
        items: []
    }),
    actions: {
        getItems() {
            this.loading = true;
            api.get(this.urls.get)
                .then(res => {
                    if (res.status === 200) {
                        this.items = res.data.data;
                    }
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
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
            win: false,
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
        }
    }
});
