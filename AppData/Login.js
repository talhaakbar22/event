import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, Image, ToastAndroid, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Assets/Background";
import { AuthContext } from "../config/AuthProvider";
import { FormInput } from "../utilis/Text_input";
import { loginValidation } from "../utilis/validation";
import { Login_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";

const Login = ({ navigation }) => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { login, appData, user } = useContext(AuthContext);
  const [errors, setErrors] = useState(null)
  const [isLoading, setLoading] = useState(false);

  const handleSubmitPress = async () => {
    let validate = loginValidation(userEmail, userPassword)
    if (validate.valid == false) {
      setErrors(validate.errors)
    } else {
      setErrors("")
      let body = {
        email: userEmail,
        password: userPassword
      }
      setLoading(true);
      let response = await Login_api(body)
      if (response !== "Error") {
        if (response.data.status == true) {
          if (response.data.user.status == "block") {
            ToastAndroid.show(response.data.user.role + " is Blocked", ToastAndroid.LONG);
          } else if (response.data.user.status == "pending") {
            ToastAndroid.show("Verify OTP Code", ToastAndroid.LONG);
            navigation.navigate("Otp", {
              id: response.data.user.id,
              email: userEmail,
            });
          } else {
            login(response.data, navigation);
          }
          setLoading(false);
        } else {
          ToastAndroid.show("There is something wrong!", ToastAndroid.LONG);
          setLoading(false);
        }
      } else {
        ToastAndroid.show("There is something wrong!", ToastAndroid.LONG);
        setLoading(false);
      }

    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Loader animating={isLoading} />
        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 25 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../Assets/NewLogo.png")} style={{ height: 135, width: 210, }} />
          </View>
          <View style={{ flex: 1.5 }}>
            <View style={{ flexDirection: "row", alignSelf: "center", }}>
              <Text style={{ color: "#fff", fontSize: 32, }}>Hello !</Text>
              <Text style={{ color: "#62788B", fontSize: 32, }}> Login Here</Text>
            </View>

            <ScrollView>
              <View style={{ marginTop: 40 }}>
                <FormInput
                  placeholder={"Email"}
                  value={userEmail}
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
                  onChangeText={(userEmail) => { setErrors(""), setUserEmail(userEmail) }}
                  error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                />
                <FormInput
                  placeholder={"Password"}
                  value={userPassword}
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
                  onChangeText={(userPassword) => { setErrors(""), setUserPassword(userPassword) }}
                  error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null || errors === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
                />

                <TouchableOpacity onPress={() => { handleSubmitPress() }} style={{ alignItems: "center", borderRadius: 30, backgroundColor: "#62788B", marginVertical: 5, padding: 10, marginTop: 30 }}>
                  <Text style={{ color: "white" }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ alignItems: "center", borderRadius: 30, backgroundColor: "#62788B", marginVertical: 5, padding: 10 }}>
                  <Text style={{ color: "white" }}>Register</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
  // }
};
export default Login;
