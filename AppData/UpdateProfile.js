import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import Background from "../Assets/Background";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { FormInput, Date_picker } from "../utilis/Text_input";
import { updateValidation } from "../utilis/validation";
import { Update_profile_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import { get_data, save_data } from "../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "../utilis/Color";

const UpdateProfile = ({navigation}) => {
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
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset("Info updated successfully !", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          } else {
            Toast.show("Info updated successfully !", Toast.LONG);
          }
          setLoading(false);
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset("Updated successfully !", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          } else {
            Toast.show("Updated successfully !", Toast.LONG);
          }
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
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravityAndOffset("There is something wrong!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
          Toast.show("There is something wrong!", Toast.LONG);
        }
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../Assets/bg.png")} style={{flex: 1}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",paddingVertical: 20,margin:35}}>
            <Entypo color={Colors.white}  size={25} name={"chevron-left"}/>
              <Text style={{ flex: 5,fontSize:20,color:Colors.white}}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        <View style={{backgroundColor:"#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,flex:1,padding:20}}>
          <ScrollView>
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Username</Text>
            <FormInput
              placeholder={"Name"}
              editable={false}
              value={name}
              placeholderTextColor="white"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Email</Text>
            <FormInput
              placeholder={"Email"}
              value={email}
              editable={false}
              placeholderTextColor="white"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Phone #</Text>
            <FormInput
              placeholder={"Phone"}
              value={phone}
              maxLength={11}
              placeholderTextColor="white"
              keyboardType="number-pad"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
              onChangeText={(phone) => { setErrors(""), setPhone(phone) }}
              error={errors === "Please Enter Your Phone Number" ? "Please Enter Your Phone Number" : null || errors === "Please Enter Your Valid Phone Number" ? "Please Enter Your Valid Phone Number" : null}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>D.O.B</Text>
            <Date_picker containerStyle={{paddingHorizontal:10,backgroundColor:"rgba(124,123,123,0.12)",borderRadius:20}} dob={dob} onDateChange={(dob) => { setDob(dob) }} maxDate={moment().subtract(18, "years")}
              error={errors === "Please fill your date of birth" ? "Please fill your date of birth" : null}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>CNIC</Text>
            <FormInput
              placeholder={"Cnic"}
              value={cnic}
              maxLength={25}
              editable={false}
              placeholderTextColor="white"
              keyboardType="number-pad"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
              // onChangeText={(cnic) => { setErrors(""), setCnic(cnic) }}
              error={errors === "Inavlid cnic number" ? "Inavlid cnic number" : null}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Country</Text>
            <FormInput
              placeholder={"Country"}
              value={country}
              maxLength={25}
              placeholderTextColor="white"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
              onChangeText={(country) => { setErrors(""), setCountry(country) }}
              error={errors === "Please enter your country" ? "Please enter your country" : null}
            />
            <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Nationality</Text>
            <FormInput
              placeholder={"Nationality"}
              value={nationality}
              maxLength={25}
              placeholderTextColor="white"
              style={{color: "#33a930",height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}
              onChangeText={(nationality) => { setErrors(""), setNationality(nationality) }}
              error={errors === "Please enter your nationality" ? "Please enter your nationality" : null}
            />

            <TouchableOpacity onPress={() => { handleSubmitButton() }} style={{ alignItems: "center", borderRadius: 10, backgroundColor:Color.secondary, marginVertical: 10, padding: 10,}}>
              <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
            </TouchableOpacity>

        </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default UpdateProfile;
