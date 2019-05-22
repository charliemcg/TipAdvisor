import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableHighlight, ScrollView } from "react-native";
import styles from "../styles/validatedTipStyles";
import { calculateTip, setSelectedIndex } from "../actions";

//If tipping is optional display this text
function IsOptional(value) {
  const sizeAdjustedStyles = getSize();
  return value.country.tips[value.country.selectedTipIndex].optional ? (
    <Text style={sizeAdjustedStyles.optional}>Tipping optional</Text>
  ) : null;
}

//Inform user that the selected situation doesn't need tipping
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

//Adjusting for names which are displayed differently in the modal selector
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
  shouldComponentUpdate(nextProps) {
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
    //only show tip buttons if there are different tip types
    let tipButtons =
      tips.length <= 1
        ? null
        : tips.map((item, i) => {
            let useThisButtonStyle = styles.tipType;
            let useThisTextStyle = styles.tipButtonText;
            if (i === selectedTipIndex) {
              useThisButtonStyle = styles.selectedTipType;
              useThisTextStyle = styles.selectedTipButtonText;
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
      //inform user to only input numbers
      case "NOT_A_NUMBER":
        return (
          <View style={styles.textWrapper}>
            <Text style={styles.errorText}>Only use numbers.</Text>
          </View>
        );
      //inform user that they can't input negative numbers
      case "NEGATIVE":
        return (
          <View style={styles.textWrapper}>
            <Text style={styles.errorText}>Don't use negative numbers.</Text>
          </View>
        );
      //no error detected.
      case null:
        if (tips.length === 1 && tips[selectedTipIndex] !== null) {
          //show tip amount
          return (
            <View>
              <View style={styles.tipExtras}>
                <Text style={styles.percentage}>
                  Tip: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={styles.tipWrapper}>
                <Text style={styles.text}>
                  {currency}
                  {this.props.amount}
                </Text>
              </View>
            </View>
          );
        } else if (tips.length > 1) {
          //show tip amount along with the tip type buttons
          return (
            <View>
              <View style={styles.tipButtonWrapper}>
                <ScrollView horizontal={true}>{tipButtons}</ScrollView>
              </View>
              <View style={styles.tipExtras}>
                <Text style={styles.percentage}>
                  Tip: {tips[selectedTipIndex].percentage * 100}%
                </Text>
                <IsOptional country={this.props.country} />
              </View>
              <View style={styles.tipWrapper}>
                <CheckForZeroTip
                  currency={currency}
                  tipAmount={
                    this.props.country.tips[this.props.country.selectedTipIndex]
                      .percentage
                  }
                  amount={this.props.amount}
                />
              </View>
            </View>
          );
        } else if (
          name === "Japan" ||
          name === "Korea, South" ||
          name === "Georgia" ||
          name === "Iceland"
        ) {
          //inform user to not tip in the selected country
          return (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Do not tip in {checkName(name)}.</Text>
            </View>
          );
        } else {
          //inform user that they do not need to tip in the selected country
          return (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>
                You don't need to tip in {checkName(name)}.
              </Text>
            </View>
          );
        }
      default:
        //an error occured
        return <Text style={styles.errorText}>Something went wrong...</Text>;
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
