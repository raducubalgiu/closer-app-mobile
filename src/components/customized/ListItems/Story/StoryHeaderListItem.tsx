import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Stack, Checkmark, IconButton } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";

type IProps = { avatar: any; username: string; date: string };

const StoryHeaderListItem = ({ avatar, username, date }: IProps) => {
  const navigation = useNavigation();

  return (
    <Stack direction="row" sx={{ margin: 10 }}>
      <Stack direction="row">
        <CustomAvatar avatar={avatar} size={30} sx={{ borderWidth: 0 }} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Stack direction="row">
            <Text style={styles.username}>{username}</Text>
            <Checkmark sx={{ marginLeft: 5 }} />
          </Stack>
          <Text style={styles.date}>{date}</Text>
        </Stack>
      </Stack>
      <IconButton
        name="close"
        type="antdesign"
        size={27.5}
        color="white"
        onPress={() => navigation.goBack()}
        sx={styles.back}
      />
    </Stack>
  );
};

export default StoryHeaderListItem;

const styles = StyleSheet.create({
  username: {
    color: "white",
    fontWeight: "600",
    fontSize: 13.5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  date: {
    color: "white",
    fontSize: 13,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  back: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
