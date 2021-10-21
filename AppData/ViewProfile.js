import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { get_data } from "../utilis/AsyncStorage/Controller";
import Entypo from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "../utilis/Color";

const ViewProfile = ({ navigation }) => {
  const { user, logout, login } = useContext(AuthContext);
  const [users, setUser] = useState("")

  if (user == "") {
    navigation.replace("Login")
  }

  useEffect(async () => {
    let data = await get_data("USER_ID")
    console.log(data);
    if (data !== null) {
      setUser(data.user)
    }
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../Assets/bg.png")} style={{flex: 1}}>
          <TouchableOpacity  onPress={()=>navigation.goBack()}>
            <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center",paddingVertical: 20,margin:35}}>
            <Entypo color={Colors.white}  size={25} name={"chevron-left"}/>
            <Text style={{ flex: 5,fontSize:20,color:Colors.white}}>Profile</Text>
            </View>
          </TouchableOpacity>
        <View style={{backgroundColor:"#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,flex:1,padding:20}}>
        <ScrollView>
          <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Username</Text>
          <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
              <Text style={{ margin: 15, color:Color.primary,fontWeight:"bold" }}>{users.name}</Text>
            </View>
          <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Email</Text>
          <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
              <Text style={{ margin: 15, color:Color.primary,fontWeight:"bold" }}>{users.email}</Text>
            </View>
            {user.role !== "admin" ?
              <View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",}}>
                <View style={{flex:1,marginHorizontal:2}}>
                <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Phone #</Text>
                <View  style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
                  <Text style={{ margin: 15, color:Color.primary,fontWeight:"bold" }}> {users.phone} </Text>
                </View>
                </View >
                <View style={{flex:1,marginHorizontal:2}}>
                  <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>CNIC</Text>
                  <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
                  <Text style={{ margin: 15, color:Color.primary,fontWeight:"bold" }}> {users.cnic} </Text>
                </View>
                </View>
                </View>
                <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>CNIC</Text>
                <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
                  <Text style={{ margin: 15, color:Color.primary,fontWeight:"bold" }}> {users.dob} </Text>
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",}}>
                  <View style={{flex:1,marginHorizontal:2}}>
                    <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Country</Text>
                <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
                  <Text style={{ margin: 10, color:Color.primary,fontWeight:"bold" }}> {users.country} </Text>
                </View>
                  </View >
                  <View style={{flex:1,marginHorizontal:2}}>
                    <Text style={{ color: "#989da1", fontSize: 14,fontWeight:"bold",marginVertical:10}}>Nationality</Text>
                <View style={{color:Color.primary,height:45,fontWeight:"bold",backgroundColor:"rgba(124,123,123,0.12)",paddingLeft:15,borderRadius:20,}}>
                  <Text style={{margin:10,color:Color.primary,fontWeight:"bold" }}>{users.nationality} </Text>
                </View>
                  </View>
              </View>
              </View>
              : null
            }

            <TouchableOpacity onPress={() => { logout(navigation); }} style={{ alignItems: "center", borderRadius: 10, backgroundColor:Color.secondary, marginVertical: 5, padding: 10,marginTop:15}}>
              <Text style={{ color: "#fff", textAlign: "center", }}>Logout</Text>
            </TouchableOpacity>

            {user.role !== "admin" ?
              <TouchableOpacity onPress={() => { navigation.navigate("UpdateProfile"); }} style={{ alignItems: "center", borderRadius: 10, backgroundColor:Color.primary, marginVertical: 5, padding: 10,}}>
                <Text style={{ color: "#fff", textAlign: "center", }}>Update Profile</Text>
              </TouchableOpacity>
              : null
            }
        </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ViewProfile;
