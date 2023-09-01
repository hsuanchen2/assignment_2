<template>
  <div class="date-picker" v-if="props.openToday">
    <select
      class="form-select"
      aria-label="Default select example"
      @change="(event) => passStartIndex(index, event)"
    >
      <option class="time-placeholder" disabled>請選擇時間</option>
      <option
        v-for="(timeSlot, index) in availableTimeSlot.filter((el, i) => {
          return i <= 47;
        })"
        :value="timeSlot.time"
        :key="index"
        :disabled="index > l1"
        :selected="index == f1"
      >
        {{ timeSlot.time }}
      </option>
    </select>
    <span>-</span>
    <select
      class="form-select"
      aria-label="Default select example"
      @change="(event) => passEndIndex(index, event)"
    >
      <option class="time-placeholder" disabled>請選擇時間</option>
      <option
        v-for="(timeSlot, index) in availableTimeSlot.filter((el, i) => {
          return i > 0;
        })"
        :value="timeSlot.time"
        :key="index"
        :disabled="index < f1"
        :selected="index == l1"
      >
        {{ timeSlot.time }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref, defineProps, watch, computed, onMounted, nextTick } from "vue";
import { useStore, mapGetters } from "vuex";
const props = defineProps(["openToday", "index"]);
const store = useStore();
const index = ref(props.index.charAt(props.index.length - 1));
const availableTimeSlot = ref([]);
const availableTimeJson = ref(null);
const startTime = ref(null);
const endTime = ref(null);

// 取出json 的供餐範圍
const firstIndexOfOne = ref(null);
const lastIndexOfOne = ref(null);
function getFirst() {
  let rawData;
  rawData = store.getters.availableTimeSlot[props.index];
  firstIndexOfOne.value = rawData.indexOf("1");
  const index = firstIndexOfOne.value;
  startTime.value = availableTimeSlot.value[index].time;
}

function getLast() {
  let rawData;
  rawData = store.getters.availableTimeSlot[props.index];
  lastIndexOfOne.value = rawData.lastIndexOf("1") + 1;
  const index = lastIndexOfOne.value;
  endTime.value = availableTimeSlot.value[index].time;
}

const test = ref(null); 



function getAvailableTime() {
  const availableTime = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let min = 0; min <= 30; min += 30) {
      if (`${hour}`.length === 1 && min === 0) {
        const obj = {};
        obj.time = `0${hour}:0${min}`;
        availableTime.push(obj);
      }
      if (`${hour}`.length === 1 && min === 30) {
        const obj = {};
        obj.time = `0${hour}:${min}`;
        availableTime.push(obj);
      }
      if (`${hour}`.length === 2 && min === 0) {
        const obj = {};
        obj.time = `${hour}:0${min}`;
        availableTime.push(obj);
      }
      if (`${hour}`.length === 2 && min === 30) {
        const obj = {};
        obj.time = `${hour}:${min}`;
        availableTime.push(obj);
      }
    }
  }
  availableTime.push({ time: "23:59" });
  availableTimeSlot.value = availableTime;
}

const JsonData = computed(() => {
  return store.getters.availableTimeSlot[props.index];
});

function passStartIndex(data, event) {
  let targetIndex;
  availableTimeSlot.value.forEach((el, index) => {
    if (event.target.value === el.time) {
      targetIndex = index;
    }
  });
  store.commit("updateAvailableStartTime", {
    index: targetIndex,
    whichDay: props.index,
  });
}

function passEndIndex(data, event) {
  let targetIndex;
  availableTimeSlot.value.forEach((el, index) => {
    if (event.target.value === el.time) {
      targetIndex = index;
    }
  });
  store.commit("updateAvailableEndTime", {
    index: targetIndex,
    whichDay: props.index,
  });
}

const f1 = computed(() => {
  return store.getters["availableTimeSlot"][props.index].indexOf("1");
});

const l1 = computed(() => {
  return store.getters["availableTimeSlot"][props.index].lastIndexOf("1");
});

getAvailableTime();
onMounted(() => {
  nextTick(() => {
    getFirst();
    getLast();
  });
});
// getJsonData();
</script>
<style scoped>
.date-picker {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 70%;
  align-items: center;
}
.form-select {
  width: 35%;
  font-size: 0.9rem;
}

.time-placeholder:hover {
  cursor: not-allowed;
}
</style>
