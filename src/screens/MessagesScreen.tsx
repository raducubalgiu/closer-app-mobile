import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MessageListItem, NoFoundMessage } from "../components/customized";
import theme from "../../assets/styles/theme";
import {
  useAuth,
  useGetPaginate,
  useRefreshByUser,
  useRefreshOnFocus,
} from "../hooks";
import {
  SearchBarInput,
  Header,
  IconButtonEdit,
  Stack,
  Heading,
  Spinner,
} from "../components/core";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Message } from "../ts";

const { grey0 } = theme.lightColors || {};

export const MessagesScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "conversations",
    uri: `/users/${user.id}/conversations`,
    limit: "12",
  });

  const renderMessages = useCallback(
    ({ item }: ListRenderItemInfo<Message>) => (
      <MessageListItem conversation={item} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Message) => item?.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const { pages } = data || {};
  const messages = pages?.map((page) => page.results).flat();

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const header = <Heading title={t("messages")} sx={{ marginLeft: 15 }} />;

  let footer;
  if (isFetchingNextPage) {
    footer = <Spinner />;
  } else if (messages?.length === 0) {
    footer = (
      <NoFoundMessage title={t("messages")} description={t("noFoundMessage")} />
    );
  }

  console.log("MESSAGES!!!!", messages);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myMessages")}
        hideBtnLeft={true}
        actionBtn={
          <IconButtonEdit onPress={() => navigation.navigate("MessageNew")} />
        }
      />
      <View style={{ height: 50, paddingHorizontal: 15 }}>
        <SearchBarInput
          showCancel={false}
          placeholder={t("search")}
          value={search}
          updateValue={(text: string) => setSearch(text)}
        />
      </View>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        refreshControl={refreshControl}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderMessages}
        estimatedItemSize={70}
        ListFooterComponent={footer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
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
