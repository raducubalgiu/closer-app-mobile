import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimeModal from "../components/DateTimeModal/DateTimeModal";

const FiltersScreen = ({ route }) => {
  const { serviceId, serviceName } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Services", { serviceId, serviceName })
        }
      >
        <Text>Go to Services Screen</Text>
      </TouchableOpacity>
      <DateTimeModal />
    </SafeAreaView>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
