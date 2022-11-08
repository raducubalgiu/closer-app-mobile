import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
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
    uri: `/posts/${postId}/get-likes`,
    limit: "25",
  });

  const renderPerson = useCallback(({ item }) => {
    const { _id, username, name, avatar, checkmark } = item?.user || {};

    return (
      <UserListItem
        avatar={avatar}
        username={username}
        name={name}
        checkmark={checkmark}
        followeeId={_id}
        userId={user?._id}
      />
    );
  }, []);

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
      <FlatList
        ListHeaderComponent={noFoundMessage}
        refreshControl={refreshControl}
        contentContainerStyle={{ padding: 15 }}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
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
