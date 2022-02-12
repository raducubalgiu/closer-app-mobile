import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const LegalScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
      <Text>LegalScreen</Text>
    </View>
  );
};

export default LegalScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
