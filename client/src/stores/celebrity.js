import { defineStore } from "pinia";

import api from "../boot/axios";

import { useEnvStore } from "./env";

import { shuffle } from "../utils";

export const useCelebrityStore = defineStore("celebrity", {
    state: () => ({
        loading: false,
        urls: {
            initial: "/celebrities",
            bulk: "/celebrities/bulk",
        },
        item: {},
        items: [],
        multi: {
            count: 1,
            maxCount: 100,
            items: [],
        },
    }),
    actions: {
        generateMultiItems(cb) {
            if (this.multi.count > this.multi.maxCount) {
                cb("error", "Прекалено много клетки!");
                this.multi.count = this.multi.maxCount;
            }
            let array = [];
            for (let i = 1; i <= this.multi.count; i++) {
                array.push({});
            }
            this.multi.items = array;
        },
        getItem() {
            this.loading = true;
            api.get(`${this.urls.initial}/${this.item.id}`)
                .then(res => {
                    if (typeof res.data.data === "object") {
                        this.item = res.data.data[0];
                    }
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        getItems() {
            this.loading = true;
            api.get(this.urls.initial)
                .then(res => {
                    if (res.status === 200) {
                        this.items = res.data.data;
                    }
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false);
        },
        saveItem(cb) {
            this.loading = true;
            api.post(this.urls.initial, this.item)
                .then(res => {
                    if (typeof res.data.data === "number") {
                        this.item.id = res.data.data;
                    }
                    this.afterSaving();
                    cb("success", "Успешно запазена знаменитост.");
                })
                .catch(err => {
                    cb("error", err.message);
                })
                .finally(() => this.loading = false);
        },
        saveItemsBulk(cb) {
            this.loading = true;
            api.post(this.urls.bulk, this.multi.items)
                .then(res => {
                    if (typeof res.data.data === "object") {
                        this.getItems();
                        setTimeout(() => this.afterSaving(), 3000);
                        this.generateMultiItems();
                        cb("success", "Успешно са създадени новите знаменитости.");
                        return;
                    }
                    cb("error", res.data.message);
                })
                .catch(err => {
                    cb("error", res.data.message);
                })
                .finally(() => this.loading = false);
        },
        afterSaving() {
            const env = useEnvStore();
            env.dialogs.celebrityForm = false;
            env.dialogs.celebrityList = true;
        },
        deleteItem(cb) {
            this.loading = true;
            api.delete(`${this.urls.initial}/${this.item.id}`)
                .then(res => {
                    if (res.status === 200) {
                        this.item = {};
                        cb("success", "Успешно изтрита знаменитост.");
                        this.getItems();
                        return;
                    }

                    ch("error", res.data.message);
                })
                .catch(err => {
                    cb("error", err.message);
                })
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
        checking(cb) {
            const result = this.item.famous_name.toLowerCase() === this.form.famous_name.toLowerCase();

            if (result) {
                this.stats.correctCount++;
                cb("success");
            } else {
                this.stats.incorrectCount++;
                cb("wrong");
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
