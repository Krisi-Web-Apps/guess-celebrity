<template>
  <div
    class="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-400/20"
  >
    <div
      class="relative w-[50%] bg-white border border-gray-300 rounded shadow-md"
    >
      <x-mark-icon
        class="absolute top-2 right-2 hover:text-black/60 cursor-pointer"
        @click="$emit('close')"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
// stores
import { useEnvStore } from "../../stores/env";

// icons
import { XMarkIcon } from "../../icons";

export default {
  name: "MediumDialog",
  components: {
    // icons
    XMarkIcon,
  },
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>

<style lang="scss" scoped></style>
