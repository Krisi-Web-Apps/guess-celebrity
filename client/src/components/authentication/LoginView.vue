<template>
  <medium-dialog v-if="env.dialogs.login" @close="env.dialogs.login = false">
    <div class="w-full p-5">
      <h1 class="text-xl text-center">Влезте в профила си</h1>
      <p class="text-red-500 text-center py-2" v-if="user.alertMessages.error">
        {{ user.alertMessages.error }}
      </p>
      <form @submit.prevent="() => user.login(afterLogin)">
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
        <div>
          <button
            type="submit"
            class="py-2 px-5 border border-gray-300 rounded hover:bg-gray-100 focus:bg-gray-200 outline-none"
          >
            Вход в профила
          </button>
        </div>
      </form>
    </div>
  </medium-dialog>
</template>

<script>
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";
import LockClosedIcon from "../../icons/LockClosedIcon.vue";
import EnvelopeIcon from "../../icons/EnvelopeIcon.vue";
import MediumDialog from "../dialogs/MediumDialog.vue";

export default {
  name: "LoginView",
  components: {
    MediumDialog,
    LockClosedIcon,
    EnvelopeIcon,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    function afterLogin() {
      env.dialogs.login = false;
      user.alertMessages.error = "";
    }

    return { env, user, afterLogin };
  },
};
</script>

<style lang="scss" scoped></style>
