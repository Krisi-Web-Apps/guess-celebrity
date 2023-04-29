<template>
  <custom-dialog size="w-2/3" @close="handleClose">
    <h1 class="text-4xl text-center my-10">Познай извесната личност</h1>
    <div class="mx-auto border shadow-lg p-5">
      <display-celebrity />
      <celebrity-form />
    </div>
    <bottom-navbar />
  </custom-dialog>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

// dialogs
import { CustomDialog } from "../dialogs";

// components
import { DisplayCelebrity, BottomNavbar, CelebrityForm } from "./";

export default {
  name: "TheQuizView",
  components: {
    // dialogs
    CustomDialog,
    
    // components
    DisplayCelebrity,
    BottomNavbar,
    CelebrityForm,
  },
  setup() {
    const env = useEnvStore();

    const handleClose = () => {
      env.dialogs.theQuizView = false;
      env.navbars.rightSideNavbar = true;
    }

    return { env, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
