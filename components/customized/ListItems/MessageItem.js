import { StyleSheet, Text } from "react-native";
import { Stack, Checkmark, CustomAvatar } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";

export const MessageItem = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <CustomAvatar avatar={props.avatar} />
      <Stack align="start" sx={{ marginLeft: 10 }}>
        <Stack direction="row">
          <Text style={styles.name}>{props.name}</Text>
          {props.checkmark && <Checkmark size={8} />}
        </Stack>
        <Stack direction="row">
          <Text style={styles.message}>{props.message}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flex: 1,
  },
  name: {
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
