import React, { useState, useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ToastAndroid, Platform } from "react-native";
import Background from "../Assets/Background";
import OtpInputs from "react-native-otp-inputs";
import { AuthContext } from "../config/AuthProvider";
import { OTP_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";

const Otp = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  let id = route.params.id;
  let email = route.params.email;

  const validateCode = async () => {
    let OtpData =
    {
      email: email,
      id: id,
      verify_code: code,
    };
    setLoading(true)
    let res = await OTP_api(OtpData)
    if (res !== "Error") {
      if (res.data.success == false) {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset("Enter correct OTP Code", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          setLoading(false);
        } else {
          Toast.show("Enter correct OTP Code", Toast.LONG);
          setLoading(false);
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset("Code verified", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          setLoading(false);
        } else {
          Toast.show("Code verified", Toast.LONG);
          setLoading(false);
        }
        navigation.navigate("Login")
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset("There is something wrong!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        setLoading(false);
      } else {
        Toast.show("There is something wrong!", Toast.LONG);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Loader animating={isLoading} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 20, color: "#fff" }}>Enter Your OTP Code</Text>
          <OtpInputs
           handleChange={(code) => { setCode(code); }}
            numberOfInputs={6}
            // defaultValue = ""
            inputContainerStyles={{ borderColor: "white", borderWidth: 1, borderRadius: 5, margin: 5 }}
            inputStyles={{ textAlign: "center", color: '#fff' }}
            style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#191919", borderRadius: 15,  alignSelf: "center", padding: 20, marginVertical: 20 }} />

          {code.length == 6 ?
            <TouchableOpacity onPress={() => { validateCode() }} style={{ backgroundColor: "#fff",  marginTop: 20,  borderRadius: 15, marginHorizontal: 25, padding: 10}}>
              <Text style={{ textAlign: "center" }}>Done</Text>
            </TouchableOpacity>
            : null}
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default Otp;
