import React, { useEffect, useContext } from "react";
import { SafeAreaView, View, Dimensions, Image } from "react-native";
import Background from "../Assets/Background";
import { AuthContext } from "../config/AuthProvider";
import ResponsiveImage from "react-native-responsive-image";
import { get_data } from "../utilis/AsyncStorage/Controller";

const Splash = ({ navigation }) => {
  var dimensions = Dimensions.get("screen");
  var width = dimensions.width;
  var height = Math.round((dimensions.width * 5) / 8);
  const { auto_login } = useContext(AuthContext);
  useEffect(() => {
    setTimeout(async () => {
      let user = await get_data("USER_ID")
      if (user == null || user == "") {
        navigation.replace("EventListing");
      } else {
        auto_login(user.user, navigation);
      }
    }, 3000);
  }, []);
  return (
    <SafeAreaView style = {{flex:1}}>
      <Background>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex:1 }}>
          <Image style = {{height: height, width: width, }} source={require("../Assets/NewLogo.png")}  />
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default Splash;
