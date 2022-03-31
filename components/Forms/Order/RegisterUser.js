import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterUser = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.setParams({
          activeStep: 1,
          headerLabel: "Business",
        })
      }
    >
      <Text>Go To Address</Text>
    </TouchableOpacity>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({});
