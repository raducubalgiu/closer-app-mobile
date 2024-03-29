import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/rootStackParams";
import { useAuth, useGet, usePatch, useRefreshOnFocus } from "../../hooks";
import { Header, Stack } from "../../components/core";
import { SettingsListItem } from "../../components/customized";
import { showToast, trimFunc } from "../../utils";
import theme from "../../../assets/styles/theme";
import { Chat } from "../../ts";

const { error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupSettings">;

export const ChatGroupSettingsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chatId } = route.params;
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: chat, refetch } = useGet<Chat>({
    model: "groupDetails",
    uri: `/users/${user?.id}/chats/${chatId}`,
  });

  useRefreshOnFocus(refetch);

  const { users, summary, isAdmin } = chat || {};

  const { mutate: leaveGroup, isLoading } = usePatch({
    uri: `/users/${user?.id}/chats/${chatId}/groups/leave-group`,
    onSuccess: () => {
      navigation.navigate("Chats");
      showToast({
        message: t("youLeavedTheGroup", { GROUP_NAME: summary?.name }),
      });
    },
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const displayUsers = users
    ?.map((el) => `${el.user.username} `)
    ?.splice(0, 2)
    .toString();

  const andOthers = users && users?.length > 1 ? t("andSomeoneElse") : "";

  const goToAddNewPersons = () => {
    if (isAdmin) {
      navigation.navigate("ChatGroupAddUsers", { chatId });
    } else {
      showToast({
        message: t("justAdminsCanAddNewUsersToGroup"),
      });
    }
  };

  const goToGroupName = () => {
    if (isAdmin && chat) {
      navigation.navigate("ChatGroupName", {
        name: chat?.summary?.name,
        chatId: chat?.id,
      });
    } else {
      showToast({
        message: t("justAdminsCanChangeGroupName"),
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={summary?.name} />
      <Stack align="start" sx={{ margin: 15 }}>
        <SettingsListItem
          title={t("persons")}
          description={trimFunc(`${displayUsers} ${andOthers}`, 40)}
          onPress={() =>
            chat &&
            navigation.navigate("ChatGroupUsers", {
              users: chat?.users,
              chatId: chat?.id,
            })
          }
          iconLeftProps={{ name: "users" }}
        />
        <SettingsListItem
          title={t("media")}
          description={t("mediaPostsAndProducts")}
          onPress={() =>
            chat && navigation.navigate("ChatGroupMedia", { chatId: chat?.id })
          }
          iconLeftProps={{ name: "image" }}
        />
        <SettingsListItem
          title={t("addPersons")}
          description={t("addNewPersons")}
          onPress={goToAddNewPersons}
          iconLeftProps={{ name: "user-plus" }}
        />
        <SettingsListItem
          title={t("nameOfGroup")}
          description={t("changeGroupName")}
          onPress={goToGroupName}
          iconLeftProps={{ name: "at-sign" }}
        />
        <Pressable onPress={() => leaveGroup({})} disabled={isLoading}>
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
