import { SafeAreaView, StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import * as Animatable from "react-native-animatable";
import { Header, SearchBarInput, Button } from "../../../components/core";
import { UserSelectableListItem } from "../../../components/customized";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
  usePost,
} from "../../../hooks";
import { User } from "../../../ts";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

export const MessageNewScreen = () => {
  const { user } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { refetch } = options;

  useRefreshOnFocus(refetch);

  const { data: users, loadMore, showSpinner } = usePaginateActions(options);
  const keyExtractor = useCallback((item: User) => item.id, []);

  const handleSelectUsers = useCallback(
    (user: User, action: string) => {
      if (action === "REMOVE") {
        setSelectedUsers((selectedUsers) =>
          selectedUsers.filter((u) => u.id !== user.id)
        );
      } else {
        setSelectedUsers((selectedUsers) => selectedUsers.concat(user));
      }
    },
    [selectedUsers]
  );

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserSelectableListItem
        user={item}
        onSelect={handleSelectUsers}
        selected={false}
      />
    ),
    []
  );

  const { mutate: goToMessages, isLoading } = usePost({
    uri: `/users/${user?.id}/chats`,
    onSuccess: (response) => {
      navigation.navigate("Messages", { chat: response.data });
    },
  });

  const onSubmit = () => {
    if (selectedUsers?.length === 1) {
      goToMessages({ users: [selectedUsers[0]] });
    } else {
      navigation.navigate("ChatGroupCreate", { users: selectedUsers });
    }
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("newMessage")} />
      </SafeAreaView>
      <View style={styles.searchbar}>
        <SearchBarInput
          placeholder={t("search")}
          value={search}
          onChangeText={updateSearch}
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
      {selectedUsers?.length > 0 && (
        <Animatable.View
          animation="fadeInUp"
          duration={100}
          style={{
            paddingBottom: insets.bottom,
            ...styles.btn,
          }}
        >
          <Button
            title={
              selectedUsers?.length < 2 ? t("sendMessage") : t("createNewGroup")
            }
            loading={isLoading}
            disabled={isLoading || selectedUsers?.length === 0}
            onPress={onSubmit}
          />
        </Animatable.View>
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
  btn: {
    paddingTop: 5,
    marginHorizontal: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
