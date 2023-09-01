import { createStore } from "vuex";
import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
import availableTime from "../data.json";
const store = createStore({
  state() {
    return {
      availableTime: availableTime,
    };
  },
  mutations: mutations,
  getters: getters,
  actions: actions,
});

export default store;
