<template>
  <h1 class="text-4xl text-center my-10">Познай извесната личност</h1>

  <div class="container mx-auto border shadow-lg p-5">
    <display-celebrity />
    <celebrity-form />
  </div>
  <bottom-navbar />
  <right-side-navbar />
</template>

<script>
import { useEnvStore } from "./stores/env";
import CelebrityForm from "./components/CelebrityForm.vue";
import DisplayCelebrity from "./components/DisplayCelebrity.vue";
import BottomNavbar from "./components/BottomNavbar.vue";
import RightSideNavbar from "./components/navbar/RightSideNavbar.vue";

export default {
  name: "App",
  components: {
    CelebrityForm,
    DisplayCelebrity,
    BottomNavbar,
    RightSideNavbar,
  },
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>
