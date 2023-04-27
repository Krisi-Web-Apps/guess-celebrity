<template>
  <div class="fixed right-0 top-0">
    <bars-icon
      class="fixed top-2 right-2 cursor-pointer"
      @click="
        () => (env.navbars.rightSideNavbar = !env.navbars.rightSideNavbar)
      "
      v-if="!env.navbars.rightSideNavbar"
    />
    <div
      class="w-[300px] h-screen bg-white shadow-md border border-gray-300"
      :class="hideOrShow"
    >
      <h4 class="text-xl mt-2 ml-5 mb-5">Навигация</h4>
      <ul>
        <li
          v-for="(item, index) in navbarItems"
          :key="index"
          class="py-2 px-5 hover:bg-gray-100 cursor-pointer"
          @click="() => item.cb()"
        >
          <div class="flex">
            <component :is="item.icon" />
            <span class="ml-2">{{ item.name }}</span>
          </div>
        </li>
      </ul>
      <x-mark-icon
        class="absolute top-2 right-2 cursor-pointer"
        @click="
          () => (env.navbars.rightSideNavbar = !env.navbars.rightSideNavbar)
        "
      />
    </div>
  </div>
</template>

<script>
import XMarkIcon from "../../icons/XMarkIcon.vue";
import BarsIcon from "../../icons/BarsIcon.vue";
import UserPlusIcon from "../../icons/UserPlusIcon.vue";
import LockClosedIcon from "../../icons/LockClosedIcon.vue";
import { useEnvStore } from "../../stores/env";

export default {
  name: "RightSideNavbar",
  components: {
    XMarkIcon,
    BarsIcon,
    UserPlusIcon,
    LockClosedIcon,
  },
  computed: {
    hideOrShow() {
      return this.env.navbars.rightSideNavbar ? "" : "translate-x-full";
    },
  },
  setup() {
    const env = useEnvStore();
    const navbarItems = [
      {
        name: "Регистрация",
        icon: "user-plus-icon",
        cb: () => {
          console.log("Регистрация");
          env.navbars.rightSideNavbar = false;
          env.dialogs.register = true;
        },
      },
      {
        name: "Вход",
        icon: "lock-closed-icon",
        cb: () => {
          console.log("Вход");
          env.navbars.rightSideNavbar = false;
          env.dialogs.login = true;
        },
      },
    ];
    return { env, navbarItems };
  },
};
</script>

<style lang="scss" scoped></style>
