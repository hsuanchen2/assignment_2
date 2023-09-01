<template>
  <li>
    <toggle-switch
      @input="switching"
      :openToday="openToday"
      :index="props.index"
    />
    <date-picker :openToday="openToday" :index="props.index"></date-picker>
  </li>
  <hr />
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import ToggleSwitch from "../ui/ToggleSwitch.vue";
import DatePicker from "../ui/DatePicker.vue";
const props = defineProps(["index"]);
const openToday = ref(true);
function switching() {
  openToday.value = !openToday.value;
}
</script>
<style scoped>
h2 {
  color: red;
}

li {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
}
</style>
