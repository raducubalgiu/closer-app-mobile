import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage, UserListItem } from "../components/customized";
import { useAuth } from "../hooks";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const LikesScreen = ({ route }) => {
  const { user } = useAuth();
  const { postId } = route.params;
  const { t } = useTranslation();

  const fetchAllLikes = async (page, postId) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/posts/${postId}/get-likes?page=${page}&limit=25`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["likes", postId],
      ({ pageParam = 1 }) => fetchAllLikes(pageParam, postId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.next !== null) {
            return lastPage.next;
          }
        },
      }
    );

  const renderPerson = useCallback(({ item }) => {
    const { _id, username, name, avatar } = item?.user || {};

    return (
      <UserListItem
        avatar={avatar}
        username={username}
        name={name}
        followeeId={_id}
        userId={user?._id}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const noFoundLikes = (
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
