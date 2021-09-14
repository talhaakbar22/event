import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewEvent } from "./ViewEvent";
import ViewProfile from "./ViewProfile";

const Tabs = createBottomTabNavigator();

const BottomTab = () => {

  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 50,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="View" component={ViewEvent}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style = {{alignItems: 'center'}}>
              <Image
                source={require("../Assets/View.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#EBB766" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#EBB766" : "#748c94", fontSize: 12 }}>
                View
              </Text>
            </View>
          ),
        }} />

      <Tabs.Screen
        name="Profile" component={ViewProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style = {{alignItems: 'center'}}>
              <Image
                source={require("../Assets/Group98.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#EBB766" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#EBB766" : "#748c94", fontSize: 12 }}>
                Profile
              </Text>
            </View>
          ),
        }} />
    </Tabs.Navigator>
  );
};
export default BottomTab;

