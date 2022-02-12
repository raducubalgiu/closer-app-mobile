import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import CustomHeader from "../../components/Headers/CustomHeader";

const ControlPanelScreen = () => {
  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <CustomHeader title="Centrul de ajutor Closer" />
        <Divider />
      </SafeAreaView>
    </View>
  );
};

export default ControlPanelScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
