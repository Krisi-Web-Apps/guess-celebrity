<template>
  <custom-dialog @close="functions.handleClose">
    <div class="p-5">
      <h2 class="text-2xl text-center">
        {{
          !celebrity.item.id
            ? "Създаване на нова знаменитост"
            : "Редактиране на знаменитост"
        }}
      </h2>
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
    </div>
  </custom-dialog>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useEnvStore } from "../../stores/env";
import { useCelebrityStore } from "../../stores/celebrity";

// dialogs
import { CustomDialog } from "../dialogs";

// inputs
import { BaseInput } from "../inputs";

// buttons
import { BaseButton } from "../buttons";

export default {
  name: "CelebrityForm",
  components: {
    // dialogs
    CustomDialog,

    // inputs
    BaseInput,

    // buttons
    BaseButton,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    const toast = useToast();

    const functions = {
      handleClose: () => {
        env.dialogs.celebrityForm = false;
        env.dialogs.celebrityList = true;
      },
      showNotification: (status, message) => {
        if (status === "success") toast.success(message);
        if (status === "error") toast.error(message);
      },
      handleSubmit: () => {
        celebrity.saveItem(functions.showNotification);
      },
    };

    return { env, celebrity, functions };
  },
};
</script>

<style lang="scss" scoped></style>
