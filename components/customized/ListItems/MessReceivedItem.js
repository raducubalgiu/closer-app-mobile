import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Stack, CustomAvatar } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import React from "react";

const MessReceivedItem = (props) => {
  return (
    <Stack align="start" justify="start" sx={{ marginBottom: 15 }}>
      <Stack direction="row" align="start" justify="start">
        <CustomAvatar avatar={props.avatar} size={30} iconSize={15} />
        <Stack align="start">
          <Stack sx={styles.message}>
            <Text style={styles.messageText}>{props.message}</Text>
          </Stack>
          <TouchableOpacity style={styles.likeBtn}>
            <Icon name="hearto" type="antdesign" color="#ddd" size={15} />
          </TouchableOpacity>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MessReceivedItem;

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    marginLeft: 10,
    padding: 12.5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  messageText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
  },
  likeBtn: { marginLeft: 25, marginTop: 5 },
});
