import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { useIsFocused } from "@react-navigation/native";

export const HashtagPostsRecentTab = ({ name }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isPreviousData,
  } = useGetPaginate({
    model: "hRecent",
    uri: `/hashtags/${name}/posts/recent`,
    limit: "15",
    enabled: !isPreviousData && isFocused,
  });

  const renderPosts = useCallback(
    ({ item, index }) => (
      <CardPostImage
        onPress={() => {}}
        index={index}
        image={item?.images[0]?.url}
        bookable={item.bookable}
        fixed={null}
        postType={item.postType}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item._id, []);

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
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={noFoundMessage}
        numColumns={3}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
