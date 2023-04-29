<template>
  <div
    class="bg-cover w-full h-screen"
    :style="{ 'background-image': 'url(' + env.currentBackground + ')' }"
  >
    <transition>
      <the-quiz-view v-if="env.dialogs.theQuizView" />
    </transition>
    <right-side-navbar />
    <register-view />
    <login-view />
    <transition-group>
      <celebrity-display-items v-if="env.dialogs.celebrityList" />
      <celebrity-form v-if="env.dialogs.celebrityForm" />
    </transition-group>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "./stores/env";
import { useUserStore } from "./stores/user";

// components
import { RightSideNavbar } from "./components/navbar";
import { RegisterView, LoginView } from "./components/authentication";
import { CelebrityDisplayItems, CelebrityForm } from "./components/celebrities";
import { TheQuizView } from "./components/the-quiz";

export default {
  name: "App",
  components: {
    RightSideNavbar,
    RegisterView,
    LoginView,
    CelebrityDisplayItems,
    CelebrityForm,
    TheQuizView,
},
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const token = localStorage.getItem("token");
    
    if (token) {
      user.afterLogin(token);
      user.getUser();
    } else {
      user.logout();
    }

    env.getRandomBackground();
    return { env };
  },
};
</script>
