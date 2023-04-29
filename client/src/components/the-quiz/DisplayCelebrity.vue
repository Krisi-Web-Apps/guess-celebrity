<template>
  <div class="flex justify-center" v-if="theQuiz.item">
    <div class="w-[400px] h-[300px] rounded overflow-hidden">
      <img
        :src="theQuiz.item.image_url"
        class="w-full h-full"
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
    theQuiz.start();
    return { theQuiz }
  }
};
</script>

<style lang="scss" scoped></style>
