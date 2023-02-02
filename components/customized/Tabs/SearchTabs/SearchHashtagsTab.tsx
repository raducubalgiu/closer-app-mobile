import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const SearchHashtagsTab = ({ search }: { search: string }) => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const fetchData = async (page: number, search: string) => {
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
  const hashtags = pages?.map((page) => page.results).flat();

  const renderHashtags = useCallback(
    ({ item }: ListRenderItemInfo<Hashtag>) => (
      <HashtagListItem
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Hashtag", { name: item.name })}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: Hashtag) => item.id, []);

  let header;
  if (!isLoading && !isFetchingNextPage && hashtags?.length) {
    header = (
      <NoFoundMessage
        title={t("hashtags")}
        description={t("noFoundHashtags")}
      />
    );
  }

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        data={hashtags}
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
