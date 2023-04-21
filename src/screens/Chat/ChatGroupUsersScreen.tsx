import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Header } from "../../components/core";
import { UserListItemSimple } from "../../components/customized";
import { User } from "../../ts";
import { useAuth } from "../../hooks";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupUsers">;
type UserListItem = { user: User; isAdmin: boolean };

export const ChatGroupUsersScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { users, chatId } = route.params;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToUser = (userId: string, name: string, isAdmin: boolean) => {
    if (user?.id !== userId) {
      navigation.navigate("ChatGroupUser", { userId, name, isAdmin, chatId });
    }
  };

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<UserListItem>) => {
      const { isAdmin } = item;
      const { id, name, username, checkmark, avatar } = item.user;
      return (
        <UserListItemSimple
          onGoToUser={() => goToUser(id, name, isAdmin)}
          title={name}
          description={isAdmin ? t("administrator") : `@${username}`}
          checkmark={checkmark}
          avatar={avatar}
          arrowRight={user?.id !== id}
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
