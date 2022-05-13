import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, CustomAvatar, Button } from "../../core";
import theme from "../../../assets/styles/theme";
import FollowButton from "../../core/Buttons/FollowButton";
import { useAuth } from "../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

const CardFollowers = (props) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const goToUser = (userId) => {
    navigation.push("ProfileGeneralStack", {
      screen: "ProfileGeneral",
      params: { userId },
    });
  };

  return (
    <Stack direction="row" sx={styles.container}>
      <Button sx={styles.goToUser} onPress={() => goToUser(props.followeeId)}>
        <CustomAvatar avatar={props.avatar} withBadge={false} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </Stack>
      </Button>
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
