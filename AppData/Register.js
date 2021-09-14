import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform } from "react-native";
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
      <Background>
        <Loader animating={loading} />
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 15 }}>
            <Image source={require("../Assets/NewLogo.png")} style={{ height: 100, width: 160, }} />
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
            <Text style={{ color: "white", fontSize: 32 }}> Hello !</Text>
            <Text style={{ color: "#62788B", fontSize: 32 }}> Register Here</Text>
          </View>

          <ScrollView>
            <View style={{ marginHorizontal: 25 }}>
              <FormInput
                placeholder={"User Name"}
                value={userName}
                placeholderTextColor="white"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292",height:42 }}
                onChangeText={(userName) => { setErrors(""), setUserName(userName) }}
                error={errors === "Please enter your name" ? "Please enter your name" : null || errors === "Name must should contain 3 letters" ? "Name must should contain 3 letters" : null}
              />

              <FormInput
                placeholder={"Email"}
                value={userEmail}
                placeholderTextColor="white"
                autoCapitalize="none"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292",height:42 }}
                onChangeText={(userEmail) => { setErrors(""), setUserEmail(userEmail) }}
                error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
              />

              <FormInput
                placeholder={"Password"}
                value={userPassword}
                placeholderTextColor="white"
                secureTextEntry={true}
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292",height:42 }}
                onChangeText={(userPassword) => { setErrors(""), setUserPassword(userPassword) }}
                error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null || errors === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
              />

              <FormInput
                placeholder={"Confirmed Password"}
                value={userConfirmPassword}
                placeholderTextColor="white"
                secureTextEntry={true}
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", height:42}}
                onChangeText={(userConfirmPassword) => { setErrors(""), setuserConfirmPassword(userConfirmPassword) }}
                error={errors === "Please enter your confirm password" ? "Please enter your confirm password" : null || errors === "Password doesn't match" ? "Password doesn't match" : null}
              />
              <FormInput
                placeholder={"Phone"}
                value={phone}
                keyboardType="number-pad"
                maxLength={20}
                placeholderTextColor="white"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292",height:42 }}
                onChangeText={(phone) => { setErrors(""), setPhone(phone) }}
                error={errors === "Please Enter Your Phone Number" ? "Please Enter Your Phone Number" : null || errors === "Phone Number must should contain 11 digits" ? "Phone Number must should contain 11 digits" : null}
              />

              <Date_picker maxDate={moment().subtract(18, "years")} dob={dob} onDateChange={(dob) => { onDateChange(dob) }}
                error={errors === "Please fill your date of birth" ? "Please fill your date of birth" : null}
              />
              <FormInput
                placeholder={"Cnic"}
                value={cnic}
                maxLength={25}
                placeholderTextColor="white"
                keyboardType="number-pad"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", height:42}}
                onChangeText={(cnic) => { setErrors(""), setCnic(cnic) }}
                error={errors === "Inavlid cnic number" ? "Inavlid cnic number" : null}
              />
              <FormInput
                placeholder={"Country"}
                value={country}
                maxLength={25}
                placeholderTextColor="white"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", height:42}}
                onChangeText={(country) => { setErrors(""), setCountry(country) }}
                error={errors === "Please enter your country" ? "Please enter your country" : null}
              />

              <FormInput
                placeholder={"Nationality"}
                value={nationality}
                maxLength={25}
                placeholderTextColor="white"
                style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292",height:42 }}
                onChangeText={(nationality) => { setErrors(""), setNationality(nationality) }}
                error={errors === "Please enter your nationality" ? "Please enter your nationality" : null}
              />

              <TouchableOpacity onPress={() => { handleSubmitButton(); }} style={{ justifyContent: "center", borderRadius: 30, backgroundColor: "#62788B", padding: 15, marginVertical: 15 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Registeration</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ color: "#fff", fontSize: 13, }}>I ' m already memeber,</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: "#62788B", fontSize: 13, }}> login</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default Register;
