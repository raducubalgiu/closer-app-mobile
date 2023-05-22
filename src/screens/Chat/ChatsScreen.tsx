import { StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isEmpty } from "lodash";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
  useRefreshByUser,
} from "../../hooks";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Chat } from "../../ts";
import {
  Header,
  IconButtonEdit,
  Heading,
  Spinner,
} from "../../components/core";
import {
  ChatListItem,
  NoFoundMessage,
  FakeSearchBar,
} from "../../components/customized";

export const ChatsScreen = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const options = useGetPaginate({
    model: "chats",
    uri: `/users/${user?.id}/chats`,
    limit: "12",
  });

  const { refetch, isInitialLoading } = options;
  const { data: chats, showSpinner, loadMore } = usePaginateActions(options);
  useRefreshOnFocus(refetch);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const renderMessages = useCallback(
    ({ item }: ListRenderItemInfo<Chat>) => <ChatListItem chat={item} />,
    []
  );

  const keyExtractor = useCallback((item: Chat) => item?.id, []);

  const goToSearch = () => navigation.navigate("MessagesSearch");
  const navigateToNewMessage = () => navigation.navigate("MessageNew");

  const header = (
    <>
      <FakeSearchBar onPress={goToSearch} sx={styles.fakeSearchBar} />
      <Heading title={t("messages")} sx={styles.heading} />
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myMessages")}
        hideBtnLeft={true}
        actionBtn={<IconButtonEdit onPress={navigateToNewMessage} />}
      />
      {!isInitialLoading && !isEmpty(chats) && (
        <FlashList
          ListHeaderComponent={header}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={keyExtractor}
          renderItem={renderMessages}
          estimatedItemSize={70}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {!isInitialLoading && isEmpty(chats) && (
        <NoFoundMessage
          iconProps={{ name: "message-circle" }}
          title={t("messages")}
          description={t("noFoundMessage")}
        />
      )}
      {isInitialLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  fakeSearchBar: { marginHorizontal: 15, borderRadius: 5 },
  heading: { marginLeft: 15, marginBottom: 20 },
});
