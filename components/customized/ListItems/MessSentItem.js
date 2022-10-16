import { StyleSheet, Text, View, Dimensions } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import React from "react";

const width = Dimensions.get("window").width;

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
    marginLeft: width / 4,
    padding: 10,
  },
  messageText: {
    color: theme.lightColors.black,
  },
});
