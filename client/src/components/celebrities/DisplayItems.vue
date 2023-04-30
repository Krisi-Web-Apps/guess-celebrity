<template>
  <custom-dialog @close="functions.handleClose">
    <div class="p-5 mt-5" v-if="!celebrity.loading">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl text-center">
          Знаменитости ({{ celebrity.items.length }})
        </h2>
        <base-button
          label="Добави Нова"
          @click="() => functions.handleOpenCelebrityForm({ new: true })"
        />
      </div>
      <ul class="mt-5 max-h-[60vh] overflow-y-scroll">
        <li
          v-for="(item, index) in celebrity.items"
          :key="index"
          :title="`Актуализиране на (${item.famous_name})`"
          class="w-full py-2 px-2 border rounded mb-1 cursor-pointer hover:bg-gray-200"
          @click="
            () => functions.handleOpenCelebrityForm({ new: false, id: item.id })
          "
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

// buttons
import { BaseButton } from "../buttons";

export default {
  name: "DisplayItems",
  components: {
    // dialogs
    CustomDialog,

    // buttons
    BaseButton,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    celebrity.getItems();

    const functions = {
      handleClose: () => {
        env.dialogs.celebrityList = false;
        env.navbars.rightSideNavbar = true;
      },
      handleOpenCelebrityForm: (params) => {
        env.dialogs.celebrityForm = true;
        env.dialogs.celebrityList = false;
        if (params.new) {
          celebrity.item = {};
        } else {
          celebrity.item.id = params.id;
          celebrity.getItem();
        }
      },
    };

    return { env, celebrity, functions };
  },
};
</script>

<style lang="scss" scoped></style>
