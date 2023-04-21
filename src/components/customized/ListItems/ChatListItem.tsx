import { StyleSheet, Text, Pressable } from "react-native";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Chat } from "../../../ts";
import dayjs from "dayjs";

const { black, grey0 } = theme.lightColors || {};

type IProps = { chat: Chat };

export const ChatListItem = ({ chat }: IProps) => {
  const { summary, latestMessage, isGroupChat } = chat || {};
  const { name, avatar } = summary || {};
  const { text, createdAt } = latestMessage || {};

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToMessages = () => {
    navigation.navigate("Messages", { chat });
  };

  return (
    <Pressable onPress={goToMessages} style={styles.container}>
      <Stack direction="row" align="start">
        <Stack direction="row" align="start" sx={{ flex: 1 }}>
          <CustomAvatar avatar={avatar} size={50} />
          <Stack align="start" sx={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{trimFunc(text, 30)}</Text>
          </Stack>
        </Stack>
        <Text style={styles.date}>{dayjs(createdAt).format("DD/MM/YY")}</Text>
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
    marginTop: 4,
  },
  date: {
    color: grey0,
    marginLeft: 10,
    fontSize: 13,
  },
});
