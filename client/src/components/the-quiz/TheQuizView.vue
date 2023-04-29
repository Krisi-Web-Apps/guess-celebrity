<template>
  <medium-dialog @close="env.dialogs.theQuizView = false">
    <h1 class="text-4xl text-center my-10">Познай извесната личност</h1>
    <div class="mx-auto border shadow-lg p-5">
      <display-celebrity />
      <celebrity-form />
    </div>
    <bottom-navbar />
  </medium-dialog>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

// dialogs
import MediumDialog from "../dialogs/MediumDialog.vue";

// components
import { DisplayCelebrity, BottomNavbar, CelebrityForm } from "./";

export default {
  name: "TheQuizView",
  components: {
    // dialogs
    MediumDialog,
    
    // components
    DisplayCelebrity,
    BottomNavbar,
    CelebrityForm,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
};
</script>

<style lang="scss" scoped></style>
