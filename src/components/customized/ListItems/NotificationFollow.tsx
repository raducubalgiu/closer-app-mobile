import { StyleSheet, Text, View, Pressable } from "react-native";
import { Checkmark, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import FollowButton from "../Buttons/FollowButton";
import CustomAvatar from "../../core/Avatars/CustomAvatar";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  name: string;
  avatar: any;
  checkmark: boolean;
  notification: any;
  date: string;
  isFollow: boolean;
};

const NotificationFollow = ({
  name,
  avatar,
  checkmark,
  notification,
  date,
  isFollow,
}: IProps) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flexDirection: "row" }}>
          <CustomAvatar avatar={avatar} />
          <Stack
            direction="column"
            align="start"
            justify="start"
            sx={styles.details}
          >
            <Stack direction="row">
              <Text style={styles.name}>{name}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.notification}>{notification}</Text>
            <Text style={styles.notification}>{date}</Text>
          </Stack>
        </Pressable>
      </View>
      <FollowButton isFollow={isFollow} onPress={() => {}} />
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
    color: black,
    fontSize: 14,
    marginRight: 5,
  },
  notification: {
    color: grey0,
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
    color: black,
    fontSize: 13,
  },
});