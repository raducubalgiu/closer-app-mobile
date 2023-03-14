import { StyleSheet, Text } from "react-native";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import FollowButton from "../Buttons/FollowButton";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = {
  avatar: any;
  userId: string;
  fetchUser: () => void;
  handleSuggested: () => void;
};

export const FollowUserSheet = ({
  avatar,
  userId,
  fetchUser,
  handleSuggested,
}: IProps) => {
  return (
    <Stack sx={{ margin: 30 }}>
      <CustomAvatar avatar={avatar} size={70} />
      <Text style={styles.followText}>
        Urmareste pe fresh_salon pentru a avea acces la notificari cu privire la
        postari si promotii
      </Text>
      {/* <FollowButton
        fullWidth
        followeeId={userId}
        fetchUser={fetchUser}
        fetchSuggested={handleSuggested}
      /> */}
    </Stack>
  );
};

const styles = StyleSheet.create({
  followText: {
    marginTop: 15,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 14.5,
    color: black,
  },
});
