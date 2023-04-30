<template>
  <transition>
    <custom-dialog v-if="env.dialogs.login" @close="handleClose">
      <div class="w-full h-full p-5">
        <h1 class="text-xl text-center">Влезте в профила си</h1>
        <p
          class="text-red-500 text-center py-2"
          v-if="user.alertMessages.error"
        >
          {{ user.alertMessages.error }}
        </p>
        <form @submit.prevent="user.login">
          <div class="flex flex-col mb-5">
            <base-input
              type="email"
              id="email"
              label="Имейл адрес"
              icon="envelope-icon"
              placeholder="Въведете имейм адреса си..."
              v-model:title="user.credentials.email"
            />
          </div>
          <base-input
            type="password"
            id="password"
            label="Парола"
            icon="lock-closed-icon"
            placeholder="Въведете паролата си..."
            v-model:title="user.credentials.password"
          />
          <div>
            <button type="submit" class="primary-btn">Вход в профила</button>
          </div>
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

export default {
  name: "LoginView",
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
      env.dialogs.login = false;
      env.navbars.rightSideNavbar = true;
    };

    return { env, user, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
