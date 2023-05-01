<template>
  <ul>
    <li class="py-2 px-5 hover:bg-gray-100 cursor-pointer">
      <div class="flex">
        <user-icon />
        <span class="ml-2">Здравей, {{ user.me.email }}</span>
      </div>
    </li>
    <li
      v-for="(item, index) in loggedInItems"
      :key="index"
      @click="() => item.cb()"
    >
      <div class="py-2 px-5 hover:bg-gray-100 cursor-pointer">
        <div class="flex">
          <component :is="item.icon" />
          <span class="ml-2">{{ item.name }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useUserStore } from "../../../stores/user";
import { useEnvStore } from "../../../stores/env";

// icons
import { LogoutIcon, CelebrityIcon, UserIcon, UsersIcon } from "../../../icons";

export default {
  name: "LoggedInItems",
  components: {
    LogoutIcon,
    CelebrityIcon,
    UserIcon,
    UsersIcon,
  },
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    const toast = useToast();

    const loggedInItems = [
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
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.celebrityList = true;
        },
      },
    ];

    return { user, loggedInItems };
  },
};
</script>

<style lang="scss" scoped></style>
