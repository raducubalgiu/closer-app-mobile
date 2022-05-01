import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const EditPhotoLibraryScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>EditPhotoLibraryScreen</Text>
    </SafeAreaView>
  );
};

export default EditPhotoLibraryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
