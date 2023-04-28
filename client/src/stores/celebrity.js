import { defineStore } from "pinia";
import api from "../boot/axios";

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
