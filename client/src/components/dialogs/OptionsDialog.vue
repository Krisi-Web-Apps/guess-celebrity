<template>
  <transition>
    <div
      class="absolute top-10 right-0 min-w-[200px] bg-white text-black border rounded shadow-md z-40"
    >
      <ul class="p-2 flex flex-col gap-2">
        <li
          v-for="(item, index) in props.options"
          :key="index"
          class="py-2 px-3 cursor-pointer rounded border"
          :class="item.classNames"
          @click="() => item.cb()"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "OptionsDialog",
  props: {
    options: {
      type: Array,
      required: false,
      default: [],
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped></style>
