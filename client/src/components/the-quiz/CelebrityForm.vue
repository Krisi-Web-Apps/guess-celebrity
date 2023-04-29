<template>
  <form @submit.prevent="handleChecking">
    <div class="flex flex-col">
      <label for="famous_name">Име</label>
      <input
        type="text"
        placeholder="Въведете името на български език, с което е известна знаменитостта..."
        class="form-control disabled:bg-gray-200"
        ref="famousName"
        :disabled="!theQuiz.status.isPlaying"
        v-model="theQuiz.form.famous_name"
      />
    </div>
    <div>
      <button
        type="submit"
        :disabled="!theQuiz.status.isPlaying"
        class="primary-btn mt-4 disabled:bg-gray-500"
      >
        Готово
      </button>
    </div>
  </form>
</template>

<script>
// stores
import { onMounted, ref } from "vue";
import { useTheQuizStore } from "../../stores/celebrity";

export default {
  name: "CelebrityForm",
  setup() {
    const theQuiz = useTheQuizStore();
    const famousName = ref(null);

    onMounted(() => {
      famousName.value.focus();
    });

    const handleChecking = () => {
      theQuiz.checking();
      famousName.value.focus();
    };

    const restart = () => {
      console.log(0);
    }

    return { theQuiz, famousName, handleChecking, restart };
  },
};
</script>

<style lang="scss" scoped></style>
