import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../components/BackButton/BackButton";

const ReportProblemScreen = () => {
  return (
    <View style={styles.screen}>
      <BackButton />
      <Text>ReportProblemScreen</Text>
    </View>
  );
};

export default ReportProblemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
