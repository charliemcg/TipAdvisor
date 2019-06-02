import React, { Component } from "react";
import { View, Text, Alert } from "react-native";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Splash screen</Text>
      </View>
    );
  }
}
