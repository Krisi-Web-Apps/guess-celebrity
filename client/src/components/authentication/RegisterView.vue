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
          <div class="flex flex-col mb-5">
            <label for="email">Имейл адрес</label>
            <div class="flex items-center border border-gray-300 rounded mt-1">
              <envelope-icon class="mx-2" />
              <input
                type="email"
                id="email"
                v-model="user.credentials.email"
                placeholder="Въведете имейм адреса си..."
                class="w-full py-2 rounded outline-none focus:pl-2 transition-all"
                autofocus
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label for="password">Парола</label>
            <div class="flex items-center border border-gray-300 rounded mt-1">
              <lock-closed-icon class="mx-2" />
              <input
                type="password"
                id="password"
                v-model="user.credentials.password"
                placeholder="Въведете паролата си..."
                class="w-full py-2 pr-4 outline-none focus:pl-2 transition-all"
              />
            </div>
          </div>
          <div class="flex flex-col mb-5">
            <label for="password">Потвърдете Паролата</label>
            <div class="flex items-center border border-gray-300 rounded mt-1">
              <lock-closed-icon class="mx-2" />
              <input
                type="password"
                id="c_password"
                v-model="user.credentials.c_password"
                placeholder="Въведете паролата си..."
                class="w-full py-2 pr-4 outline-none focus:pl-2 transition-all"
              />
            </div>
          </div>
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

// icons
import { EnvelopeIcon, LockClosedIcon } from "../../icons";

export default {
  name: "RegisterView",
  components: {
    // dialogs
    CustomDialog,

    // icons
    EnvelopeIcon,
    LockClosedIcon,
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
