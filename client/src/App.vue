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
import { useEnvStore } from "./stores/env";
import { useCelebrityStore } from "./stores/celebrity";
import CelebrityForm from "./components/CelebrityForm.vue";
import DisplayCelebrity from "./components/DisplayCelebrity.vue";
import BottomNavbar from "./components/BottomNavbar.vue";
import RightSideNavbar from "./components/navbar/RightSideNavbar.vue";
import RegisterView from "./components/authentication/RegisterView.vue";
import LoginView from "./components/authentication/LoginView.vue";
import CelebrityDisplayItems from "./components/celebrities/DisplayItems.vue";

export default {
  name: "App",
  components: {
    CelebrityForm,
    DisplayCelebrity,
    BottomNavbar,
    RegisterView,
    RightSideNavbar,
    LoginView,
    CelebrityDisplayItems,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();
    return { env, celebrity }
  }
};
</script>
