<template>
  <h1 class="text-4xl text-center my-10">Познай извесната личност</h1>

  <div class="container mx-auto border shadow-lg p-5">
    <display-celebrity />
    <celebrity-form />
  </div>
  <bottom-navbar />
  <right-side-navbar />
  <register-view />
  <login-view />
  <celebrity-display-items v-if="celebrity.dialogs.all" />
</template>

<script>
// stores
import { useEnvStore } from "./stores/env";
import { useCelebrityStore } from "./stores/celebrity";

// components
import { RightSideNavbar } from "./components/navbar";
import { RegisterView, LoginView } from "./components/authentication";
import { CelebrityDisplayItems } from "./components/celebrities";
import { DisplayCelebrity, BottomNavbar, CelebrityForm } from "./components/the-quiz";

export default {
  name: "App",
  components: {
    RightSideNavbar,
    RegisterView,
    LoginView,
    CelebrityDisplayItems,
    DisplayCelebrity,
    BottomNavbar,
    CelebrityForm,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    return { env, celebrity }
  }
};
</script>
