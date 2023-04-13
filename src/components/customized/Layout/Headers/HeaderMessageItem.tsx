import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../../../assets/styles/theme";
import { Stack, IconBackButton } from "../../../core";
import { InfoIconButton } from "../../IconButtons/InfoIconButton";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { Chat } from "../../../../ts";
import { trimFunc } from "../../../../utils";

const { grey0 } = theme.lightColors || {};

type IProps = { chat: Chat };

export const HeaderMessageItem = ({ chat }: IProps) => {
  const { summary, users, isGroupChat } = chat;
  const { name, avatar } = summary;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToUser = () => {
    if (!isGroupChat) {
      navigation.push("ProfileGeneral", {
        username: name,
        service: null,
        option: null,
      });
    }
  };

  const goToMessagesSettings = () => {
    navigation.navigate("ChatSettings", { chat });
  };

  const displayGroupUsers = users.map((el) => `${el.user.username}`).toString();

  return (
    <Stack direction="row" sx={styles.container}>
      <Stack direction="row">
        <IconBackButton />
        <Pressable onPress={goToUser}>
          <Stack direction="row">
            <CustomAvatar size={40} avatar={avatar} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Stack direction="row" sx={{ flex: 1 }}>
                <Text style={styles.name}>{name}</Text>
              </Stack>
              <Text style={styles.active}>
                {isGroupChat ? trimFunc(displayGroupUsers, 30) : "Active now"}
              </Text>
            </Stack>
          </Stack>
        </Pressable>
      </Stack>
      <InfoIconButton onPress={goToMessagesSettings} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    zIndex: 1000,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  active: {
    color: grey0,
    fontSize: 13,
    flexDirection: "row",
  },
});
