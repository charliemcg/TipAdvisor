import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import styles from "../styles/validatedTipStyles";
import stylesLarge from "../styles/validatedTipStylesLarge";
import { calculateTip, setSelectedIndex } from "../actions";

function getSize() {
  return Dimensions.get("window").width > 650 ? stylesLarge : styles;
}

function IsOptional(value) {
  const sizeAdjustedStyles = getSize();
  return value.country.tips[value.country.selectedTipIndex].optional ? (
    <Text style={sizeAdjustedStyles.optional}>Tipping optional</Text>
  ) : null;
}

function CheckForZeroTip(props) {
  const sizeAdjustedStyles = getSize();
  if (props.tipAmount === 0) {
    return <Text style={sizeAdjustedStyles.text}>No need to tip.</Text>;
  }
  return (
    <Text style={sizeAdjustedStyles.text}>
      {props.currency}
      {props.amount}
    </Text>
  );
}

function checkName(name) {
  switch (name) {
    case "Congo, D.R.":
      return "D.R. Congo";
    case "Gambia, The":
      return "The Gambia";
    case "Korea, North":
      return "North Korea";
    case "Korea, South":
      return "South Korea";
    case "Sudan, South":
      return "South Sudan";
  }
  return name;
}

class ValidatedTip extends Component {
  // This method looks screwy. Check the performance
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.country.name !== this.props.country.name) {
      try {
        this.props.calculateTip(this.props.enteredValue);
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  }
  render() {
    const { name, tips, selectedTipIndex, currency } = this.props.country;
    // const sizeAdjustedStyles = getSize();
    const sizeAdjustedStyles = styles
    let tipButtons =
      tips.length <= 1
        ? null
        : tips.map((item, i) => {
            let useThisButtonStyle = sizeAdjustedStyles.tipType;
            let useThisTextStyle = sizeAdjustedStyles.tipButtonText;
            if (i === selectedTipIndex) {
              useThisButtonStyle = sizeAdjustedStyles.selectedTipType;
              useThisTextStyle = sizeAdjustedStyles.selectedTipButtonText;
            }
            return (
              <View key={i}>
                <TouchableHighlight
                  style={useThisButtonStyle}
                  onPress={() => {
                    this.props.setSelectedIndex(i);
                    this.props.calculateTip(this.props.enteredValue);
                  }}
                >
                  <Text style={useThisTextStyle}>{item.type}</Text>
                </TouchableHighlight>
              </View>
            );
          });
    switch (this.props.err) {
      case "NOT_A_NUMBER":
        return (
          <View style={sizeAdjustedStyles.textWrapper}>
            <Text style={sizeAdjustedStyles.errorText}>Only use numbers.</Text>
          </View>
        );
      case "NEGATIVE":
        return (
          <View style={sizeAdjustedStyles.textWrapper}>
            <Text style={sizeAdjustedStyles.errorText}>
              Don't use negative numbers.
            </Text>
          </View>
        );
      case null:
        if (tips.length === 1 && tips[selectedTipIndex] !== null) {
          return (
            <View>
              <View style={sizeAdjustedStyles.tipExtras}>
                <Text style={sizeAdjustedStyles.percentage}>
                  Tip: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={sizeAdjustedStyles.tipWrapper}>
                <Text style={sizeAdjustedStyles.text}>
                  {currency}
                  {this.props.amount}
                </Text>
              </View>
            </View>
          );
        } else if (tips.length > 1) {
          return (
            <View>
              <View style={sizeAdjustedStyles.tipButtonWrapper}>
                <ScrollView horizontal={true}>{tipButtons}</ScrollView>
              </View>
              <View style={sizeAdjustedStyles.tipExtras}>
                <Text style={sizeAdjustedStyles.percentage}>
                  Tip: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={sizeAdjustedStyles.tipWrapper}>
                {/* <Text style={sizeAdjustedStyles.text}> */}
                <CheckForZeroTip
                  currency={currency}
                  tipAmount={
                    this.props.country.tips[this.props.country.selectedTipIndex]
                      .percentage
                  }
                  amount={this.props.amount}
                />
                {/* {currency}
                  {this.props.amount} */}
                {/* </Text> */}
              </View>
            </View>
          );
        } else if (
          name === "Japan" ||
          name === "Korea, South" ||
          name === "Georgia" ||
          name === "Iceland"
        ) {
          return (
            <View style={sizeAdjustedStyles.textWrapper}>
              <Text style={sizeAdjustedStyles.text}>
                Do not tip in {checkName(name)}.
              </Text>
            </View>
          );
        } else {
          return (
            <View style={sizeAdjustedStyles.textWrapper}>
              <Text style={sizeAdjustedStyles.text}>
                You don't need to tip in {checkName(name)}.
              </Text>
            </View>
          );
        }
      default:
        return (
          <Text style={sizeAdjustedStyles.errorText}>
            Something went wrong...
          </Text>
        );
    }
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
    setSelectedIndex: index => {
      dispatch(setSelectedIndex(index));
    },
    calculateTip: amount => {
      dispatch(calculateTip(amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidatedTip);
