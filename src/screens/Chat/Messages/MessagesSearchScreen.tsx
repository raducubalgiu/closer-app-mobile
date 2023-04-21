import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ListRenderItemInfo,
  Keyboard,
  View,
  Text,
  Pressable,
} from "react-native";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isEmpty } from "lodash";
import { RootStackParams } from "../../../navigation/rootStackParams";
import {
  CustomAvatar,
  Heading,
  IconBackButton,
  SearchBarInput,
  Stack,
} from "../../../components/core";
import { UserListItemSimple } from "../../../components/customized";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
  useGet,
  usePost,
} from "../../../hooks";
import { Chat, User } from "../../../ts";
import { showToast, trimFunc } from "../../../utils";

type SearchUserResponse = { next: any; results: User[] };

export const MessagesSearchScreen = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const optionsGroups = useGetPaginate({
    model: "chats",
    uri: `/users/${user?.id}/chats/groups`,
    limit: "12",
  });

  const { data: groups } = usePaginateActions(optionsGroups);

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { data: searchedUsers } = useGet<SearchUserResponse>({
    model: "search",
    uri: `/users/search?search=${search}&page=1&limit=5`,
    enableId: search,
    options: {
      enabled: search?.length > 0,
    },
  });

  const { mutate: goToMessages, isLoading } = usePost({
    uri: `/users/${user?.id}/chats`,
    onSuccess: (response) => {
      navigation.navigate("Messages", { chat: response.data });
    },
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const { refetch } = options;
  const { data: users, showSpinner, loadMore } = usePaginateActions(options);
  useRefreshOnFocus(refetch);

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSimple
        title={item?.name}
        description={`@${item.username}`}
        checkmark={item?.checkmark}
        avatar={item?.avatar}
        sx={{ marginBottom: 15, marginHorizontal: 15 }}
        loading={isLoading && selectedUser?.id === item.id}
        onGoToUser={() => {
          setSelectedUser(item);
          goToMessages({ users: [item.id] });
        }}
      />
    ),
    [isLoading]
  );

  const navigateToMessage = (item: Chat) => {
    if (!isLoading) {
      navigation.navigate("Messages", { chat: item });
    }
  };

  const renderGroup = useCallback(
    ({ item }: ListRenderItemInfo<Chat>) => (
      <Pressable onPress={() => navigateToMessage(item)}>
        <Stack justify="center" align="center" sx={{ marginRight: 20 }}>
          <CustomAvatar avatar={item.summary.avatar} />
          <Text style={{ fontWeight: "500", marginTop: 10 }}>
            {trimFunc(item.summary.name, 10)}
          </Text>
        </Stack>
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const header = (
    <>
      <Heading title="Grupurile mele" sx={{ marginLeft: 15 }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 15 }}
        keyboardShouldPersistTaps={"handled"}
      />
      <Heading title="Sugestii" sx={{ marginBottom: 15, marginLeft: 15 }} />
    </>
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Stack direction="row" sx={{ marginHorizontal: 15 }}>
          <IconBackButton />
          <SearchBarInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder={t("search")}
            autoFocus={true}
            showCancel={false}
          />
        </Stack>
      </SafeAreaView>
      {isEmpty(search) ? (
        <FlatList
          ListHeaderComponent={header}
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderUser}
          onEndReached={loadMore}
          ListFooterComponent={showSpinner}
          onMomentumScrollBegin={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps={"handled"}
        />
      ) : (
        <FlatList
          data={searchedUsers?.results}
          keyExtractor={keyExtractor}
          renderItem={renderUser}
          onMomentumScrollBegin={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{ marginTop: 10 }}
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
});
