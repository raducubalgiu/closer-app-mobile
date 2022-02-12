import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
