import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  ImageBackground,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Background from "../Assets/Background";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";
import moment from "moment";
import { FormInput } from "../utilis/Text_input";
import { Date_picker } from "../utilis/Text_input";
import { Signup_validation } from "../utilis/validation";
import { Signup_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";
var validator = require("email-validator");

const Register = ({ navigation, item }) => {

  const { data, user } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setuserConfirmPassword] = useState(null);
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [dobf, setDobF] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [errors, setErrors] = useState(null)


  const handleSubmitButton = async () => {
    setErrortext("");

    let validate = Signup_validation(userName, userEmail, userPassword, userConfirmPassword, phone, dob, cnic, country, nationality)
    if (validate.valid == false) {
      setErrors(validate.errors)
    } else {
      setErrors("")
      let body = {
        name: userName,
        email: userEmail,
        password: userPassword,
        c_password: userConfirmPassword,
        phone: phone,
        dob: dob,
        cnic: cnic,
        country: country,
        nationality: nationality
      };
      setLoading(true);
      var res = await Signup_api(body)
      var jsonData = res.data

      if (res !== "Error") {
        if (jsonData.success === true) {
          var response = jsonData.data.user
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(jsonData.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          } else {
            Toast.show(jsonData.message, Toast.LONG);
          }
          navigation.navigate("Otp", {
            id: response.id,
            email: userEmail,
          });
          setLoading(false);
          if (response.status == "pending") {
            setLoading(false);
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravityAndOffset("Status is Pending", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            } else {
              Toast.show("Status is Pending", Toast.LONG);
            }
          } else {
            setLoading(false);
            if (Platform.OS === 'android') {
              ToastAndroid.showWithGravityAndOffset("Email is already taken", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            } else {
              Toast.show("Email is already taken", Toast.LONG);
            }
          }
        }
        else{
          setLoading(false);
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset("The Email has already taken", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          } else {
            Toast.show("The Email has already taken", Toast.LONG);
          }
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset("Registration unsuccessful!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          setLoading(false);
        } else {
          Toast.show("Registration unsuccessful!", Toast.LONG);
          setLoading(false);
        }
      }
    }
  };
  const calculate_age = (dates) => {
    var today = new Date();
    var birthDate = dates.split("T")[0].split("-");
    var year = birthDate[0];
    var month = birthDate[1];
    var day = birthDate[2];

    console.log("get bod-->", birthDate); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - year;
    var m = today.getMonth() - month;
    var d = today.getDay() - day;
    if (m < 0 || (m === 0 && today.getDate() < d)) {
      age_now--;
    }
    console.log("my age", age_now);
    return age_now;
  };

  const onDateChange = async (date) => {
    setDob(date);
    let bala = await calculate_age(date);

    if (bala <= 17) {
      setDobF(false);

    } else {
      setDobF(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ImageBackground source={require("../Assets/bg.png")} style={{flex: 1}}>
        <Loader animating={loading} />
          <TouchableOpacity  onPress={()=>navigation.goBack()}>
            <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",paddingVertical: 20,margin:35}}>
            <Entypo color={Colors.white}  size={25} name={"chevron-left"}/>
            <Text style={{ flex: 5,fontSize:20,color:Colors.white}}>Register</Text>
            </View>
          </TouchableOpacity>
        <View style={{backgroundColor:"#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,flex:1}}>
          <View style={{paddingHorizontal:22,paddingTop:20}}>
            <Text style={{ color: "#33a930", fontSize: 22,fontWeight:"bold" }}>Let's Get Started</Text>
          <Text style={{ color: "#62788B", fontSize: 14, }}>Hello there, Register to continue!</Text>
          </View>
          <ScrollView>
            <View style={{ marginHorizontal: 25 }}>
              <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Name</Text>
              <FormInput
                placeholder={"Enter Name"}
                value={userName}
                placeholderTextColor="#33a930"
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(userName) => { setErrors(""), setUserName(userName) }}
                error={errors === "Please enter your name" ? "Please enter your name" : null || errors === "Name must should contain 3 letters" ? "Name must should contain 3 letters" : null}
              />
              <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Username or email</Text>
              <FormInput
                placeholder={"Email"}
                value={userEmail}
                placeholderTextColor="#33a930"
                autoCapitalize="none"
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(userEmail) => { setErrors(""), setUserEmail(userEmail) }}
                error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
              />
              <View style={{flexDirection:"row",flex:1}}>
              <View style={{flex:1,marginHorizontal:2}}>
              <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Password</Text>
              <FormInput
                placeholder={"password"}
                value={userPassword}
                placeholderTextColor="#33a930"
                secureTextEntry={true}
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(userPassword) => { setErrors(""), setUserPassword(userPassword) }}
                error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null || errors === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
              />
              </View>
              <View style={{flex:1,marginHorizontal:2}}>
                <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>ConfirmPassword</Text>
                <FormInput
                placeholder={"confirmPassword"}
                value={userConfirmPassword}
                placeholderTextColor="#33a930"
                secureTextEntry={true}
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(userConfirmPassword) => { setErrors(""), setuserConfirmPassword(userConfirmPassword) }}
                error={errors === "Please enter your confirm password" ? "Please enter your confirm password" : null || errors === "Password doesn't match" ? "Password doesn't match" : null}
              />
              </View>
              </View>
              <View style={{flexDirection:"row",flex:1}}>
                <View style={{flex:1,marginHorizontal:2}}>
                  <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Phone</Text>
                  <FormInput
                placeholder={"Phone"}
                value={phone}
                keyboardType="number-pad"
                maxLength={20}
                placeholderTextColor="#33a930"
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(phone) => { setErrors(""), setPhone(phone) }}
                error={errors === "Please Enter Your Phone Number" ? "Please Enter Your Phone Number" : null || errors === "Phone Number must should contain 11 digits" ? "Phone Number must should contain 11 digits" : null}
              />
                </View>
                <View style={{flex:1,marginHorizontal:2}}>
                  <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>CNIC</Text>
                  <FormInput
                    placeholder={"Cnic"}
                    value={cnic}
                    maxLength={25}
                    placeholderTextColor="#33a930"
                    keyboardType="number-pad"
                    style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                    onChangeText={(cnic) => { setErrors(""), setCnic(cnic) }}
                    error={errors === "Inavlid cnic number" ? "Inavlid cnic number" : null}
                  />
                </View>
              </View>
              <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>D.O.B</Text>
              <Date_picker containerStyle={{paddingHorizontal:10,backgroundColor:"rgba(124,123,123,0.12)"}} maxDate={moment().subtract(18, "years")} dob={dob} onDateChange={(dob) => { onDateChange(dob) }}
                error={errors === "Please fill your date of birth" ? "Please fill your date of birth" : null}
                  />
              <View style={{flexDirection:"row",flex:1}}>
                <View style={{flex:1,marginHorizontal:2}}>
                  <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Country</Text>
                  <FormInput
                placeholder={"Country"}
                value={country}
                maxLength={25}
                placeholderTextColor="#33a930"
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(country) => { setErrors(""), setCountry(country) }}
                error={errors === "Please enter your country" ? "Please enter your country" : null}
              />
              </View>
                <View style={{flex:1,marginHorizontal:2}}>
                  <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Nationality</Text>
                  <FormInput
                placeholder={"Nationality"}
                value={nationality}
                maxLength={25}
                placeholderTextColor="#33a930"
                style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
                onChangeText={(nationality) => { setErrors(""), setNationality(nationality) }}
                error={errors === "Please enter your nationality" ? "Please enter your nationality" : null}
              />
                </View>
              </View>
              <TouchableOpacity onPress={() => { handleSubmitButton(); }} style={{ alignItems: "center", borderRadius: 10, backgroundColor: "#FFA26B", marginVertical: 5, padding: 10, marginTop: 30 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ color: "#62788B", fontSize: 13, }}>I ' m already memeber,</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "#FFA26B", fontSize: 13, }}> login</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Register;
