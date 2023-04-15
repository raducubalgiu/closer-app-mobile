import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState, useCallback } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import {
  useGetPaginate,
  useRefreshOnFocus,
  usePaginateActions,
  usePatch,
  useAuth,
} from "../../hooks";
import { Header, SearchBarInput, Button } from "../../components/core";
import { User } from "../../ts";
import { useTranslation } from "react-i18next";
import UserListItemSelectable from "../../components/customized/ListItems/User/UserListItemSelectable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { showToast } from "../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupAddUsers">;

export const ChatGroupAddUsersScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chatId } = route.params;
  const { t } = useTranslation();
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { refetch } = options;

  useRefreshOnFocus(refetch);

  const { data: users, loadMore, showSpinner } = usePaginateActions(options);

  const { mutate: addUsers, isLoading } = usePatch({
    uri: `/users/${user?.id}/chats/${chatId}/groups/add-users`,
    onSuccess: () => navigation.goBack(),
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const selectUsers = useCallback(
    (user: User, action: string) => {
      if (action === "REMOVE") {
        setSelectedUsersIds((selectedUsersIds) =>
          selectedUsersIds.filter((selUserId) => selUserId !== user.id)
        );
      } else {
        setSelectedUsersIds((selectedUsersIds) =>
          selectedUsersIds.concat(user.id)
        );
      }
    },
    [selectedUsersIds]
  );

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSelectable user={item} onSelect={selectUsers} />
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("addNewPersons")} />
      </SafeAreaView>
      <View style={styles.searchbar}>
        <SearchBarInput
          placeholder={t("search")}
          value={search}
          onChangeText={(text: string) => setSearch(text)}
          showCancel={false}
        />
      </View>
      <FlashList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: insets.bottom }}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
        estimatedItemSize={55}
      />
      {selectedUsersIds?.length > 0 && (
        <View style={{ marginHorizontal: 15 }}>
          <Button
            sxBtn={{
              bottom: insets.bottom,
              ...styles.sendBtn,
            }}
            title={t("send")}
            loading={isLoading}
            disabled={isLoading}
            onPress={() => addUsers({ users: selectedUsersIds })}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbar: { height: 50, marginHorizontal: 15 },
  sendBtn: {
    position: "absolute",
    width: "100%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
