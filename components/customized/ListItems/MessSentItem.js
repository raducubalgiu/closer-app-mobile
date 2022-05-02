import { StyleSheet, Text, View } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import React from "react";

const MessSentItem = (props) => {
  return (
    <Stack direction="row" justify="end" sx={{ marginBottom: 15 }}>
      <View style={styles.message}>
        <Text style={styles.messageText}>{props.message}</Text>
      </View>
    </Stack>
  );
};

export default MessSentItem;

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    backgroundColor: "#f1f1f1",
    marginLeft: 10,
    padding: 12.5,
  },
  messageText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
  },
});
