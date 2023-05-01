<template>
  <ul>
    <li
      v-for="(item, index) in adminItems"
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
// stores
import { useEnvStore } from "../../../stores/env";

// icons
import { UsersIcon } from "../../../icons";

export default {
  name: "AdminItems",
  components: {
    UsersIcon,
  },
  setup() {
    const env = useEnvStore();

    const adminItems = [
      {
        name: "Потребители",
        icon: "users-icon",
        cb: () => {
          env.navbars.rightSideNavbar = false;
          env.dialogs.usersView = true;
        },
      },
    ];

    return { env, adminItems };
  },
};
</script>

<style lang="scss" scoped></style>
