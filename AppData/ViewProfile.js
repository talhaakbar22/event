import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { get_data } from "../utilis/AsyncStorage/Controller";

const ViewProfile = ({ navigation }) => {
  const { user, logout, login } = useContext(AuthContext);
  const [users, setUser] = useState("")

  if (user == "") {
    navigation.replace("Login")
  }

  useEffect(async () => {
    let data = await get_data("USER_ID")
    if (data !== null) {
      setUser(data.user)
    }
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <View style={{ backgroundColor: "#191919", paddingVertical: 10 }}>
          <LinearGradient colors={["#231F20", "#312A2C"]}>
            <Image source={require("../Assets/NewLogo.png")} style={{ height: 62, width: 100, alignSelf: 'center', marginVertical: 5 }} />
          </LinearGradient>
        </View>

        <ScrollView>
          <View style={{ borderWidth: 1, borderColor: "#5d5d5d", borderRadius: 25, backgroundColor: "rgba(0,0,0,0.4)", paddingVertical: 15, margin: 5, marginHorizontal: 15 }}>
            <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
              <Text style={{ margin: 15, color: "#fff" }}>{users.name}</Text>
            </View>

            <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
              <Text style={{ margin: 15, color: "#fff" }}>{users.email}</Text>
            </View>
            {user.role !== "admin" ?
              <View>
                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {users.phone} </Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {users.dob} </Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {users.cnic} </Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {users.country} </Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {users.nationality} </Text>
                </View>
              </View>
              : null
            }

            <TouchableOpacity onPress={() => { logout(navigation); }} style={{ borderRadius: 30, backgroundColor: "#62788B", margin: 5 }}>
              <Text style={{ color: "#fff", margin: 15, textAlign: "center", }}>Logout</Text>
            </TouchableOpacity>

            {user.role !== "admin" ?
              <TouchableOpacity onPress={() => { navigation.navigate("UpdateProfile"); }} style={{ borderRadius: 30, backgroundColor: "#62788B", margin: 5 }}>
                <Text style={{ color: "#fff", margin: 15, textAlign: "center", }}>Update Profile</Text>
              </TouchableOpacity>
              : null
            }
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};
export default ViewProfile;
