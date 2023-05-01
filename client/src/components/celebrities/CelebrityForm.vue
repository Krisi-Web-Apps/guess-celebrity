<template>
  <custom-dialog @close="functions.handleClose" size="w-5/6 h-5/6">
    <div class="w-full h-full p-5 overflow-y-scroll">
      <h2 class="text-2xl text-center">
        {{
          !celebrity.item.id
            ? "Създаване на нова знаменитост"
            : "Редактиране на знаменитост"
        }}
      </h2>
      <div class="py-5 flex items-center">
        <input type="checkbox" id="multi" class="checkbox" v-model="celebrity.item.multi">
        <label for="multi" class="pl-2">Създаване на много</label>
      </div>
      <single-form v-if="!celebrity.item.multi" />
      <multi-form v-else />
    </div>
  </custom-dialog>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";
import { useCelebrityStore } from "../../stores/celebrity";

// dialogs
import { CustomDialog } from "../dialogs";

// buttons
import { BaseButton } from "../buttons";

// components
import { SingleForm, MultiForm } from "./forms";

export default {
  name: "CelebrityForm",
  components: {
    // dialogs
    CustomDialog,

    // buttons
    BaseButton,

    // components
    SingleForm,
    MultiForm,
  },
  setup() {
    const env = useEnvStore();
    const celebrity = useCelebrityStore();

    const functions = {
      handleClose: () => {
        env.dialogs.celebrityForm = false;
        env.dialogs.celebrityList = true;
      },
    };

    return { env, celebrity, functions };
  },
};
</script>

<style lang="scss" scoped></style>
