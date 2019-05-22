import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Linking,
  Alert,
  Dimensions,
  Platform
} from "react-native";
import styles from "../styles/contactStyles";
// import stylesLarge from "../styles/contactStylesLarge";
// import stylesMedium from "../styles/contactStylesMedium";
import email from "react-native-email";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "./Title";

const EMAIL = "violenthoboenterprises@gmail.com";
const REVIEW =
  Platform.OS === "ios"
    ? ""
    : "https://play.google.com/store/apps/details?id=com.tipadvisor"; //Need to get the link for both ios and android
const MORE_APPS =
  Platform.OS === "ios"
    ? "https://itunes.apple.com/ph/developer/charlie-mcgregor/id1463597870?mt=8"
    : "https://play.google.com/store/apps/developer?id=ViolentHoboEnterprises";

class Contact extends Component {
  handleReview = () => {
    // inform user of error
    Linking.openURL(REVIEW).catch(err =>
      console.error("An error occurred", err)
    );
  };
  handleMoreApps = () => {
    // inform user of error
    Linking.openURL(MORE_APPS).catch(err =>
      console.error("An error occurred", err)
    );
  };
  handleEmail = () => {
    // inform user of error
    email(EMAIL, {}).catch(err => console.error("An error occured", err));
  };
  getSize = () => {
    return Dimensions.get("window").width < 550
      ? styles
      : Dimensions.get("window").width < 650
      ? stylesMedium
      : stylesLarge;
  };
  getIconSize = () => {
    return Dimensions.get("window").width > 650 ? 80 : 50;
  };
  render() {
    // const sizeAdjustedStyles = styles;
    const iconSize = this.getIconSize();
    return (
      <View style={styles.container}>
        <Title />
        {/**
         *
         * Reinstate the Privacy Policy button after fixing up the Contact button
         *
         */}
        {/* <TouchableHighlight
          onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
          style={styles.privacy}
          underlayColor="#022d1a"
        >
          <Text
            style={{
              color: "#111",
              fontWeight: "bold"
            }}
          >
            Privacy
          </Text>
        </TouchableHighlight> */}
        <View style={styles.contactWrapper}>
          {/**
           *
           * Reinstate the review button after getting the link from the app store
           *
           */}

          {/* <View style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleReview()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              <View style={styles.touchWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>Leave a review</Text>
                </View>
                <View style={styles.imgWrapper}>
                  <Icon name="star-face" color={"#888"} size={iconSize} />
                </View>
              </View>
            </TouchableHighlight>
          </View> */}

          <View style={styles.touchableWrapper}>
            <TouchableHighlight
              // onPress={() => this.handleReview()}
              onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              <View style={styles.touchWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>Privacy Policy</Text>
                </View>
                <View style={styles.imgWrapper}>
                  <Icon
                    name="file-document-box"
                    color={"#888"}
                    size={iconSize}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleEmail()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              <View style={styles.touchWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>Contact</Text>
                </View>
                <View style={styles.imgWrapper}>
                  <Icon name="email-outline" color={"#888"} size={iconSize} />
                </View>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleMoreApps()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              <View style={styles.touchWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>More apps</Text>
                </View>
                <View style={styles.imgWrapper}>
                  <Icon
                    name="cellphone-arrow-down"
                    color={"#888"}
                    size={iconSize}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.credit}>
          <Text style={styles.creditText}>
            Violent Hobo Enterprises - {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    );
  }
}

export default Contact;
