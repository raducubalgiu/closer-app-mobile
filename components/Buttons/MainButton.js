import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import React from "react";

const MainButton = (props) => {
  return (
    <Button
      loading={props.loading}
      onPress={props.onPress}
      title={props.title}
      buttonStyle={{
        backgroundColor: "#fe9934",
      }}
      containerStyle={{
        width: "100%",
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      titleStyle={{
        fontFamily: "Exo-Medium",
        textTransform: "uppercase",
        fontSize: 14,
      }}
    />
  );
};

export default MainButton;

const styles = StyleSheet.create({});
