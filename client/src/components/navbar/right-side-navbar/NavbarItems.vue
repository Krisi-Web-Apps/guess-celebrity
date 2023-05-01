<template>
  <ul>
    <li
      v-for="(item, index) in navbarItems"
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
import { PlayIcon } from "../../../icons";

export default {
  name: "NavbarItems",
  components: {
    // icons
    PlayIcon
  },
  setup() {
    const env = useEnvStore();

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

    return { env, navbarItems };
  },
};
</script>

<style lang="scss" scoped></style>
