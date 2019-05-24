import React, { Component } from "react";
import { Provider } from "react-redux";
import { Platform, StatusBar, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Contact from "./components/More";
import PrivacyPolicy from "./components/PrivacyPolicy";
import About from "./components/About";
import Home from "./components/Home";
import store from "./store";

// setting the appearance of the status bar
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View
    style={{
      height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }}
  >
    <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="#022d1a"
      {...props}
    />
  </View>
);

// creating a stack navigator for navigating between the 'More' screen and the privacy policy
const ContactNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: {
      header: null
    }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: {
      title: "Privacy Policy",
      headerTintColor: "#ddd",
      headerStyle: {
        backgroundColor: "#022d1a"
      }
    }
  }
});

ContactNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  //don't want to see the tab bar on the privacy policy screen
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

// the main navigation style for this app is bottom tab
const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-outline" color={tintColor} size={20} />
        )
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="information-outline" color={tintColor} size={20} />
        )
      }
    },
    More: {
      screen: ContactNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="more" color={tintColor} size={20} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#338a3e",
      labelStyle: {
        fontSize: 15
      },
      style: {
        backgroundColor: "#fff"
      }
    }
  }
);

const Container = createAppContainer(Navigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyStatusBar />
        <Container />
      </Provider>
    );
  }
}

export default App;
