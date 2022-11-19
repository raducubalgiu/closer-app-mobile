import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { CardPostImage } from "../../Cards/CardPostImage";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../../hooks";
import { Spinner } from "../../../core";

export const PostsProfileTab = ({ userId }) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "posts",
      uri: `/users/${userId}/posts`,
      limit: "12",
      enabled: isFocused,
    });

  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat() || [];

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

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage
        sx={{ marginTop: 50 }}
        title={t("posts")}
        description={t("noFoundPosts")}
      />
    );

  const keyExtractor = useCallback((item) => item?._id, []);

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

  return (
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
  );
};
