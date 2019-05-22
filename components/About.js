import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import styles from "../styles/aboutStyles";
import stylesMedium from "../styles/aboutStylesMedium";
import stylesLarge from "../styles/aboutStylesLarge";
import Title from "./Title";

class About extends Component {
  getSize = () => {
    return Dimensions.get("window").width < 550
      ? styles
      : Dimensions.get("window").width < 650
      ? stylesMedium
      : stylesLarge;
  };
  render() {
    // const sizeAdjustedStyles = this.getSize();
    const sizeAdjustedStyles = styles;
    return (
      <View style={sizeAdjustedStyles.container}>
        <Title />
        <View style={sizeAdjustedStyles.descriptionWrapper}>
          <ScrollView>
            <Text style={sizeAdjustedStyles.text}>
              Here are a few quick points about this app:{`\n\n`}
              {`\u2022`} Just because tipping is accepted does not mean that it
              is expected. Some tips in this app are labelled "Tipping
              Optional". It may be enough to just say "keep the change".
              {`\n\n`}
              {`\u2022`} This app calculates the minimum expected amounts.
              Rounding up is advised for great service.{`\n\n`}
              {`\u2022`}Services which cater exclusively to tourists may be
              accepting of tips even in countries which do not usually practice
              tipping. eg: tour guides.{`\n\n`}
              {`\u2022`} In most countries tipping is uncommon in rural areas.
              {`\n\n`}
              {`\u2022`} The restaurant tips in this app should not be applied
              to fast food shops.{`\n\n`}
              The information in this app is accurate to the best of my
              knowledge and is intended to be used as a quick reference. It is
              advised that you do further research. I'm always looking to
              improve this information so contact me via the 'More' tab with any
              changes I should make.
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default About;
