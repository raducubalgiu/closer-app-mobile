import { StyleSheet, Text } from "react-native";
import { Stack, FollowButton, CustomAvatar } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const FollowUserSheet = ({
  avatar,
  userId,
  fetchUser,
  handleSuggested,
}) => {
  return (
    <Stack sx={{ margin: 30 }}>
      <CustomAvatar avatar={avatar} size={70} />
      <Text style={styles.followText}>
        Urmareste pe fresh_salon pentru a avea acces la notificari cu privire la
        postari si promotii
      </Text>
      <FollowButton
        fullWidth
        size="md"
        followeeId={userId}
        fetchUser={fetchUser}
        fetchSuggested={handleSuggested}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  followText: {
    marginTop: 15,
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Exo-Medium",
    fontSize: 14.5,
    color: black,
  },
});
