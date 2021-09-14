import React from "react";
import * as ICON from "../component/Icons";
import { Text, View }
  from "react-native";

const SmallTextGrid = (props) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
    }}>
      <View style={{
        width: "10%",
        justifyContent: "center",
        height: "100%",
        paddingLeft: 15,
      }}>
        <ICON.getIcon width={15} height={15} name={props.icon} color="#fff" />
      </View>

      <View style={{
        width: "90%",
        height: 25,
        justifyContent: "center",
        paddingLeft: 20,
      }}>
        <Text style={{
          fontSize: 12,
          color: "#fff",
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
          textDecorationColor: "#000",
          fontWeight: "bold",
        }}>{props.title}</Text>
      </View>
    </View>
  );
};
export default SmallTextGrid;
