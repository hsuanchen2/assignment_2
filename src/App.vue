<template>
  <div class="main-container">
    <opening-time
      v-for="(data, index) in testData"
      :index="index"
      :key="index"
    ></opening-time>
  </div>
</template>
<script setup>
import OpeningTime from "./components/pages/OpeningTime.vue";
import data from "../src/data.json";
import { ref, provide } from "vue";
const testData = ref(data);
</script>

<style scoped>
.main-container {
  max-width: 1000px;
  margin: 50px auto;
  box-sizing: border-box;
}
</style>
