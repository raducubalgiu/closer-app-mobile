import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage, UserListItem } from "../components/customized";
import { useAuth } from "../hooks";
import { useGetPaginate } from "../hooks";

const LikesScreen = ({ route }) => {
  const { user } = useAuth();
  const { postId } = route.params;
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
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

  const noFoundMessage = (
    <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
  );

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

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} divider={true} />
      {!isLoading && !pages[0]?.results.length && noFoundLikes}
      <FlatList
        ListHeaderComponent={
          !isLoading &&
          !isFetchingNextPage &&
          pages[0]?.results?.length === 0 &&
          noFoundMessage
        }
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

export default LikesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
