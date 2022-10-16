import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Checkmark, Stack, CustomAvatar } from "../../core";
import theme from "../../../assets/styles/theme";
import FollowButton from "../../core/Buttons/FollowButton";

const NotificationFollow = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <CustomAvatar avatar={props.avatar} />
          <Stack
            direction="column"
            align="start"
            justify="start"
            sx={styles.details}
          >
            <Stack direction="row">
              <Text style={styles.name}>{props.name}</Text>
              {props.checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.notification}>{props.notification}</Text>
            <Text style={styles.notification}>{props.date}</Text>
          </Stack>
        </TouchableOpacity>
      </View>
      <FollowButton followingId={props.followingId} />
    </Stack>
  );
};

export default NotificationFollow;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  details: { marginLeft: 10, flex: 1 },
  name: {
    color: theme.lightColors.black,
    fontSize: 14,
    marginRight: 5,
  },
  notification: {
    color: theme.lightColors.grey0,
    fontSize: 13.5,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2.5,
  },
  btnText: {
    color: theme.lightColors.black,
    fontSize: 13,
  },
});
