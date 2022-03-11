import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const GoogleButton = (props) => {
  return (
    <Button
      buttonStyle={{
        backgroundColor: "transparent",
      }}
      containerStyle={{
        width: "100%",
        marginHorizontal: 50,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: "#fe9934",
      }}
      icon={{
        name: "google",
        type: "antdesign",
        size: 15,
        color: "#fe9934",
        marginRight: 5,
      }}
      titleStyle={{
        fontFamily: "Exo-SemiBold",
        textTransform: "uppercase",
        fontSize: 14,
        color: "#fe9934",
      }}
      title={props.title}
    />
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
});
