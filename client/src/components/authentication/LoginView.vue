<template>
  <medium-dialog
    v-if="env.dialogs.login"
    @close="env.dialogs.login = false"
  >
    <div class="w-full p-5">
      <h1 class="text-xl text-center">Влезте в профила си</h1>
    </div>
  </medium-dialog>
</template>

<script>
import MediumDialog from "../dialogs/MediumDialog.vue";
import { useEnvStore } from "../../stores/env";

export default {
  name: "LoginView",
  components: {
    MediumDialog,
  },
  setup() {
    const env = useEnvStore();
    return { env };
  },
};
</script>

<style lang="scss" scoped></style>
