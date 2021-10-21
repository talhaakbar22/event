import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import Background from "../Assets/Background";
import { AuthContext } from "../config/AuthProvider";
import { FormInput } from "../utilis/Text_input";
import { loginValidation } from "../utilis/validation";
import { Login_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Entypo from "react-native-vector-icons/Entypo";

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
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravityAndOffset(response.data.user.role + " is Blocked", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
              setLoading(false);
            } else {
              Toast.show(response.data.user.role + " is Blocked", Toast.LONG);
              setLoading(false);
            }
          } else if (response.data.user.status == "pending") {
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravityAndOffset("Verify OTP Code", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            } else {
              Toast.show("Verify OTP Code", Toast.LONG);
            }
            navigation.navigate("Otp", {
              id: response.data.user.id,
              email: userEmail,
            });
          } else {
            login(response.data, navigation);
          }
          setLoading(false);
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset("There is something wrong!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            setLoading(false);
          } else {
            Toast.show("There is something wrong!", Toast.LONG);
            setLoading(false);
          }
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
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../Assets/bg.png")} style={{flex: 1}}>
        <Loader animating={isLoading} />
        <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",paddingVertical: 20,margin:35}}>
          <Text style={{ flex: 5,fontSize:20,color:Colors.white}}>Login</Text>
        </View>
        <View style={{backgroundColor:"#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,flex:1}}>
        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 25 }}>
          <View style={{ flex: 1.5,marginTop:20 }}>
              <Text style={{ color: "#33a930", fontSize: 22,fontWeight:"bold" }}>Let</Text>
              <Text style={{ color: "#62788B", fontSize: 14, }}>Hello there, sign in to continue!</Text>
            <ScrollView>
              <View style={{ marginTop: 40 }}>
                <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold" }}>Username or email</Text>
                <FormInput
                  placeholder={"Enter email"}
                  value={userEmail}
                  placeholderTextColor="#33a930"
                  keyboardType="email-address"
                  style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,marginTop:10,marginBottom:16}}
                  onChangeText={(userEmail) => { setErrors(""), setUserEmail(userEmail) }}
                  error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                />
                <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold" }}>Username or email</Text>
                <FormInput
                  placeholder={"Password"}
                  value={userPassword}
                  placeholderTextColor="#33a930"
                  secureTextEntry={true}
                  style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,marginTop:10,marginBottom:16}}
                  onChangeText={(userPassword) => { setErrors(""), setUserPassword(userPassword) }}
                  error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null || errors === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
                />
                <TouchableOpacity onPress={() => { handleSubmitPress() }} style={{ alignItems: "center", borderRadius: 10, backgroundColor: "#FFA26B", marginVertical: 5, padding: 10, marginTop: 30 }}>
                  <Text style={{ color: "white" }}>Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
          <View style={{flexDirection:"row",justifyContent:"center",bottom:10}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#FFA26B",fontWeight:"bold" }}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Login;
