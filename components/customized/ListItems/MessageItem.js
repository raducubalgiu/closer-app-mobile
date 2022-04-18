import { StyleSheet, Text, TouchableOpacity } from "react-native";
import UserAvatar from "../Avatars/UserAvatar";
import { Stack } from "../../core";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import { Checkmark } from "../../core";

const MessageItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <UserAvatar avatar={props.avatar} />
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
    color: Colors.textDark,
    fontSize: 14,
    marginRight: 5,
  },
  message: {
    color: Colors.textLight,
    fontSize: 13.5,
  },
  date: {
    color: Colors.textLight,
    marginLeft: 10,
  },
});
