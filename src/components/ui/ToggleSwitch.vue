<template>
  <div class="form-check form-switch">
    <p>{{ days[index] }}</p>
    <input
      class="form-check-input custom-toggle"
      type="checkbox"
      role="switch"
      id="flexSwitchCheckChecked"
      @change="changeJsonData"
      checked
      v-model="openToday"
    />
    <label class="form-check-label">{{
      openToday ? "本日供餐" : "本日不供餐"
    }}</label>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["openToday", "index"]);
const openToday = ref(props.openToday);
const index = ref(props.index.charAt(props.index.length - 1));
const days = ref([
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]);

function changeJsonData(open) {
  console.log(openToday.value);
  const data = {};
  data.whichDay = props.index;
  data.isOpen = openToday.value;
  store.commit("availableTodayToggle", data);
}
</script>
<style scoped>
.form-check-input:hover {
  cursor: pointer;
}

.custom-toggle {
  width: 4rem;
  height: 25px;
}

.form-check {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 35%;
}

.form-check-label {
  font-size: 0.9rem;
  padding-top: 3px;
}

.form-check p {
  margin: 0;
}
</style>
