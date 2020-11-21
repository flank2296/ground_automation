import moment from "moment";
import store from "../redux/store";
import { toast } from "react-toastify";
import { updateRawData } from "../redux/actions";

export const showAlert = (message, type = "default", autoClose = 2000) => {
  let toastId = store.getState().rawData.toastId;
  const toastPositionObj = {
    1: "top-right",
    2: "top-center",
    3: "bottom-right",
  };
  const statusNotificationPosition = 1;
  const positionSide = toastPositionObj[statusNotificationPosition];
  if (type === "success") {
    autoClose = 1200;
  }
  if (!toast.isActive(toastId)) {
    toastId = toast(message, {
      autoClose: autoClose,
      type,
      position: positionSide,
    });
  } else {
    toast.update(toastId, {
      render: message,
      type,
      autoClose: autoClose,
      position: positionSide,
    });
  }

  updateRawData({ toastId });
};

export const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isEmpty = (object) => {
  if (!object) return true;

  return !Object.keys(object).length;
};

export const getValueFromKey = (object, key) => {
  if (isEmpty(object)) return "";
  const splits = key.split(".");
  if (splits.length === 1) return object[splits[0]];

  return getValueFromKey(object[splits[0]], splits.slice(1).join("."));
};

export const createOptionForReactSelect = (
  list,
  labelKey,
  valueKey,
  newObject = {}
) => {
  const options = [];
  if (!list) {
    return options;
  }

  list.map((instance) => {
    options.push({
      value: getValueFromKey(instance, valueKey),
      label: getValueFromKey(instance, labelKey),
      ...instance,
      ...newObject,
    });
  });

  return options;
};

export const saveLocalStorage = (obj) => {
  let data = getLocalStorage();
  try {
    const serializedState = JSON.stringify({ ...data, ...obj });
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

export const getLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return {};
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.setItem("state", "{}");
  } catch (e) {
    // Ignore write errors;
  }
};

export const updateReduxLocalStorage = (data) => {
  updateRawData(data);
  saveLocalStorage(data);
};

export const checkIfAlreadyBooked = (slotStart, minutes, timings) => {
  let alreadyBooked = false;
  slotStart = slotStart.utc();
  timings.forEach((timing) => {
    let { start, end } = timing;
    start = start.utc();
    end = end.utc();
    if (slotStart.isBetween(start, end)) {
      alreadyBooked = true;
    }
  });
  return alreadyBooked;
};

export const prepareSlots = (minutes = 60, alreadyBookedTimings = [], selectedDate) => {
  let momentStart = null;
  let momentEnd = null;
  if(!selectedDate){
    momentStart = moment().startOf("day").add(8, "hours");
    momentEnd = moment().endOf("day");
  }
  else {
    momentStart = moment(selectedDate).startOf("day").add(8, "hours");
    momentEnd = moment(selectedDate).endOf("day");
  }
  momentStart.minutes(Math.ceil(momentStart.minutes() / 15) * 15);

  let result = [];
  let current = moment(momentStart);
  let tempCurrent = moment(momentStart);
  let currentLocalTime = moment();
  while (current <= moment(momentEnd)) {
    let _checkIfAlreadyBooked = checkIfAlreadyBooked(
      tempCurrent,
      minutes,
      alreadyBookedTimings
    );
    if (!_checkIfAlreadyBooked && current.isAfter(currentLocalTime)) {
      result.push(current.format("hh:mm a"));
    }
    current.add(parseInt(minutes), "minutes");
    tempCurrent.add(parseInt(minutes), "minutes");
  }

  return result;
};

export const prepareExtendedSlots = (slots) => {
  let extendedSlots = [];
  slots.forEach((slot, index) => {
    if (index != slots.length - 1) {
      if (
        moment(slots[index + 1], "hh:mm a").diff(
          moment(slot, "hh:mm a"),
          "minutes"
        ) <= 60
      ) {
        extendedSlots.push(`${slot} - ${slots[index + 1]}`);
      }
    }
  });
  let arr = extendedSlots.map((ele) => {
    return {
      label: ele,
      value: ele,
    };
  });
  return createOptionForReactSelect(arr, "label", "value");
};

export const convertToUtc = (date) => {
  return moment(date, "DD-MM-YYYY hh:mm a").utc().toISOString();
}

export const sortBookings = (bookings) => {
  if(!bookings.length)
    return []

  let completed = [];
  let pending = [];
  let started = [];

  bookings.forEach(booking => {
    if(booking.status == 0){
      pending.push(booking);
    }
    else if(booking.status == 1){
      started.push(booking)
    }
    else if(booking.status == 2){
      completed.push(booking)
    }
  })
  return [...started, ...pending, ...completed];
}