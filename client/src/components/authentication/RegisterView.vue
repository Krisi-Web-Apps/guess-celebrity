<template>
  <medium-dialog v-if="env.dialogs.register" @close="env.dialogs.register = false">
    <div class="w-full p-5">
      <h1 class="text-xl text-center">Регистриране на нов потребител</h1>
    </div>
  </medium-dialog>
</template>

<script>
import MediumDialog from "../dialogs/MediumDialog.vue";
import { useEnvStore } from "../../stores/env";

export default {
  name: "RegisterView",
  components: {
    MediumDialog,
  },
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>

<style lang="scss" scoped></style>
