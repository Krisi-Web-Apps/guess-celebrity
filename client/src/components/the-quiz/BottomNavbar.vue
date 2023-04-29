<template>
  <div class="w-full border-t border-gray-200 h-20">
    <div
      class="mx-auto text-xl flex items-center justify-center gap-5 w-full h-full"
    >
      <button
        class="py-2 px-4 rounded text-white border-green-600 bg-green-600"
        title="Верни отговири"
      >
        {{ theQuiz.stats.correctCount }}
      </button>
      <button
        class="py-2 px-4 rounded text-white border-red-600 bg-red-600"
        title="Грешени отговири"
      >
        {{ theQuiz.stats.incorrectCount }}
      </button>
      <button
        class="py-2 px-4 rounded text-white border-blue-600 bg-blue-600"
        title="Общо изпратени отговори"
      >
        {{ theQuiz.stats.answeredCount }}
      </button>
      <button
        class="py-2 px-4 rounded text-white border-yellow-600 bg-yellow-600"
        title="Рестартиране на теста"
        @click="
          () => {
            theQuiz.restart();
            theQuiz.start();
          }
        "
      >
        <restart-icon />
      </button>
    </div>
  </div>
</template>

<script>
// stores
import { useTheQuizStore } from "../../stores/celebrity";

// icons
import { RestartIcon } from "../../icons";

export default {
  name: "BottomNavbar",
  components: {
    // icons
    RestartIcon,
  },
  setup() {
    const theQuiz = useTheQuizStore();
    return { theQuiz };
  },
};
</script>

<style lang="scss" scoped></style>
