import React from "react";
import { SafeAreaView, Text, View, ImageBackground, Dimensions } from "react-native";

const Background = ({ children }) => {
  return (
    <ImageBackground source={require("../Assets/background.png")} style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, flex: 1 }}>
      <SafeAreaView style={{ flex: 1, }}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Background;
