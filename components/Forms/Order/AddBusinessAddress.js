import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AddBusinessAddress = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.setParams({
          activeStep: 3,
          headerLabel: "Serviciile locatiei",
        })
      }
    >
      <Text>Add Business Address</Text>
    </TouchableOpacity>
  );
};

export default AddBusinessAddress;

const styles = StyleSheet.create({});
