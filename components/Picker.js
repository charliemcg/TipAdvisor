import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCountry, calculateTip } from "../actions";
import { countries } from "../countryList";
import { Picker, Alert, View, Text } from "react-native";
import styles from "../styles/pickerStyles";
import ModalSelector from "react-native-modal-selector";

class CountryPicker extends Component {
  handleChange = event => {
    this.props.changeCountry(event);
  };
  render() {
    // const pickerItems = countries.map(country => {
    // return (
    // <Picker.Item
    //   key={country.name}
    //   label={country.name}
    //   value={country.name}
    // />

    //   );
    // });
    const pickerItems = countries.map((val, i) => {
      return { key: i, label: String(val.name) };
    });
    return (
      // <Picker
      //   selectedValue={this.props.country.name}
      //   style={styles.picker}
      //   textStyle={{ fontSize: 40 }}
      //   onValueChange={value => this.handleChange(value)}
      // >
      //   {pickerItems}
      // </Picker>
      <ModalSelector
        data={pickerItems}
        initValue={this.props.country.name}
        onChange={value => this.handleChange(value.label)}
        style={{
          height: "100%",
          width: "100%"
        }}
        selectStyle={{
          height: "100%",
          justifyContent: "center"
        }}
        selectTextStyle={{ fontSize: 15 }}
        optionTextStyle={{ color: "#338a3e" }}
      />
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPicker);
