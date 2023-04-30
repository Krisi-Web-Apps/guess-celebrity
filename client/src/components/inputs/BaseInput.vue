<template>
  <div class="flex flex-col mb-5">
    <label :for="props.id">{{ props.label }}</label>
    <div class="flex items-center border border-gray-300 rounded mt-1">
      <component :is="props.icon" class="mx-2" />
      <input
        :type="props.type"
        :id="props.id"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        :placeholder="props.placeholder"
        class="w-full py-2 rounded outline-none focus:pl-2 transition-all"
      />
    </div>
  </div>
</template>

<script>
// icons
import { EnvelopeIcon, LockClosedIcon } from "../../icons";

export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "email",
      required: true,
    },
    id: {
      type: String,
      default: "email",
      required: true,
    },
    label: {
      type: String,
      default: "Base Label",
      required: true,
    },
    icon: {
      type: String,
      default: "envelope-icon",
      required: false,
    },
    placeholder: {
      type: String,
      default: "Въведете имейм адреса си...",
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["update:title"],
  components: {
    // icons
    EnvelopeIcon,
    LockClosedIcon,
  },
  setup(props) {
    return { props }
  }
};
</script>

<style lang="scss" scoped></style>
