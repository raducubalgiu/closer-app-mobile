import { StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
  useRefreshByUser,
} from "../../hooks";
import {
  Header,
  IconButtonEdit,
  Heading,
  Spinner,
} from "../../components/core";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Chat } from "../../ts";
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

  const renderMessages = useCallback(({ item }: ListRenderItemInfo<Chat>) => {
    return <ChatListItem chat={item} />;
  }, []);

  const keyExtractor = useCallback((item: Chat) => item?.id, []);

  const goToSearch = () => {
    navigation.navigate("MessagesSearch");
  };

  const header = (
    <>
      <FakeSearchBar onPress={goToSearch} sx={{ marginHorizontal: 15 }} />
      <Heading
        title={t("messages")}
        sx={{ marginLeft: 15, marginBottom: 20 }}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myMessages")}
        hideBtnLeft={true}
        actionBtn={
          <IconButtonEdit onPress={() => navigation.navigate("MessageNew")} />
        }
      />

      {!isInitialLoading && chats.length > 0 && (
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

      {!isInitialLoading && chats?.length === 0 && (
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
});
