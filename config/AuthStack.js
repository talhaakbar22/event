import React from "react";
import Splash from "../AppData/Splash";
import Register from "../AppData/Register";
import Login from "../AppData/Login";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator   initialRouteName='Login' screenOptions={{
      header: () => null,}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />

    </Stack.Navigator>
  );
}
export default AuthStack;
