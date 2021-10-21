import React, { useContext, useState, useEffect } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import {
  View,
  SafeAreaView,
  Text,
  Linking,
  Alert,
  ToastAndroid,
  Image,
  ScrollView,
  Dimensions,
  Platform, ImageBackground,
} from "react-native";
import { RNCamera } from "react-native-camera";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { Attendance_api, Events_details } from "../utilis/Api/Api_controller";
import Loader from "../utilis/Loader";
import Toast from "react-native-simple-toast";

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const QRScanner = ({ }) => {
  const { user } = useContext(AuthContext);
  const [userid, setUserid] = useState("");
  const [eventid, setEventid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [speakername, setSpeakername] = useState("");
  const [venue, setVenue] = useState("");
  const [eventlocation, setEventLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [isLoading, setLoading] = useState(false);

  const ifScaned = async (e) => {
    var response_data = JSON.parse(e.data)
    if (response_data.user_id !== "" || response_data.user_id !== undefined) {
      let response = await Events_details(response_data.event_id)
      setEmail(response_data.user_email);
      setName(response_data.user_name);
      setTitle(response.data.data.title);
      setImage(response_data.event_image);
      setSpeakername(response.data.data.speaker_name);
      setVenue(response.data.data.venue);
      setEventLocation(response.data.data.event_location);
      setStartTime(response.data.data.start_time);
      setEndTime(response.data.data.end_time);
      let data = {
        user_id: response_data.user_id,
        event_id: response_data.event_id,
        event_status: "pending",
      };
      let res = await Attendance_api(data)
      if (res !== "Error") {
        setUserid(res.data);
        setEventid(res.data);
        if (res.data.success == true) {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            setLoading(false);
          } else {
            Toast.show(res.data.message, Toast.LONG);
            setLoading(false);
          }
        } else {
          console.log("gdjahd");
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
    else {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset("Failed due to scanner issue.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        setLoading(false);
      } else {
        Toast.show("Failed due to scanner issue.", Toast.LONG);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("../Assets/bg.png")} style={{flex: 1}}>
      <Loader animating={isLoading} />
        {userid ?
          <View>
            <ScrollView>
              <View style={{ flex: 1, borderWidth: 1, borderColor: "#5d5d5d", borderRadius: 25, backgroundColor: "rgba(0,0,0,0.4)", margin: 5, padding: 10 }}>
                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Name: {name} </Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Title: {title}</Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Speaker Name: {speakername}</Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Venue: {venue}</Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Location: {eventlocation}</Text>
                </View>

                <View style={{ borderRadius: 30, borderColor: "#62788B", borderWidth: 1, margin: 5 }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Time: {startTime}</Text>
                </View>

                <View style={{ alignSelf: "center", borderWidth: 1, borderColor: "#62788B", borderRadius: 30, margin: 5 }}>
                  <Image
                    style={{
                      borderWidth: 1,
                      borderRadius: 30,
                      width: width / 1.2,
                      height: height / 4,
                    }}
                    source={{ uri: image }} />
                </View>

              </View>
            </ScrollView>
          </View>
          :
          <QRCodeScanner
            onRead={ifScaned}
            flashMode={RNCamera.Constants.FlashMode.off}
            reactivate={true}
            permissionDialogMessage="Need Permission to access camera"
            reactivateTimeout={1000}
            showMarker={true}
            cameraStyle={{ height: height, width: width, justifyContent: "center", alignSelf: "center" }}
            // cameraProps={{ autoFocus: "on" }}
            markerStyle={{ borderColor: "#890021", borderRadius: 10 }}
          />
        }
      </ImageBackground>
    </SafeAreaView>
  );
};
export default QRScanner;
