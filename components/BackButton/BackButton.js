import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: 50,
        left: 15,
        padding: 15,
        borderRadius: 50,
        shadowColor: "#c9c5c5",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,

        elevation: 11,
      }}
    >
      <Icon name="arrow-back" color="black" size={20} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
