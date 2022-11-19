import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { useAuth } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Hashtag } from "../../../../models/hashtag";

export const SearchHashtagsTab = ({ search }) => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation = useNavigation();

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
      enabled: isFocused,
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
  const posts = pages?.map((page) => page.results).flat();

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
  const keyExtractor = useCallback((item: Hashtag) => item._id, []);
  const noFoundMessage = (
    <NoFoundMessage title={t("hashtags")} description={t("noFoundHashtags")} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={
          !isLoading &&
          !isFetchingNextPage &&
          pages[0]?.results?.length === 0 &&
          noFoundMessage
        }
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderHashtags}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={62}
      />
    </>
  );
};
