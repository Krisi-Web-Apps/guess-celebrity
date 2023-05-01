<template>
  <form>
    <base-input
      type="number"
      id="count"
      label="Количество"
      icon="list-bullet-icon"
      placeholder="Въведете бройка на знаменитостите, които искате да създадете."
      v-model:title="celebrity.multi.count"
      @input="() => celebrity.generateMultiItems(functions.showNotification)"
    />
  </form>
  <form @submit.prevent="functions.handleSubmit">
    <div
      class="border rounded shadow-md pt-5 pl-5 pr-5 mb-5"
      v-for="(item, index) in celebrity.multi.items"
      :key="index"
    >
      <p class="mb-5">Клетка: {{ index + 1 }}</p>
      <base-input
        type="text"
        :id="`famous_name_${index + 1}`"
        label="Име"
        icon="celebrity-icon"
        placeholder="Въведете името или псевдонима..."
        v-model:title="item.famous_name"
      />
      <base-input
        type="text"
        :id="`image_url_${index + 1}`"
        label="Адрес на Снимка"
        icon="photo-icon"
        placeholder="Въведете адрес на снимка..."
        v-model:title="item.image_url"
      />
    </div>
    <base-button
      v-if="celebrity.multi.count > 0"
      type="submit"
      label="Запазване на всички"
    />
  </form>
</template>

<script>
import { useToast } from "vue-toast-notification";

// stores
import { useCelebrityStore } from "../../../stores/celebrity";

// icons
import { ListBulletIcon } from "../../../icons";

// inputs
import { BaseInput } from "../../inputs";

// buttons
import { BaseButton } from "../../buttons";

export default {
  name: "MultiForm",
  components: {
    // icons
    ListBulletIcon,

    // inputs
    BaseInput,

    // buttons
    BaseButton,
  },
  setup() {
    const celebrity = useCelebrityStore();

    const toast = useToast();

    const functions = {
      showNotification: (status, message) => {
        if (status === "success") toast.success(message);
        if (status === "error") toast.error(message);
      },
      handleSubmit: () => {
        celebrity.saveItemsBulk(functions.showNotification);
      },
    };

    celebrity.generateMultiItems(functions.showNotification);

    return { celebrity, functions };
  },
};
</script>

<style lang="scss" scoped></style>
