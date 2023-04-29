<template>
  <medium-dialog @close="celebrity.dialogs.all = false">
    <div class="p-5" v-if="!celebrity.loading">
      <h2 class="text-2xl text-center">Знаменитости ({{ celebrity.items.length }})</h2>
      <ul class="mt-5 max-h-[60vh] overflow-y-scroll">
        <li
          v-for="(item, index) in celebrity.items"
          :key="index"
          class="w-full py-2 px-2 border rounded mb-1 hover:bg-gray-200"
        >
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full shadow overflow-hidden">
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
  </medium-dialog>
</template>

<script>
//stores
import { useCelebrityStore } from "../../stores/celebrity";

// dialogs
import { MediumDialog } from "../dialogs";

export default {
  name: "DisplayItems",
  components: {
    // dialogs
    MediumDialog,
  },
  setup() {
    const celebrity = useCelebrityStore();
    celebrity.getItems();
    return { celebrity };
  },
};
</script>

<style lang="scss" scoped></style>
