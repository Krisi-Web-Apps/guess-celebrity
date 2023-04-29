<template>
  <custom-dialog @close="handleClose">
    <div class="p-5">
        <h2 class="text-2xl text-center">Създаване на нова знаменитост</h2>
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

    const handleClose = () => {
        env.dialogs.celebrityForm = false;
        env.dialogs.celebrityList = true;
    }

    return { env, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
