import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationsTab = () => {
  return (
    <View style={styles.screen}>
      <Text>NotificationsTab</Text>
    </View>
  );
};

export default NotificationsTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
