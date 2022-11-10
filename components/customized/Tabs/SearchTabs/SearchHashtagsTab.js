import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useAuth, useGetPaginate } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const SearchHashtagsTab = ({ search }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const fetchData = async (page, search) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/hashtags/search?search=${search}&page=${page}&limit=25`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isPreviousData,
    isFetching,
  } = useInfiniteQuery(
    ["searchHashtags", search],
    ({ pageParam = 1 }) => fetchData(pageParam, search),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
      },
      enabled: !isPreviousData && isFocused,
    }
  );

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

  const { pages } = data || {};

  const renderHashtags = useCallback(
    ({ item }) => (
      <HashtagListItem
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Hashtag", { name: item.name })}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);
  const noFoundMessage = (
    <NoFoundMessage title={t("hashtags")} description={t("noFoundHashtags")} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={
          !isLoading &&
          !isFetchingNextPage &&
          pages[0]?.results?.length === 0 &&
          noFoundMessage
        }
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderHashtags}
        contentContainerStyle={{ padding: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
