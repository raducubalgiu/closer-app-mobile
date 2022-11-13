import { SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage, UserListItem } from "../components/customized";
import { useAuth } from "../hooks";
import { useGetPaginate } from "../hooks";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const LikesScreen = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const { postId } = route.params;
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
    model: "likes",
    uri: `/users/${user._id}/posts/${postId}/get-likes`,
    limit: "25",
  });

  const renderPerson = useCallback(
    ({ item }) => <UserListItem user={item.user} isFollow={item.isFollow} />,
    []
  );

  const keyExtractor = useCallback((item) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, []);

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} divider={true} />
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        estimatedItemSize={75}
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
