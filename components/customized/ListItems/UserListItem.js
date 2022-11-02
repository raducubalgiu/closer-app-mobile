import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Stack, CustomAvatar, Button } from "../../core";
import { Checkmark } from "../../core";
import { FollowButton } from "../Buttons/FollowButton";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";

const { grey0, black } = theme.lightColors;

export const UserListItem = ({
  avatar,
  followeeId,
  username,
  name,
  checkmark,
  sx,
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const goToUser = (userId) => {
    navigation.push("ProfileGeneral", {
      userId,
      username,
      avatar,
      name,
      checkmark,
    });
  };

  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
      <Button sx={styles.goToUser} onPress={() => goToUser(followeeId)}>
        <CustomAvatar avatar={avatar} withBadge={false} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Stack direction="row">
            <Text style={styles.username}>{username}</Text>
            {checkmark && <Checkmark sx={{ marginLeft: 10 }} />}
          </Stack>
          <Text style={styles.name}>{name}</Text>
        </Stack>
      </Button>
      {followeeId !== user?._id && <FollowButton followeeId={followeeId} />}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  username: {
    fontSize: 15,
    color: black,
    fontWeight: "600",
  },
  name: {
    color: grey0,
    marginTop: 2.5,
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
    color: black,
    fontSize: 13,
  },
  followers: {
    color: grey0,
    marginTop: 2.5,
    fontSize: 13.5,
  },
});
