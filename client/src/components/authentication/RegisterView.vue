<template>
  <transition>
    <custom-dialog v-if="env.dialogs.register" @close="handleClose">
      <div class="w-full p-5">
        <h1 class="text-xl text-center">Регистриране на нов потребител</h1>
        <p
          class="text-red-500 text-center py-2"
          v-if="user.alertMessages.error"
        >
          {{ user.alertMessages.error }}
        </p>
        <form @submit.prevent="user.register">
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
          <div>
            <button type="submit" class="primary-btn">
              Регистриране на нов потребител
            </button>
          </div>
        </form>
      </div>
    </custom-dialog>
  </transition>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

// dialogs
import { CustomDialog } from "../dialogs";

// inputs
import { BaseInput } from "../inputs";

export default {
  name: "RegisterView",
  components: {
    // dialogs
    CustomDialog,

    // inputs
    BaseInput,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    user.alertMessages.error = "";

    const handleClose = () => {
      env.dialogs.register = false;
      env.navbars.rightSideNavbar = true;
    };

    return { env, user, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
