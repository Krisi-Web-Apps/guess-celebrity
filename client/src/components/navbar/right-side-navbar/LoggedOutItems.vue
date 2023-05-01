<template>
  <ul>
    <li
      v-for="(item, index) in loggedOutItems"
      :key="index"
      @click="() => item.cb()"
    >
      <div
        v-if="env.dialogs[item.key] === false || !item.key"
        class="py-2 px-5 hover:bg-gray-100 cursor-pointer"
      >
        <div class="flex">
          <component :is="item.icon" />
          <span class="ml-2">{{ item.name }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// stores
import { useUserStore } from "../../../stores/user";
import { useEnvStore } from "../../../stores/env";

// icons
import { LockClosedIcon, UserPlusIcon, UserIcon } from "../../../icons";

export default {
  name: "LoggedOutItems",
  components: {
    LockClosedIcon,
    UserPlusIcon,
    UserIcon,
  },
  setup() {
    const user = useUserStore();
    const env = useEnvStore();

    const loggedOutItems = [
      {
        name: "Регистрация",
        icon: "user-plus-icon",
        key: "register",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.register = true;
          env.dialogs.login = false;
        },
      },
      {
        name: "Вход",
        icon: "lock-closed-icon",
        key: "login",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.login = true;
          env.dialogs.register = false;
        },
      },
    ];

    return { env, user, loggedOutItems };
  },
};
</script>

<style lang="scss" scoped></style>
