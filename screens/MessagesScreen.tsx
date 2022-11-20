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
import { MessageListItem } from "../components/customized";
import theme from "../assets/styles/theme";
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
import { FlashList } from "@shopify/flash-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { grey0 } = theme.lightColors;

export const MessagesScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

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
    uri: `/users/${user._id}/conversations`,
    limit: "12",
  });

  const renderMessages = useCallback(
    ({ item }) => <MessageListItem conversation={item} />,
    []
  );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const { pages } = data || {};

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const noFoundMessage = (
    <Stack sx={{ padding: 15 }}>
      <Text style={{ color: grey0 }}>{t("noFoundMessage")}</Text>
    </Stack>
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
      <View style={{ height: 50, paddingHorizontal: 15 }}>
        <SearchBarInput
          showCancel={false}
          placeholder={t("search")}
          value={search}
          updateValue={(text) => setSearch(text)}
        />
      </View>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        refreshControl={refreshControl}
        ListHeaderComponent={<Heading title={t("messages")} />}
        showsVerticalScrollIndicator={false}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={useCallback((item) => item?._id, [])}
        renderItem={renderMessages}
        estimatedItemSize={70}
        ListFooterComponent={showSpinner}
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
