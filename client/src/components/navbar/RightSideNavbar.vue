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
    <!-- starts items -->
    <ul>
      <li
        v-for="(item, index) in data.navbarItems"
        :key="index"
        @click="() => item.cb()"
      >
        <div
          v-if="env.dialogs[item.key] === false"
          class="py-2 px-5 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex">
            <component :is="item.icon" />
            <span class="ml-2">{{ item.name }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- ends items -->
    <!-- starts logged in items -->
    <ul v-if="!user.isLoggedIn">
      <li
        v-for="(item, index) in data.navbarItemsLoggedOut"
        :key="index"
        @click="() => item.cb()"
      >
        <div
          class="py-2 px-5 hover:bg-gray-100 cursor-pointer"
          v-if="env.dialogs[item.key] === false"
        >
          <div class="flex">
            <component :is="item.icon" />
            <span class="ml-2">{{ item.name }}</span>
          </div>
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
        v-for="(item, index) in data.navbarItemsLoggedIn"
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
    <!-- ends logged out items -->
    <x-mark-icon
      class="absolute top-2 right-2 cursor-pointer"
      @click="
        () => (env.navbars.rightSideNavbar = !env.navbars.rightSideNavbar)
      "
    />
  </div>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useEnvStore } from "../../stores/env";
import { useUserStore } from "../../stores/user";

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
    const toast = useToast();

    const data = {
      navbarItemsLoggedOut: [
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
      ],
      navbarItemsLoggedIn: [
        {
          name: "Изход",
          icon: "logout-icon",
          cb: () => {
            env.navbars.rightSideNavbar = false;
            user.logout();
            toast.success("Успешно излизане от профила.");
          },
        },
        {
          name: "Знаменитости",
          icon: "celebrity-icon",
          key: "celebrityList",
          cb: () => {
            env.navbars.rightSideNavbar = false;
            env.dialogs.celebrityList = true;
          },
        },
      ],
      navbarItems: [
        {
          name: "Играй",
          icon: "play-icon",
          key: "theQuizView",
          cb: () => {
            env.dialogs.theQuizView = true;
            env.navbars.rightSideNavbar = false;
          },
        },
      ],
    };

    const functions = {
      openNavbar: () => {
        env.navbars.rightSideNavbar = true;
      },
    };

    return { env, user, data, functions };
  },
};
</script>

<style lang="scss" scoped></style>
