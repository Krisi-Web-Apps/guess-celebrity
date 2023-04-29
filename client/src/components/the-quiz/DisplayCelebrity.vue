<template>
  <div class="flex justify-center" v-if="theQuiz.item">
    <div class="w-[300px] h-[300px] rounded-full overflow-hidden">
      <img
        :src="theQuiz.item.image_url"
        class="w-full h-auto"
      />
    </div>
  </div>
</template>

<script>
// stores
import { useTheQuizStore } from "../../stores/celebrity";

export default {
  name: "DisplayCelebrity",
  setup() {
    const theQuiz = useTheQuizStore();
    theQuiz.getItems();
    return { theQuiz }
  }
};
</script>

<style lang="scss" scoped></style>
