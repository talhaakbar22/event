import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView, ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SmallTextGrid from "./SmallTextGrid";
import { AuthContext } from "../config/AuthProvider";
import { get_request } from "../utilis/Api/Requests";
import Loader from "../utilis/Loader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../utilis/Color";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
export const ViewEvent = ({ navigation, item }) => {

  const { user, appData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [data, setdata] = useState([]);
  const deviceHeight = Dimensions.get('screen').height;
  const deviceWidth = Dimensions.get('screen').width;
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
      <StatusBar backgroundColor={Color.primary}/>
        <Loader animating={isLoading} />
        <View style={{ backgroundColor:Color.primary, paddingVertical: 10,paddingBottom:30,borderBottomRightRadius:60,borderBottomLeftRadius:60 }}>
            <View style={{ flexDirection: "row", padding: 10, alignItems: 'center',paddingHorizontal:25 }}>
              <Fontisto color={"#fff"}  size={20} name={"nav-icon-list-a"}/>
              <View style={{ flex: 1 }}>
              </View>
              <TouchableOpacity style={{marginHorizontal:10,backgroundColor:Color.secondary,padding:6,borderRadius:20}}>
                <FontAwesome color={"#fff"}  size={20} name={"bell"}/>
              </TouchableOpacity>
              {user.role == "admin" ?
                <TouchableOpacity onPress={() => navigation.navigate("QrScanner")}>
                  <Image style={{ height: 30, width: 30 }} source={require("../Assets/qrcode.png")} />
                </TouchableOpacity>
                : null}
            </View>
        </View>
      <Text style={{ color:Color.primary, fontSize: 18,fontWeight:"bold",padding:22, }}>Upcoming Event</Text>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          {errorText == "check your internet connection." &&
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ color: "red", fontSize: 22, }}>{errorText.msg}</Text>
            </View>
          }
          {data.length > 0 ?
            <View>
              <ScrollView style={{paddingLeft:20}}>
                  <FlatList
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({item, index}) =>
                        <TouchableOpacity onPress={() => navigation.navigate("EventDetails", { item: item })} style={{alignSelf: 'flex-end',margin:5,borderRadius:12,borderWidth:2,borderColor:Color.primary}}>
                              <Image source={{ uri: item.image }} style={{width: deviceWidth / 2, height: deviceHeight / 5,borderTopLeftRadius:12,borderTopRightRadius:12}}/>
                                <View style={{flex:1}}>
                                  <View style={{flex:1}}></View>
                                  <View style={{flex:1}}></View>
                                  <View style={{flex:1,backgroundColor:Color.white,borderBottomLeftRadius:12,borderBottomRightRadius:12,paddingBottom:5}}>
                                    <Text numberOfLines={1} style={{ color:Color.primary,padding:5, fontSize: 15,fontWeight:"bold" }}>{(item.short_description).length > 25 ?(item.short_description).slice(0, 25) + "...":item.short_description}</Text>
                                      <View style={{flexDirection:"row"}}>
                                      <MaterialIcons color={Color.primary}  size={15} name={"title"}/>
                                    <Text style={{fontSize:13,color:Color.lightgray}}>{(item.title).length > 22 ?(item.title).slice(0, 22) + "...":item.title}</Text>
                                    </View>
                                      <View style={{flexDirection:"row"}}>
                                        <Entypo color={Color.primary}  size={15} name={"location-pin"}/>
                                        <Text style={{fontSize:13,color:Color.lightgray}}>{(item.venue).length>22?(item.venue).slice(0, 22) + "...":item.venue}</Text>
                                      </View>
                                    <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingHorizontal:3}}>
                                      <MaterialIcons color={Color.primary}  size={15} name={"date-range"}/>
                                      <Text>{item.start_time}</Text>
                                    </View>
                                  </View>
                                </View>
                        </TouchableOpacity>
                    }/>
                <Text style={{ color:Color.primary, fontSize: 18,fontWeight:"bold",paddingVertical:15  }}>Special Events Feature</Text>
                <View style={{backgroundColor:Color.primary,flexDirection:"row",justifyContent:"space-between",paddingHorizontal:15,borderTopLeftRadius:15,borderBottomLeftRadius:15,flex:1}}>
                  <View style={{marginTop:15,flex:1}}>
                  <Text style={{fontSize:16,color:Color.white,paddingVertical:5}}>Motivation Event</Text>
                  <Text style={{fontSize:11,color:Color.white,paddingVertical:5}}>Ldgdy hjgsdu asuyfdus fdaf uydua fgdj qdauyfLdgdy hjgsdu asuyfdus uqfda duatd</Text>
                  </View>
                  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Image source={require("../Assets/Avator.png")} style={{height:150,width:150,}}/>
                  </View>
                </View>
              </ScrollView>
            </View>
            :
            !isLoading &&
            <Text style={{ color: 'white', fontSize: 18 }}>There is no Event</Text>}
        </View>
    </SafeAreaView>
  );
};
