import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCountry, calculateTip } from "../../actions";
import { countries } from "../../countryList";
import ModalSelector from "react-native-modal-selector";
import styles from "./styles";

class CountryPicker extends Component {
  //country was changed
  handleChange = event => {
    this.props.changeCountry(event);
  };

  render() {
    //prepare the list of countries to be displayed in the modal selector
    const pickerItems = countries.map((val, i) => {
      return { key: i, label: String(val.name) };
    });

    return (
      <ModalSelector
        data={pickerItems}
        initValue={this.props.country.name}
        onChange={value => this.handleChange(value.label)}
        style={styles.style}
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        optionTextStyle={styles.optionTextStyle}
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
