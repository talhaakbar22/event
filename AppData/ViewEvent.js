import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import SmallTextGrid from "./SmallTextGrid";
import { AuthContext } from "../config/AuthProvider";
import { get_request } from "../utilis/Api/Requests";
import Loader from "../utilis/Loader";

export const ViewEvent = ({ navigation, item }) => {

  const { user, appData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [data, setdata] = useState([]);

  useEffect(async () => {
    await get_data();
  }, []);

  const get_data = async () => {
    await setLoading(true);
    let data = await get_request("/api/get-all-events");
    if (data !== "Error") {
      data.data.reverse();
      setdata(data.data);
      setLoading(false);
    } else {
      setErrorText({ msg: "check your internet connection." });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Loader animating={isLoading} />
        <View style={{ backgroundColor: "#191919", paddingVertical: 10 }}>
          <LinearGradient colors={["#231F20", "#312A2C"]}>
            <View style={{ flexDirection: "row", padding: 10, alignItems: 'center', }}>
              <View style={{ flex: 1 }}>
                <Image source={require("../Assets/NewLogo.png")} style={{ height: 62, width: 100, alignSelf: 'center' }} />
              </View>
              {user.role == "admin" ?
                <TouchableOpacity onPress={() => navigation.navigate("QrScanner")}>
                  <Image style={{ height: 40, width: 40 }} source={require("../Assets/qrcode.png")} />
                </TouchableOpacity>
                : null}
            </View>
          </LinearGradient>

          <View style={{ margin: 30, }}>
            <Text style={{ color: "#F8F8F8", fontSize: 20, }}>PLAN IT OUT</Text>
            <Text style={{ fontSize: 15, color: "#F8F8F8" }}>ALL EVENTS</Text>
          </View>

        </View>


        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          {errorText == "check your internet connection." &&
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ color: "red", fontSize: 22, }}>{errorText.msg}</Text>
            </View>
          }
          {data.length > 0 ?
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ backgroundColor: "rgba(0,0,0,0.4)", borderWidth: 1, borderColor: "#5d5d5d", margin: 10, borderRadius: 5, }} onPress={() => navigation.navigate("EventDetails", { item: item })}>
                  <View style={{ backgroundColor: "#5d5d5d", width: "94%", margin: "3%", flex: 1, height: 300 }}>
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.image }} />
                    <LinearGradient colors={["#000", "#b1b0b0", "transparent"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ height: 45, width: "100%", opacity: 0.8, position: "absolute", bottom: 0, }}>
                      <Text numberOfLines={1} style={{ color: "#fff", paddingLeft: 15, paddingTop: "1%", fontSize: 18 }}>{item.short_description}</Text>
                    </LinearGradient>
                  </View>
                  <SmallTextGrid icon="title" title={item.title} />
                  <SmallTextGrid icon="location" title={item.venue} />
                  <SmallTextGrid icon="dresscode" title={item.event_dress} />
                  <SmallTextGrid icon="time" title={item.start_time} />
                </TouchableOpacity>
              )}
            />
            :
            !isLoading &&
            <Text style={{ color: 'white', fontSize: 18 }}>There is no Event</Text>}
        </View>
      </Background>
    </SafeAreaView>
  );
};
