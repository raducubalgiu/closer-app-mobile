import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { Header, Stack } from "../../components/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { SettingsListItem } from "../../components/customized";
import { trimFunc } from "../../utils";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuth, useGet } from "../../hooks";
import { ChatGroup } from "../../ts/interfaces/chatGroup";

const { error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupSettings">;

export const ChatGroupSettingsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chatId } = route.params;
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: chat } = useGet<ChatGroup>({
    model: "groupDetails",
    uri: `/users/${user?.id}/chats/${chatId}`,
  });

  const { users, summary } = chat || {};

  const displayUsers = users
    ?.splice(0, 2)
    ?.map((el) => `${el.user.username} `)
    .toString();

  const andOthers = users && users?.length > 1 ? t("andSomeoneElse") : "";

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={name} />
      <Stack align="start" sx={{ margin: 15 }}>
        <SettingsListItem
          title={t("persons")}
          description={trimFunc(`${displayUsers} ${andOthers}`, 45)}
          onPress={() => navigation.navigate("ChatGroupUsers", { users })}
          iconLeftProps={{ name: "users" }}
        />
        <SettingsListItem
          title={t("addPersons")}
          description={t("addNewPersons")}
          onPress={() => {}}
          iconLeftProps={{ name: "user-plus" }}
        />
        <SettingsListItem
          title={t("media")}
          description={t("mediaPostsAndProducts")}
          onPress={() => {}}
          iconLeftProps={{ name: "image" }}
        />
        <SettingsListItem
          title={t("nameOfGroup")}
          description={t("changeGroupName")}
          onPress={() =>
            navigation.navigate("ChatGroupName", { name: summary?.name })
          }
          iconLeftProps={{ name: "at-sign" }}
        />
        <Pressable>
          <Stack direction="row">
            <Icon name="log-out" type="feather" color={error} />
            <Text style={styles.logout}>{t("logoutFromGroup")}</Text>
          </Stack>
        </Pressable>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  logout: {
    color: error,
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 25,
    fontWeight: "500",
  },
});
