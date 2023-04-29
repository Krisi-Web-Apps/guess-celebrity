<template>
  <div
    class="bg-cover w-full h-screen"
    :style="{ 'background-image': 'url(' + env.currentBackground + ')' }"
  >
    <transition name="bounce">
      <the-quiz-view v-if="env.dialogs.theQuizView" />
    </transition>
    <right-side-navbar />
    <register-view />
    <login-view />
    <transition name="bounce">
      <celebrity-display-items v-if="celebrity.dialogs.all" />
    </transition>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "./stores/env";
import { useCelebrityStore } from "./stores/celebrity";

// components
import { RightSideNavbar } from "./components/navbar";
import { RegisterView, LoginView } from "./components/authentication";
import { CelebrityDisplayItems } from "./components/celebrities";
import { TheQuizView } from "./components/the-quiz";

export default {
  name: "App",
  components: {
    RightSideNavbar,
    RegisterView,
    LoginView,
    CelebrityDisplayItems,
    TheQuizView,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    env.getRandomBackground();
    return { env, celebrity };
  },
};
</script>
