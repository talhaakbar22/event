import React, { useContext, useState } from "react";
import { Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity } from "react-native";
import { AuthContext } from "../config/AuthProvider";
import { QRCode } from "react-native-custom-qr-codes";
import Entypo from "react-native-vector-icons/Entypo";
import Color from "../utilis/Color";


export const QrCode = ({ navigation,route }) => {

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
      <ImageBackground source={require("../Assets/Splash.png") } style={{height:150,width:"100%",}} imageStyle={{ borderBottomLeftRadius:50,borderBottomRightRadius:50}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <View style={{flexDirection:"row",flex:1,padding:20}}>
        <Entypo color={Color.white}  size={25} name={"chevron-left"}/>
        <Text style={{fontSize:20,color:Color.white}}>Details</Text>
      </View>
      </TouchableOpacity>
      </ImageBackground>
        <View style={{ flex: 1,marginTop:20 }}>
          <Image source={{ uri: event.image }} style={{height:50,width:50,borderRadius:25,borderColor:Color.secondary,borderWidth:1, alignSelf: 'center', top: 10,  zIndex: 0}}/>
          <Text style={{borderRadius:50,backgroundColor:Color.secondary,borderWidth:0.7,borderColor:Color.primary,color:Color.white,fontWeight:"bold", alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 20, top: 5, zIndex:-1}}>{user.name}</Text>
          <View style={{ backgroundColor:Color.secondary, alignItems: 'center', padding: 20, alignSelf: 'center',borderRadius:20,borderWidth:0.7,borderColor:Color.primary, zIndex: -2 }}>
            <QRCode content={URL} codeStyle="normal"  size={230} />
          </View>
          <Text style={{ color:Color.lightgray, fontSize: 14, paddingTop: 5, textAlign: "center" }}>{event.title}</Text>
          <Text style={{ color:Color.lightgray, fontSize: 14, textAlign: "center" }}>{user.email}</Text>
        </View>
    </SafeAreaView>
  );
};
