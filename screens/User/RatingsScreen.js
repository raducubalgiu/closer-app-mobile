import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const RatingsScreen = () => {
  return (
    <View>
      <BackButton />
      <Text>RatingsScreen</Text>
    </View>
  );
};

export default RatingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
