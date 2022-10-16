import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { Stack, CustomAvatar } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import React from "react";

const width = Dimensions.get("window").width;

const MessReceivedItem = (props) => {
  return (
    <Stack align="start" justify="start" sx={styles.container}>
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
  container: { marginBottom: 15 },
  message: {
    borderRadius: 25,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: width / 4,
  },
  messageText: {
    color: theme.lightColors.black,
  },
  likeBtn: { marginLeft: 25, marginTop: 5 },
});
