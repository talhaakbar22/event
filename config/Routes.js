import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Loader from "../component/Loader";
import Splash from "../AppData/Splash";
import EventDetails from "../AppData/EventDetails";
import EventListing from "../AppData/EventListing";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { QrCode } from "../AppData/QrCode";
import AuthStack from "./AuthStack";
import Login from "../AppData/Login";
import Register from "../AppData/Register";
import QRScanner from "../AppData/QrScanner";
import UpdateProfile from "../AppData/UpdateProfile";
import Otp from "../AppData/Otp";

const Stack = createStackNavigator();
const Routes = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        header: () => null,
      }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="EventListing" component={EventListing} />
        <Stack.Screen name="QrCode" component={QrCode} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="QrScanner" component={QRScanner} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;

