import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import mapImg from "../images/mapBlurred.png";
import stylesLarge from "../styles/titleStylesLarge";
import styles from "../styles/titleStyles";
import stylesMedium from "../styles/titleStylesMedium";

export default class Title extends Component {
  getSize = () => {
    return Dimensions.get("window").width < 550
      ? styles
      : Dimensions.get("window").width < 650
      ? stylesMedium
      : stylesLarge;
  };
  render() {
    // const sizeAdjustedStyles = this.getSize();
    const sizeAdjustedStyles = styles
    return (
      <View style={sizeAdjustedStyles.titleWrapper}>
        <Image
          source={mapImg}
          style={sizeAdjustedStyles.map}
          resizeMode="cover"
        />
      </View>
    );
  }
}
