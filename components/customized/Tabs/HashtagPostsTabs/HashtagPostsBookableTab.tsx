import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { Post } from "../../../../models/post";

export const HashtagPostsBookableTab = ({ name }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "hBookable",
    uri: `/hashtags/${name}/posts/bookable`,
    limit: "15",
    enabled: isFocused,
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

  const keyExtractor = useCallback((item: Post) => item._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 50 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={noFoundMessage}
        numColumns={3}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={125}
      />
    </>
  );
};