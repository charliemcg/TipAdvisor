import { Dimensions } from "react-native";
// import colors from "../../../colors";
const height = Dimensions.get("window").height;

export default {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee"
  },
  countryRow: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    top: "20%",
    marginLeft: "3%",
    height: "15%",
    width: "94%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    elevation: 6
  },
  // flag: {
  //   position: "absolute",
  //   width: "30%",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  flag: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: "100%",
    flex: 2
  },
  // picker: {
  //   position: "absolute",
  //   width: "68%",
  //   right: 0,
  //   height: "50%",
  //   marginRight: "5%"
  // },
  flagDimensions: {
    width: height * 0.08,
    height: height * 0.08
  },
  picker: {
    height: "50%",
    alignItems: "center",
    flex: 6
  },
  tipRow: {
    flex: 5
  },
  buffer: {
    height: "9%",
    backgroundColor: "white",
    elevation: 5
  },
  input: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    elevation: 5
  },
  description: {
    flex: 5,
    marginTop: 10
  },
  errorText: {
    color: "#f00",
    fontSize: 25
  }
};
