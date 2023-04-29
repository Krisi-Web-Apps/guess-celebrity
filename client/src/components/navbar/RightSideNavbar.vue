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
      <!-- starts items -->
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
      <!-- ends items -->
      <!-- starts logged in items -->
      <ul v-if="!user.isLoggedIn">
        <li
          v-for="(item, index) in navbarItemsLoggedOut"
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
      <!-- ends logged in items -->
      <!-- starts logged out items -->
      <ul v-else>
        <li class="py-2 px-5 hover:bg-gray-100 cursor-pointer">
          <div class="flex">
            <user-icon />
            <span class="ml-2">Здравей, {{ user.me.email }}</span>
          </div>
        </li>
        <li
          v-for="(item, index) in navbarItemsLoggedIn"
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
      <!-- ends logged out items -->
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
// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";
import { useCelebrityStore } from "../../stores/celebrity";

// icons
import {
  BarsIcon,
  LockClosedIcon,
  LogoutIcon,
  UserIcon,
  UserPlusIcon,
  XMarkIcon,
  PlayIcon,
  CelebrityIcon,
} from "../../icons";

export default {
  name: "RightSideNavbar",
  components: {
    BarsIcon,
    LockClosedIcon,
    LogoutIcon,
    UserIcon,
    UserPlusIcon,
    XMarkIcon,
    PlayIcon,
    CelebrityIcon,
  },
  computed: {
    hideOrShow() {
      return this.env.navbars.rightSideNavbar ? "" : "translate-x-full";
    },
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();
    const celebrity = useCelebrityStore();
    const navbarItemsLoggedOut = [
      {
        name: "Регистрация",
        icon: "user-plus-icon",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.register = true;
        },
      },
      {
        name: "Вход",
        icon: "lock-closed-icon",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.login = true;
        },
      },
    ];
    const navbarItemsLoggedIn = [
      {
        name: "Изход",
        icon: "logout-icon",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          user.logout();
        },
      },
      {
        name: "Знаменитости",
        icon: "celebrity-icon",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          celebrity.dialogs.all = true;
        },
      },
    ];
    const navbarItems = [
      {
        name: "Играй",
        icon: "play-icon",
        cb: () => {
          env.dialogs.theQuizView = true;
          env.navbars.rightSideNavbar = false;
        },
      },
    ];
    return { env, user, navbarItemsLoggedOut, navbarItemsLoggedIn, navbarItems };
  },
};
</script>

<style lang="scss" scoped></style>
