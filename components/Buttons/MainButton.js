import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import React from "react";

const MainButton = (props) => {
  return (
    <Button
      {...props}
      loading={props.loading}
      onPress={props.onPress}
      title={props.title}
      buttonStyle={{
        backgroundColor: "#fe9934",
        padding: 12.5,
        borderRadius: 10,
      }}
      containerStyle={{
        width: "100%",
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
