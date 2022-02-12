import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const GiftsScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
      <Text>Gifts Screen</Text>
    </View>
  );
};

export default GiftsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
