import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Header } from "../../components/core";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { User } from "../../ts";
import { UserListItemSimple } from "../../components/customized";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupUsers">;
type UserListItem = { user: User; isAdmin: boolean };

export const ChatGroupUsersScreen = ({ route }: IProps) => {
  const { users } = route.params;
  const { t } = useTranslation();

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<UserListItem>) => {
      const { user, isAdmin } = item;
      const { name, username, checkmark, avatar } = user;
      return (
        <UserListItemSimple
          title={name}
          description={isAdmin ? t("administrator") : `@${username}`}
          checkmark={checkmark}
          avatar={avatar}
          sx={{ marginBottom: 15 }}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: UserListItem) => item.user.id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("persons")} />
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ padding: 15 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
