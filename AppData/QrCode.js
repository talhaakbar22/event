import React, { useContext, useState } from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";
import { QRCode } from "react-native-custom-qr-codes";


export const QrCode = ({ route }) => {

  let event = route.params.event;
  const { user, appData } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  const URL = JSON.stringify(
    {
      user_id: user.id,
      user_email: user.email,
      user_name: user.name,
      event_id: event.id,
      // et: event.title,
      event_image: event.image,
      // es: event.speaker_name,
      // el: event.event_location,
      // Ev: event.venue,
      // est: event.start_time,
      // eet: event.end_time,
    },
  );




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <View style={{ backgroundColor: "#191919", paddingVertical: 15 }}>
          <LinearGradient colors={["#231F20", "#312A2C"]} >
            <Image source={require("../Assets/NewLogo.png")} style={{ height: 62, width: 100, alignSelf: 'center', marginVertical: 5 }} />
          </LinearGradient>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.4)", alignItems: 'center', padding: 20, alignSelf: 'center', }}>
            <QRCode content={URL} codeStyle="dot"  size={300} />
            <Text style={{ color: "#fff", fontSize: 18, paddingTop: 5, textAlign: "center" }}>{event.title}</Text>
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>{user.email}</Text>
          </View>
        </View>
      </Background>
    </SafeAreaView>
  );
};
