<template>
  <custom-dialog @close="functions.handleClose">
    <div class="p-5">
      <h2 class="text-2xl text-center">Създаване на нова знаменитост</h2>
      <form></form>
    </div>
  </custom-dialog>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

// dialogs
import { CustomDialog } from "../dialogs";

export default {
  name: "CelebrityForm",
  components: {
    // dialogs
    CustomDialog,
  },
  setup() {
    const env = useEnvStore();

    const functions = {
      handleClose: () => {
        env.dialogs.celebrityForm = false;
        env.dialogs.celebrityList = true;
      },
    };

    return { env, functions };
  },
};
</script>

<style lang="scss" scoped></style>
