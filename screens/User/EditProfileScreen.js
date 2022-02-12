import { StyleSheet, Text, View, ViewSafeArea } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const EditProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
