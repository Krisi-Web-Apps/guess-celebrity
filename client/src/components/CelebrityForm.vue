<template>
  <form>
    <div class="flex flex-col">
      <label for="famous_name">Име</label>
      <input
        type="text"
        placeholder="Въведете името, с което е известна знаменитостта..."
        class="form-control"
        autofocus
      />
    </div>
    <div>
      <button class="primary-btn mt-4">Готово</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CelebrityForm",
};
</script>

<style lang="scss" scoped></style>
