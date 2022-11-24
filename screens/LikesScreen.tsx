import { SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import UserListItem from "../components/customized/ListItems/UserListItem";
import { useAuth, useRefreshByUser } from "../hooks";
import { useGetPaginate } from "../hooks";

export const LikesScreen = ({ route }) => {
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
    ({ item }) => <UserListItem user={item.user} />,
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

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
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
