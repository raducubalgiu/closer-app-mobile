import { StyleSheet, Text, Pressable } from "react-native";
import { Stack, Checkmark } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { black, grey0 } = theme.lightColors;

export const MessageListItem = ({ conversation }) => {
  const { message, user } = conversation;
  const { name, avatar, checkmark } = user;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToMessages = () => {
    navigation.navigate("MessageItem", { user });
  };

  return (
    <Pressable onPress={goToMessages} style={styles.container}>
      <Stack direction="row" justify="start">
        <CustomAvatar avatar={avatar} size={50} />
        <Stack direction="row" sx={{ flex: 1 }} align="start">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.name}>{name}</Text>
              {checkmark && <Checkmark size={8} />}
            </Stack>
            <Text style={styles.message}>
              {trimFunc(message?.message?.text, 35)}
            </Text>
          </Stack>
          <Text style={styles.date}>1z</Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 20,
    flex: 1,
  },
  name: {
    color: black,
    fontSize: 15.5,
    marginRight: 5,
    fontWeight: "600",
  },
  message: {
    color: grey0,
    marginTop: 2.5,
  },
  date: {
    color: grey0,
    marginLeft: 10,
    fontSize: 13,
  },
});
