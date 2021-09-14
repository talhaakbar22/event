import React from "react";
import { SafeAreaView, Text, View, ImageBackground } from "react-native";

const Background = ({ children }) => {
  return (
    <SafeAreaView>
      <ImageBackground source={require("../Assets/background.png")}
        style={{
          height: "100%",
          width: "100%",
        }}>

        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Background;
