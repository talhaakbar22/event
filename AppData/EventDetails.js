import React, { useContext, useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image, RefreshControl, useWindowDimensions, ScrollView, ToastAndroid,Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Background from "../Assets/Background";
import SmallTextGrid from "./SmallTextGrid";
import { AuthContext } from "../config/AuthProvider";
import { Event_visitor_api, Event_visitor_response_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const eventdetail = ({ navigation, route }) => {
  const contentWidth = useWindowDimensions().width;
  const [refreshing, setRefreshing] = React.useState(false);
  const [processing, setProcessing] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    check_event()
  }, []);

  let item = route.params.item;
  const { user } = useContext(AuthContext);

  const check_event = async () => {
    if (user.role == "user") {
      setLoading(true);
      let response = await Event_visitor_api({ user_id: user.id, event_id: item.id })
      if (response !== "Error") {
        if (response.data.message == true) {
          setEvent(response.data.data.event_status);
          setLoading(false)
        } else {
          setEvent("");
          setLoading(false)
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

  const userValidation = async () => {
    if (user == "") {
      navigation.navigate("Login");
    } else {
      if (user.role == "user") {
        setLoading(true);
        let response = await Event_visitor_api({ user_id: user.id, event_id: item.id })
        if (response !== "Error") {
          if (response.data.message == false) {
            let response = await Event_visitor_response_api({ user_id: user.id, event_id: item.id, visiting_status: "pending", })
            if (response.data.message == true) {
              if (Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset("Request Sent!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setLoading(false);
              } else {
                Toast.show("Request Sent!", Toast.LONG);
                setLoading(false);
              }
              setEvent(response.data.data.event_status);
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
            if (response.data.data.event_status == "accepted") {
              setLoading(false)
              navigation.navigate("QrCode", { event: item });

            } else if (response.data.data.event_status == "pending") {
              setEvent("pending");
              setLoading(false)
            }
            else {
              setEvent("");
              if (Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(response.data.data.event_status, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setLoading(false);
              } else {
                Toast.show(response.data.data.event_status, Toast.LONG);
                setLoading(false);
              }
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
    }
  };
  const onRefresh = React.useCallback(() => {
    setProcessing(false);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Loader animating={isLoading} />
        <View style={{ flex: 2 }}>
          <View style={{ backgroundColor: "#191919", paddingVertical: 10 }}>
            <LinearGradient colors={["#231F20", "#312A2C"]} >
              <View style={{ padding: 10, flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Image source={require("../Assets/NewLogo.png")} style={{ height: 62, width: 100 }} />
                </View>
                {user.role !== "admin" ?
                  event == "accepted" ?
                    <TouchableOpacity style={{ alignItems: "flex-end", justifyContent: "center" }} onPress={() => { userValidation() }}>
                      <Text style={{ color: "#fff", fontSize: 20 }}>JOIN</Text>
                    </TouchableOpacity>
                    : null
                  : null
                }
              </View>
            </LinearGradient>
          </View>
          <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.4)", borderWidth: 1, borderColor: "#5d5d5d", margin: 10, flex: 1, padding: 10, borderRadius: 5, }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Image source={{ uri: item.image }} style={{ height: 200 }} />
            <View style={{ backgroundColor: "#191919" }}>
              <Text style={{ fontSize: 24, textAlign: 'center', color: "#FEFEFE", marginTop: 10 }}>{item.title}</Text>
              <SmallTextGrid icon="title" title={item.speaker_name} />
              <SmallTextGrid icon="theme" title={item.event_theme} />
              <SmallTextGrid icon="location" title={item.venue} />
              {user.role == "user" ?
                event !== "" && event !== undefined ? <Text style={{ color: "#fff", backgroundColor: event == "accepted" ? "green" : "orange", textAlign: "center", padding: 5, margin: 10, borderRadius: 5, alignSelf: 'flex-end' }}>{event}</Text>
                  : null
                : null}
            </View>
            <Text style={{ color: "#fff",  margin: 15, marginVertical: 20}}>{item.description}</Text>
          </ScrollView>
        </View>
        {user.role !== "admin" ?
          event !== "joined" ?
            <TouchableOpacity style={{ top: 45, }} onPress={() => { event == "pending" ? ToastAndroid.show("Your request is Pending!", ToastAndroid.LONG) : userValidation() }}>
              <Image style={{ height: 90, width: 90, alignSelf: "center", }} source={require("../Assets/Qr.png")} />
            </TouchableOpacity>
            : null
          : null
        }
        <View style={{ backgroundColor: "#fff5", borderTopLeftRadius: 38, borderTopRightRadius: 38, flex: 0.2 }} />
      </Background>
    </SafeAreaView>
  );
};
export default eventdetail;
