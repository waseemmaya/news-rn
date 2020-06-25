import React from "react";
import * as Font from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import Routes from "./src/pages/Routes";

import { YellowBox } from "react-native";
import Loader from "./src/components/Loader";

YellowBox.ignoreWarnings(["componentWillReceiveProps"]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Loader />;
    }

    return (
      <Root>
        <Routes />
      </Root>
    );
  }
}
