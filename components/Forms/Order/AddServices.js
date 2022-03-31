import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AddServices = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => console.log("Finish")}>
      <Text>Add Business Address</Text>
    </TouchableOpacity>
  );
};

export default AddServices;

const styles = StyleSheet.create({});
