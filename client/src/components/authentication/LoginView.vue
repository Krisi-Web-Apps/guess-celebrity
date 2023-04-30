<template>
  <transition>
    <custom-dialog v-if="env.dialogs.login" @close="functions.handleClose">
      <div class="w-full h-full p-5">
        <h1 class="text-xl text-center">Влезте в профила си</h1>
        <p
          class="text-red-500 text-center py-2"
          v-if="user.alertMessages.error"
        >
          {{ user.alertMessages.error }}
        </p>
        <form @submit.prevent="user.login">
          <base-input
            type="email"
            id="email"
            label="Имейл адрес"
            icon="envelope-icon"
            placeholder="Въведете имейм адреса си..."
            v-model:title="user.credentials.email"
          />
          <base-input
            type="password"
            id="password"
            label="Парола"
            icon="lock-closed-icon"
            placeholder="Въведете паролата си..."
            v-model:title="user.credentials.password"
          />
          <base-button type="submit" label="Вход в профила" />
        </form>
      </div>
    </custom-dialog>
  </transition>
</template>

<script>
//stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

// dialogs
import { CustomDialog } from "../dialogs";

// inputs
import { BaseInput } from "../inputs";

// buttons
import { BaseButton } from "../buttons";

export default {
  name: "LoginView",
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

    user.alertMessages.error = "";

    const functions = {
      handleClose: () => {
        env.dialogs.login = false;
        env.navbars.rightSideNavbar = true;
      },
    };

    return { env, user, functions };
  },
};
</script>

<style lang="scss" scoped></style>
