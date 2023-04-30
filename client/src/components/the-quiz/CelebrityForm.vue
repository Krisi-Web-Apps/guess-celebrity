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
import { useToast } from "vue-toast-notification";

// stores
import { onMounted, ref } from "vue";
import { useTheQuizStore } from "../../stores/celebrity";

export default {
  name: "CelebrityForm",
  setup() {
    const theQuiz = useTheQuizStore();
    const famousName = ref(null);
    const toast = useToast();

    const functions = {
      handleChecking: () => {
        theQuiz.checking(functions.showNotification);
        famousName.value.focus();
      },
      showNotification: (status) => {
        if (status === "success") toast.success("Браво!");
        if (status === "wrong") toast.error("Опсс! Опитайте пак.");
      },
    };

    onMounted(() => {
      famousName.value.focus();
    });

    return { theQuiz, famousName, ...functions };
  },
};
</script>

<style lang="scss" scoped></style>
