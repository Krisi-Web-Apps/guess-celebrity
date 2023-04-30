<template>
  <transition>
    <custom-dialog v-if="env.dialogs.register" @close="functions.handleClose">
      <div class="w-full p-5">
        <h1 class="text-xl text-center">Регистриране на нов потребител</h1>
        <p
          class="text-red-500 text-center py-2"
          v-if="user.alertMessages.error"
        >
          {{ user.alertMessages.error }}
        </p>
        <form @submit.prevent="functions.handleSubmit">
          <base-input
            type="email"
            id="email"
            label="Повторете Имейл"
            placeholder="Въведете имейл..."
            icon="envelope-icon"
            v-model:title="user.credentials.email"
          />
          <base-input
            type="password"
            id="password"
            label="Повторете Парола"
            placeholder="Въведете парола..."
            icon="lock-closed-icon"
            v-model:title="user.credentials.password"
          />
          <base-input
            type="password"
            id="c_password"
            label="Повторете Парола"
            placeholder="Повторете паролата..."
            icon="lock-closed-icon"
            v-model:title="user.credentials.c_password"
          />
          <base-button type="submit" label="Регистриране на нов потребител" />
        </form>
      </div>
    </custom-dialog>
  </transition>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

// dialogs
import { CustomDialog } from "../dialogs";

// inputs
import { BaseInput } from "../inputs";

// buttons
import { BaseButton } from "../buttons";

export default {
  name: "RegisterView",
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
    const user = useUserStore();
    const toast = useToast();

    user.alertMessages.error = "";

    const functions = {
      handleClose: () => {
        env.dialogs.register = false;
        env.navbars.rightSideNavbar = true;
      },
      showNotification: (status, message) => {
        if (status === "success") toast.success(message);
        if (status === "error") toast.error(message);
      },
      handleSubmit: () => {
        user.register(functions.showNotification);
      },
    };

    return { env, user, functions };
  },
};
</script>

<style lang="scss" scoped></style>
