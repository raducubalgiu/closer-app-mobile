import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Stack, Checkmark, CustomAvatar } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";

const MessageItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <CustomAvatar avatar={props.avatar} />
      <Stack align="start" sx={{ marginLeft: 10 }}>
        <Stack direction="row">
          <Text style={styles.name}>{props.user}</Text>
          {props.checkmark && <Checkmark size={8} />}
        </Stack>
        <Stack direction="row">
          <Text style={styles.message}>{props.message}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </Stack>
      </Stack>
    </TouchableOpacity>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 14,
    marginRight: 5,
  },
  message: {
    color: theme.lightColors.grey0,
    fontSize: 13.5,
  },
  date: {
    color: theme.lightColors.grey0,
    marginLeft: 10,
  },
});
