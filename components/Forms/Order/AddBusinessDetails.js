import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/auth";

const AddBusinessDetails = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View>
      <Text>User ID: {user?._id}</Text>
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() =>
          navigation.setParams({
            activeStep: 2,
            headerLabel: "Adresa Locatiei",
            locationId: 1,
          })
        }
      >
        <Text>Go To Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBusinessDetails;

const styles = StyleSheet.create({});
