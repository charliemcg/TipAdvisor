import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Linking,
  Dimensions,
  Platform
} from "react-native";
import styles from "../styles/contactStyles";
import email from "react-native-email";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "./Title";

//Contact email
const EMAIL = "violenthoboenterprises@gmail.com";

//link to store listing
const REVIEW =
  Platform.OS === "ios"
    ? "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1464879497&mt=8"
    : "https://play.google.com/store/apps/details?id=com.tipadvisor";

//link to developer page
const MORE_APPS =
  Platform.OS === "ios"
    ? "https://itunes.apple.com/ph/developer/charlie-mcgregor/id1463597870?mt=8"
    : "https://play.google.com/store/apps/developer?id=ViolentHoboEnterprises";

class Contact extends Component {
  //go to app listing
  handleReview = () => {
    Linking.openURL(REVIEW).catch(err =>
      console.error("An error occurred", err)
    );
  };

  //go to developer page
  handleMoreApps = () => {
    Linking.openURL(MORE_APPS).catch(err =>
      console.error("An error occurred", err)
    );
  };

  //open email app and populate 'to' field with developer's email address
  handleEmail = () => {
    email(EMAIL, {}).catch(err => console.error("An error occured", err));
  };

  //setting icon size based on screen size
  getIconSize = () => {
    return Dimensions.get("window").width > 650 ? 80 : 50;
  };

  //content for each button on the screen
  getTouchContent = content => {
    return (
      <View style={styles.touchWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{content.text}</Text>
        </View>
        <View style={styles.imgWrapper}>
          <Icon
            name={content.iconName}
            color={"#888"}
            size={this.getIconSize()}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Title />
        <TouchableHighlight
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
        </TouchableHighlight>

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
              onPress={() => this.handleReview()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: "Leave a review",
                iconName: "star-face"
              })}
            </TouchableHighlight>
          </View>

          <View style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleEmail()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: "Contact",
                iconName: "email-outline"
              })}
            </TouchableHighlight>
          </View>

          <View style={styles.touchableWrapper}>
            <TouchableHighlight
              onPress={() => this.handleMoreApps()}
              underlayColor="#eee"
              style={{ borderRadius: 20 }}
            >
              {this.getTouchContent({
                text: "More apps",
                iconName: "cellphone-arrow-down"
              })}
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
