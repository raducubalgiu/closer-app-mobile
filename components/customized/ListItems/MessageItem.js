import { StyleSheet, Text } from "react-native";
import { Stack, Checkmark, CustomAvatar, Button } from "../../core";
import React from "react";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";

const { black, grey0 } = theme.lightColors;

export const MessageItem = ({
  avatar,
  checkmark,
  name,
  message,
  date,
  onPress,
}) => {
  return (
    <Button onPress={onPress}>
      <Stack direction="row" justify="start" sx={styles.container}>
        <CustomAvatar avatar={avatar} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Stack direction="row">
            <Text style={styles.name}>{name}</Text>
            {checkmark && <Checkmark size={8} />}
          </Stack>
          <Stack direction="row" justify="between">
            <Text style={styles.message}>{trimFunc(message, 30)}</Text>
            <Text style={styles.date}>{date}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flex: 1,
  },
  name: {
    color: black,
    fontSize: 15,
    marginRight: 5,
    fontWeight: "500",
  },
  message: {
    color: grey0,
    fontSize: 13.5,
  },
  date: {
    color: grey0,
    marginLeft: 10,
  },
});
