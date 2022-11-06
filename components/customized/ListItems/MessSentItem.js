import { StyleSheet, Text, View, Dimensions } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import React from "react";
import { Icon } from "@rneui/themed";

const width = Dimensions.get("window").width;
const { black, error } = theme.lightColors;

export const MessSentItem = ({ item }) => {
  const { message, liked } = item;

  return (
    <Stack
      direction="row"
      justify="end"
      sx={liked ? { marginBottom: 25 } : { marginBottom: 5 }}
    >
      <View style={styles.message}>
        <Text style={styles.messageText}>{message?.text}</Text>
        {liked && (
          <View style={styles.liked}>
            <Icon name="heart" type="antdesign" color={error} size={12.5} />
          </View>
        )}
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    backgroundColor: "#f1f1f1",
    marginLeft: width / 4,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
  },
  messageText: {
    color: black,
    fontSize: 15,
  },
  liked: {
    position: "absolute",
    bottom: -15,
    left: 15,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
});
