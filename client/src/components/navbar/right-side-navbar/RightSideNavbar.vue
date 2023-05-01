<template>
  <bars-icon
    class="fixed top-2 right-2 w-[60px] h-[60px] p-4 text-white bg-primary rounded-full cursor-pointer hover:bg-white hover:text-primary transition-all"
    @click="functions.openNavbar"
    v-if="!env.navbars.rightSideNavbar"
  />
  <div
    class="fixed right-0 w-[300px] h-screen bg-white shadow-md border border-gray-300 transition-all"
    :class="hideOrShow"
  >
    <h4 class="text-xl mt-2 ml-5 mb-5">Навигация</h4>
    <navbar-items />
    <logged-in-items v-if="user.isLoggedIn" />
    <logged-out-items v-else />
    <admin-items v-if="user.me.role_as === 'admin'" />
    <x-mark-icon
      class="absolute top-2 right-2 cursor-pointer"
      @click="
        () => (env.navbars.rightSideNavbar = !env.navbars.rightSideNavbar)
      "
    />
  </div>
</template>

<script>
// stores
import { useEnvStore } from "../../../stores/env";
import { useUserStore } from "../../../stores/user";

// icons
import { BarsIcon, UserIcon, XMarkIcon } from "../../../icons";

// components
import { NavbarItems, LoggedInItems, LoggedOutItems, AdminItems } from "./";

export default {
  name: "RightSideNavbar",
  components: {
    // icons
    BarsIcon,
    UserIcon,
    XMarkIcon,

    // components
    NavbarItems,
    LoggedInItems,
    LoggedOutItems,
    AdminItems,
  },
  computed: {
    hideOrShow() {
      return this.env.navbars.rightSideNavbar ? "" : "translate-x-full";
    },
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      openNavbar: () => {
        env.navbars.rightSideNavbar = true;
      },
    };

    return { env, user, functions };
  },
};
</script>

<style lang="scss" scoped></style>
