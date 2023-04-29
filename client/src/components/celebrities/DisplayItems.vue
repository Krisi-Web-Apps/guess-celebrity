<template>
  <custom-dialog @close="handleClose">
    <div class="p-5 mt-5" v-if="!celebrity.loading">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl text-center">
          Знаменитости ({{ celebrity.items.length }})
        </h2>
        <button @click="openCelebrityForm" class="primary-btn">
          Добави Нова
        </button>
      </div>
      <ul class="mt-5 max-h-[60vh] overflow-y-scroll">
        <li
          v-for="(item, index) in celebrity.items"
          :key="index"
          class="w-full py-2 px-2 border rounded mb-1 hover:bg-gray-200"
        >
          <div class="flex items-center">
            <div class="w-12 rounded shadow overflow-hidden">
              <img
                :src="item.image_url"
                :alt="item.name"
                class="w-full h-full"
              />
            </div>
            <span class="ml-3">{{ item.famous_name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <div>Зареждане...</div>
    </div>
  </custom-dialog>
</template>

<script>
//stores
import { useCelebrityStore } from "../../stores/celebrity";
import { useEnvStore } from "../../stores/env";

// dialogs
import { CustomDialog } from "../dialogs";

export default {
  name: "DisplayItems",
  components: {
    // dialogs
    CustomDialog,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    celebrity.getItems();

    const handleClose = () => {
      env.dialogs.celebrityList = false;
      env.navbars.rightSideNavbar = true;
    }

    const openCelebrityForm = () => {
      env.dialogs.celebrityForm = true;
      env.dialogs.celebrityList = false;
    }

    return { env, celebrity, handleClose, openCelebrityForm };
  },
};
</script>

<style lang="scss" scoped></style>
