<template>
  <form @submit.prevent="functions.handleSubmit">
    <base-input
      type="text"
      id="famous_name"
      label="Име"
      icon="celebrity-icon"
      placeholder="Въведете името или псевдонима..."
      v-model:title="celebrity.item.famous_name"
    />
    <base-input
      type="text"
      id="image_url"
      label="Адрес на Снимка"
      icon="photo-icon"
      placeholder="Въведете адрес на снимка..."
      v-model:title="celebrity.item.image_url"
    />
    <base-button type="submit" label="Запазване на знаменитост" />
  </form>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useCelebrityStore } from '../../../stores/celebrity';

// inputs
import { BaseInput } from "../../inputs";

// buttons
import { BaseButton } from "../../buttons";

export default {
  name: "SingleForm",
  components: {
    // inputs
    BaseInput,

    // buttons
    BaseButton,
  },
  setup() {
    const celebrity = useCelebrityStore();
    const toast = useToast();

    const functions = {
      showNotification: (status, message) => {
        if (status === "success") toast.success(message);
        if (status === "error") toast.error(message);
      },
      handleSubmit: () => {
        celebrity.saveItem(functions.showNotification);
      },
    };

    return { celebrity, functions }
  },
};
</script>

<style lang="scss" scoped></style>
