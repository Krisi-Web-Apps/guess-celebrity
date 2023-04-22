<template>
  <h1 class="text-4xl text-center my-10">Познай извесната личност</h1>

  <div class="container mx-auto border shadow-lg p-5">
    <display-celebrity />
    <celebrity-form />
  </div>
  <bottom-navbar />
</template>

<script>
import CelebrityForm from "./components/CelebrityForm.vue";
import DisplayCelebrity from "./components/DisplayCelebrity.vue";
import BottomNavbar from "./components/BottomNavbar.vue";

export default {
  name: "App",
  components: {
    CelebrityForm,
    DisplayCelebrity,
    BottomNavbar,
  },
};
</script>
