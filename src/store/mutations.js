export default {
  getJsonTime(state) {
    console.log(state.availableTime);
  },
  updateAvailableStartTime(state, payload) {
    const newJson = JSON.parse(JSON.stringify(state.availableTime));
    const whichDay = payload.whichDay;
    const index = payload.index;
    console.log(index);
    const data = newJson[whichDay];
    const newArray = data.split("");
    const indexOfLastOne = newArray.lastIndexOf("1");
    for (let i = 0; i < newArray.length; i++) {
      if (i < index) {
        newArray[i] = "0";
      }
      if (i >= index && i <= indexOfLastOne) {
        newArray[i] = "1";
      }
      if (i > indexOfLastOne) {
        newArray[i] = "0";
      }
    }
    console.log(newArray);
    const newData = newArray.join("");
    newJson[whichDay] = newData;
    state.availableTime = newJson;
    console.log(state.availableTime[whichDay]);
  },
  updateAvailableEndTime(state, payload) {
    const newJson = JSON.parse(JSON.stringify(state.availableTime));
    const whichDay = payload.whichDay;
    const index = payload.index;
    const data = newJson[whichDay];
    const newArray = data.split("");
    const indexOfFirstOne = newArray.indexOf("1");
    console.log(index);
    for (let i = 0; i < newArray.length; i++) {
      if (i < indexOfFirstOne) {
        newArray[i] = "0";
      }
      if (i >= indexOfFirstOne && i <= index) {
        newArray[i] = "1";
      }
      if (i + 1 > index) {
        newArray[i] = "0";
      }
    }
    console.log(newArray);
    const newData = newArray.join("");
    newJson[whichDay] = newData;
    state.availableTime = newJson;
    console.log(state.availableTime[whichDay]);
  },

  availableTodayToggle(state, payload) {
    const newJson = JSON.parse(JSON.stringify(state.availableTime));
    const whichDay = payload.whichDay;
    const isOpen = payload.isOpen;
    const newArray = newJson[whichDay].split("");
    console.log(newArray);
    for (let i = 0; i < newArray.length; i++) {
      if (isOpen) {
        newArray[i] = "1";
      } else if (!isOpen) {
        newArray[i] = "0";
      }
    }
    const newData = newArray.join("");
    newJson[whichDay] = newData;
    state.availableTime = newJson;
    console.log(state.availableTime);
  },
};
