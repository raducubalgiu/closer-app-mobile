import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const RegisterBusinessScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
      <Text>RegisterBusiness</Text>
    </View>
  );
};

export default RegisterBusinessScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
