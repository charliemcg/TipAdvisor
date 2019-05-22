import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  Text
} from "react-native";
import styles from "../styles/homeStyles";
// import stylesMedium from "../styles/homeStylesMedium";
// import stylesLarge from "../styles/homeStylesLarge";
import { connect } from "react-redux";
import Picker from "./Picker";
import { changeCountry, calculateTip, setError } from "../actions";
import ValidatedTip from "./ValidatedTip";
import DeviceInfo from "react-native-device-info";
import { countries } from "../countryList";
import AsyncStorage from "@react-native-community/async-storage";
import Title from "./Title";

class Home extends Component {
  state = {
    inputValue: null
  };

  handleChange = event => {
    this.setState({ inputValue: event });
    if (this.props.country.tips[this.props.country.selectedTipIndex] !== null) {
      if (isNaN(event)) {
        this.props.setError("NOT_A_NUMBER");
      } else if (event < 0) {
        this.props.setError("NEGATIVE");
      } else if (event === "") {
        this.props.calculateTip(0);
        this.props.setError(null);
      } else if (event >= 0) {
        this.props.calculateTip(event);
        this.props.setError(null);
      }
    }
  };

  componentWillMount() {
    //get persisted country from AsyncStorage
    this.getCountryFromDevice();
  }

  getCountryFromDevice = async () => {
    try {
      const value = await AsyncStorage.getItem("COUNTRY");
      if (value !== null) {
        this.props.changeCountry(value);
      } else {
        const countryCode = DeviceInfo.getDeviceCountry();
        for (let i = 0; i < countries.length; i++) {
          if (countryCode === countries[i].flag) {
            this.props.changeCountry(countries[i].name);
          }
        }
        if (this.props.country.name === null) {
          this.props.changeCountry(countries[0].name);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    //Detecting if country has changed
    if (nextProps.country.name !== this.props.country.name) {
      //Reset error when changing country
      if (this.props.err !== null) {
        this.props.setError(null);
        return true;
      }
      let prefixRemovedValue = this.state.inputValue;
      //Checking if currency symbol needs to be removed
      if (prefixRemovedValue !== null && isNaN(prefixRemovedValue)) {
        const { currency } = this.props.country;
        //Removing currency symbol
        if (currency.length === 1) {
          prefixRemovedValue = prefixRemovedValue.slice(1);
        } else if (currency.length === 2) {
          prefixRemovedValue = prefixRemovedValue.slice(2);
        } else if (currency.length === 3) {
          prefixRemovedValue = prefixRemovedValue.slice(3);
        } else if (currency.length === 4) {
          prefixRemovedValue = prefixRemovedValue.slice(4);
        } else {
          //error occured
          prefixRemovedValue = null;
        }
        //checking that input value is a valid number to which a currency symbol should be appended
        if (
          prefixRemovedValue !== null &&
          !isNaN(prefixRemovedValue) &&
          prefixRemovedValue > 0
        ) {
          this.setState({
            inputValue: `${nextProps.country.currency}${prefixRemovedValue}`
          });
        }
      }
    }
    return true;
  }

  // getSize = () => {
  //   return Dimensions.get("window").width < 550
  //     ? styles
  //     : Dimensions.get("window").width < 650
  //     ? stylesMedium
  //     : stylesLarge;
  // };

  render() {
    // const sizeAdjustedStyles = styles;
    const getTextInput =
      this.props.country.tips[this.props.country.selectedTipIndex] ===
      null ? null : (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={this.handleChange}
          placeholder="amount..."
          placeholderTextColor="#666"
          maxLength={8}
          onBlur={() => {
            if (!isNaN(this.state.inputValue) && this.state.inputValue > 0) {
              this.setState({
                inputValue: `${this.props.country.currency}${
                  this.state.inputValue
                }`
              });
            }
          }}
          onFocus={() => {
            let prefixRemovedValue = this.state.inputValue;
            let sliceAmount = 0;
            if (prefixRemovedValue !== null && isNaN(prefixRemovedValue)) {
              const { currency } = this.props.country;
              if (currency.length === 1) {
                sliceAmount = 1;
              } else if (currency.length === 2) {
                sliceAmount = 2;
              } else if (currency.length === 3) {
                sliceAmount = 3;
              } else if (currency.length === 4) {
                sliceAmount = 4;
              } else {
                //error occured
                prefixRemovedValue = null;
              }
              if (prefixRemovedValue !== null) {
                prefixRemovedValue = prefixRemovedValue.slice(sliceAmount);
              }
            }
            if (
              prefixRemovedValue !== null &&
              !isNaN(prefixRemovedValue) &&
              prefixRemovedValue > 0
            ) {
              this.setState({
                inputValue: this.state.inputValue.slice(sliceAmount)
              });
            } else {
              this.setState({ inputValue: null });
            }
          }}
          value={this.state.inputValue}
        />
      );

    const getBuffer =
      this.props.country.tips[this.props.country.selectedTipIndex] ===
      null ? null : this.props.country.name === null ? null : (
        <View style={styles.buffer} />
      );

    //use flat instead of shiny for ios
    const flagImgUrl =
      "https://www.countryflags.io/" +
      this.props.country.flag +
      "/shiny/64.png";

    const getCountryRow =
      this.props.country.name === null ? (
        <ActivityIndicator size="large" style={{ marginTop: 150 }} />
      ) : (
        <View style={styles.countryRow}>
          <View style={styles.flag}>
            <Image
              source={{ uri: flagImgUrl }}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.picker}>
            <Picker />
          </View>
        </View>
      );

    const getTipRow =
      this.props.country.name === null ? null : (
        <View style={styles.tipRow}>
          {getTextInput}
          <View style={styles.description}>
            <ValidatedTip />
          </View>
        </View>
      );

    return (
      <View style={styles.container}>
        <Title />
        {getBuffer}
        {getCountryRow}
        {getTipRow}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.country,
    enteredValue: state.enteredValue,
    amount: state.amount,
    err: state.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCountry: country => {
      dispatch(changeCountry(country));
    },
    calculateTip: amount => {
      dispatch(calculateTip(amount));
    },
    setError: error => {
      dispatch(setError(error));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
