<template>
  <div class="fixed w-full h-screen flex justify-center items-center">
    <div
      class="absolute bg-white border border-gray-300 rounded shadow-md"
      :class="props.size"
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
  name: "CustomDialog",
  props: {
    size: {
      type: String,
      default: "w-1/2",
      required: false,
    },
  },
  components: {
    // icons
    XMarkIcon,
  },
  setup(props) {
    const env = useEnvStore();
    return { env, props };
  },
};
</script>

<style lang="scss" scoped></style>
