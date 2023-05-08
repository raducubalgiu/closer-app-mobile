import { SafeAreaView, StyleSheet, View, Keyboard } from "react-native";
import { useState, useCallback } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import {
  useGetPaginate,
  useRefreshOnFocus,
  usePaginateActions,
  usePatch,
  useAuth,
  useGet,
} from "../../hooks";
import { Header, SearchBarInput } from "../../components/core";
import { User } from "../../ts";
import { useTranslation } from "react-i18next";
import UserListItemSelectable from "../../components/customized/ListItems/User/UserSelectableListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { showToast } from "../../utils";
import { FooterUserSelectable } from "../../components/customized";
import { isEmpty, some } from "lodash";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupAddUsers">;

type SearchResponse = { next: null | number; results: User[] };

export const ChatGroupAddUsersScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { chatId } = route.params;
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { data: searchedUsers } = useGet<SearchResponse>({
    model: "search",
    uri: `/users/search?search=${search}&page=1&limit=5`,
    enableId: search,
    options: { enabled: !isEmpty(search) },
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
        setSelectedUsers((selectedUsers) =>
          selectedUsers.filter((u) => u.id !== user.id)
        );
      } else {
        setSelectedUsers((selectedUsers) => selectedUsers.concat(user));
      }

      Keyboard.dismiss();
    },
    [selectedUsers]
  );

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSelectable
        user={item}
        onSelect={selectUsers}
        selected={some(selectedUsers, { id: item.id })}
      />
    ),
    [selectUsers]
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const onSubmit = () => {
    addUsers({ users: selectedUsers.map((user) => user.id) });
  };

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
        data={isEmpty(search) ? users : searchedUsers?.results}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: insets.bottom }}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
        estimatedItemSize={55}
        onMomentumScrollBegin={() => Keyboard.dismiss()}
        keyboardShouldPersistTaps={"handled"}
      />
      {!isEmpty(selectedUsers) && (
        <FooterUserSelectable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onPress={onSubmit}
          isLoading={isLoading}
        />
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
