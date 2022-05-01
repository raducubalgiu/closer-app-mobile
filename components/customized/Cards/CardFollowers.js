import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "../Avatars/UserAvatar";
import Stack from "../../core/Containers/Stack";
import theme from "../../../assets/styles/theme";
import FollowButton from "../../core/Buttons/FollowButton";
import { useAuth } from "../../../context/auth";

const CardFollowers = (props) => {
  const { user } = useAuth();

  return (
    <Stack direction="row" sx={styles.container}>
      <TouchableOpacity style={styles.goToUser} onPress={props.onGoToUser}>
        <UserAvatar avatar={props.avatar} withBadge={false} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </Stack>
      </TouchableOpacity>
      {props.followeeId !== user?._id && (
        <FollowButton followeeId={props.followeeId} />
      )}
    </Stack>
  );
};

export default CardFollowers;

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  username: {
    fontFamily: "Exo-SemiBold",
    fontSize: 13.5,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
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
    color: theme.lightColors.black,
    fontSize: 13,
  },
});
