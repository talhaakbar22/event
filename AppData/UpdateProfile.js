import React, { useState, useContext, useEffect } from "react";
import { Text, SafeAreaView, View, Image, ToastAndroid, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Assets/Background";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { FormInput, Date_picker } from "../utilis/Text_input";
import { updateValidation } from "../utilis/validation";
import { Update_profile_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import { get_data, save_data } from "../utilis/AsyncStorage/Controller";

const UpdateProfile = () => {
  const { user, login } = useContext(AuthContext);

  const [id, setID] = useState(user["id"]);
  const [name, setName] = useState(user["name"]);
  const [email, setEmail] = useState(user["email"]);
  const [phone, setPhone] = useState(user["phone"]);
  const [dob, setDob] = useState(user["dob"]);
  const [cnic, setCnic] = useState(user["cnic"]);
  const [country, setCountry] = useState(user["country"]);
  const [nationality, setNationality] = useState(user["nationality"]);
  const [errors, setErrors] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [users, setUser] = useState("")
  // var data =  get_data("USER_ID")

  useEffect(async () => {
    let data = await get_data("USER_ID")
    if (data !== null) {
      setUser(data)
    }

  }, [])

  const handleSubmitButton = async () => {
    let validate = updateValidation(phone, dob, cnic, country, nationality)
    if (validate.valid == false) {
      setErrors(validate.errors)
    } else {
      setErrors("")
      let body = {
        id: id,
        name: name,
        phone: phone,
        dob: dob,
        email: email,
        cnic: cnic,
        country: country,
        nationality: nationality
      }
      setLoading(true);
      let response = await Update_profile_api(body)
      if (response !== "Error") {
        if (response.data == true) {
          ToastAndroid.show("Info updated successfully !", ToastAndroid.LONG);
          setLoading(false);
        } else {
          ToastAndroid.show("Updated successfully !", ToastAndroid.LONG);
          setCountry(country);
          setNationality(nationality);
          setDob(dob);
          setPhone(phone)
          var data = users
          data.user.nationality = nationality;
          data.user.country = country;
          data.user.phone = phone;
          data.user.dob = dob
          await save_data("USER_ID", users)
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
        <View style={{ backgroundColor: "#191919", paddingVertical: 10 }}>
          <LinearGradient colors={["#231F20", "#312A2C"]}>
            <Image source={require("../Assets/NewLogo.png")} style={{ height: 62, width: 100, alignSelf: 'center', marginVertical: 5 }} />
          </LinearGradient>
        </View>

        <ScrollView>
          <View style={{ borderWidth: 1, borderColor: "#5d5d5d", marginTop: 5, borderRadius: 25, backgroundColor: "rgba(0,0,0,0.4)", paddingHorizontal: 25, paddingVertical: 15 }}>
            <FormInput
              placeholder={"Name"}
              editable={false}
              value={name}
              placeholderTextColor="white"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
            />
            <FormInput
              placeholder={"Email"}
              value={email}
              editable={false}
              placeholderTextColor="white"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
            />

            <FormInput
              placeholder={"Phone"}
              value={phone}
              maxLength={11}
              placeholderTextColor="white"
              keyboardType="number-pad"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
              onChangeText={(phone) => { setErrors(""), setPhone(phone) }}
              error={errors === "Please Enter Your Phone Number" ? "Please Enter Your Phone Number" : null || errors === "Please Enter Your Valid Phone Number" ? "Please Enter Your Valid Phone Number" : null}
            />

            <Date_picker dob={dob} onDateChange={(dob) => { setDob(dob) }} maxDate={moment().subtract(18, "years")}
              error={errors === "Please fill your date of birth" ? "Please fill your date of birth" : null}
            />

            <FormInput
              placeholder={"Cnic"}
              value={cnic}
              maxLength={25}
              editable={false}
              placeholderTextColor="white"
              keyboardType="number-pad"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
              // onChangeText={(cnic) => { setErrors(""), setCnic(cnic) }}
              error={errors === "Inavlid cnic number" ? "Inavlid cnic number" : null}
            />
            <FormInput
              placeholder={"Country"}
              value={country}
              maxLength={25}
              placeholderTextColor="white"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
              onChangeText={(country) => { setErrors(""), setCountry(country) }}
              error={errors === "Please enter your country" ? "Please enter your country" : null}
            />

            <FormInput
              placeholder={"Nationality"}
              value={nationality}
              maxLength={25}
              placeholderTextColor="white"
              style={{ borderBottomWidth: 1, color: "#fff", borderColor: "#989292", }}
              onChangeText={(nationality) => { setErrors(""), setNationality(nationality) }}
              error={errors === "Please enter your nationality" ? "Please enter your nationality" : null}
            />

            <TouchableOpacity onPress={() => { handleSubmitButton() }}
              style={{ height: 50, width: "70%", margin: 20, justifyContent: "center", alignSelf: "center", borderRadius: 30, backgroundColor: "#62788B", }}>
              <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};
export default UpdateProfile;
