<template>
  <div>
    <button :type="props.type" @click="$emit('click')" class="primary-btn">
      {{ props.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "botton",
      required: false,
    },
    label: {
      type: String,
      default: "Base Button",
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped></style>
