import { StyleSheet, SafeAreaView, View } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
} from "../hooks";
import {
  SearchBarInput,
  Header,
  IconButtonEdit,
  Heading,
  Spinner,
} from "../components/core";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Chat } from "../ts";
import dayjs from "dayjs";
import { ChatListItem, NoFoundMessage } from "../components/customized";
import FakeSearchBarSimple from "../components/customized/FakeSearchBar/FakeSearchBarSimple";

export const ChatsScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
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

  const renderMessages = useCallback(({ item }: ListRenderItemInfo<Chat>) => {
    return <ChatListItem chat={item} />;
  }, []);

  const keyExtractor = useCallback((item: Chat) => item?.id, []);

  const header = <Heading title={t("messages")} sx={{ marginLeft: 15 }} />;

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myMessages")}
        hideBtnLeft={true}
        actionBtn={
          <IconButtonEdit onPress={() => navigation.navigate("MessageNew")} />
        }
      />
      {/* <View style={{ height: 50, paddingHorizontal: 15 }}>
        <SearchBarInput
          showCancel={false}
          placeholder={t("search")}
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
      </View> */}
      <FakeSearchBarSimple onPress={() => {}} sx={{ marginHorizontal: 15 }} />

      {!isInitialLoading && chats.length > 0 && (
        <FlashList
          ListHeaderComponent={header}
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
