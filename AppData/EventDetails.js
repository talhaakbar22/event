import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
  Platform,
  StatusBar, ImageBackground,
} from "react-native";
import { AuthContext } from "../config/AuthProvider";
import { Event_visitor_api, Event_visitor_response_api } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";
import Color from "../utilis/Color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";


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
              setRefreshing(!refreshing)
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
        <Loader animating={isLoading} />
        <View style={{ flex: 2 }}>
          <ImageBackground source={{ uri: item.image }} style={{height:150,width:"100%",}} imageStyle={{ borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
            <View style={{flexDirection: 'row', flex:1,justifyContent:"space-between",}}>
                <TouchableOpacity  onPress={()=>navigation.goBack()}>
                  <View style={{flexDirection:"row",flex:1,padding:20}}>
                  <Entypo color={Color.white}  size={25} name={"chevron-left"}/>
                  <Text style={{fontSize:20,color:Color.white}}>Home</Text>
                  </View>
                </TouchableOpacity>
              <View style={{flex:1}}>
            {user.role !== "admin" ?
                  event == "accepted" ?
                    <TouchableOpacity style={{ alignItems: "flex-end", justifyContent: "center" ,padding:20}} onPress={() => { userValidation() }}>
                      <Text style={{ color:Color.secondary, fontSize: 20 }}>JOIN</Text>
                    </TouchableOpacity>
                    : null
                  : null
                }
              </View>
            </View>
          </ImageBackground>
          <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh} />
          }>
          <View style={{margin:30}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={{ color:Color.primary, fontSize: 25,fontWeight:"bold" }}>{item.title}</Text>
            {user.role == "user" ?
              event !== "" && event !== undefined ?
                <Text style={{ color: "#fff", backgroundColor: event == "accepted" ? "green" : "orange", textAlign: "center", padding: 5, margin: 10, borderRadius: 5, alignSelf: 'flex-end' }}>{event}</Text>
                : null
              : null}
            </View>
          <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingVertical:5}}>
            <MaterialIcons color={Color.white}  size={25} name={"date-range"} style={{padding:10,height:45,width:45,backgroundColor:Color.primary,borderRadius:10,justifyContent:"center",alignItems:"center"}}/>
            <Text style={{paddingHorizontal:10,color:Color.lightgray,fontSize:16}}>{item.start_time}</Text>
          </View>
            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingVertical:5}}>
              <Entypo color={Color.white}  size={25} name={"location-pin"} style={{padding:10,height:45,width:45,backgroundColor:Color.secondary,borderRadius:10,justifyContent:"center",alignItems:"center"}}/>
              <Text style={{paddingHorizontal:10,color:Color.lightgray,fontSize:16}}>{item.venue}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingVertical:5}}>
              <Text style={{ color:Color.primary, fontSize: 14,paddingVertical:5,fontWeight:"bold"}}>Theme: </Text>
              <Text style={{paddingHorizontal:10,color:Color.lightgray,fontSize:14}}>{item.event_theme}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
            <Text style={{ color:Color.primary, fontSize: 20,paddingVertical:5,fontWeight:"bold"}}>Speaker: </Text>
            <Text style={{ color:Color.primary, fontSize: 18,paddingVertical:5}}> {item.speaker_name}</Text>
          </View>
            <Text style={{color:Color.lightgray,fontWeight:"bold",paddingVertical:5}}>About Event:</Text>
            <Text style={{color:Color.lightgray,paddingVertical:5}}>{item.description}</Text>
          </View>
          </ScrollView>
        </View>
          {user.role !== "admin" ?
            event !== "joined" ?
              <TouchableOpacity style={{ alignSelf:"center" }} onPress={() => { event == "pending" ? ToastAndroid.show("Your request is Pending!", ToastAndroid.LONG) : userValidation() }}>
                <Image style={{ height: 90, width: 90, alignSelf: "center", }} source={require("../Assets/Qr.png")} />
              </TouchableOpacity>
              : null
            : null
          }
    </SafeAreaView>
  );
};
export default eventdetail;
