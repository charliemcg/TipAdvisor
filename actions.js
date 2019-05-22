import { Alert } from "react-native";

export function changeCountry(country) {
  return {
    type: "CHANGE_COUNTRY",
    payload: country
  };
}

export function calculateTip(amount) {
  return {
    type: "CALCULATE_TIP",
    payload: amount
  };
}

export function setSelectedIndex(index) {
  return {
    type: "SET_INDEX",
    payload: index
  };
}

export function setError(error) {
  return {
    type: "SET_ERROR",
    payload: error
  };
}
