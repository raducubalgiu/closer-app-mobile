import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "../Avatars/UserAvatar";
import Stack from "../../core/Containers/Stack";
import { Colors } from "../../../assets/styles/Colors";

const CardFollowers = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <TouchableOpacity style={styles.goToUser} onPress={props.onGoToUser}>
        <UserAvatar
          avatar={
            props?.avatar !== undefined ? props?.avatar[0]?.url : undefined
          }
          withBadge={false}
        />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </Stack>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btn, ...props.sxBtn }}
        onPress={props.onPress}
      >
        <Text style={{ ...styles.btnText, ...props.sxBtnText }}>Urmaresti</Text>
      </TouchableOpacity>
    </Stack>
  );
};

export default CardFollowers;

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  username: {
    fontFamily: "Exo-SemiBold",
    fontSize: 13.5,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 13.5,
  },
  goToUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 13,
  },
});
