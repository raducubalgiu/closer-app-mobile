import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { Post } from "../../../../models";
import { Spinner } from "../../../core";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const SearchLastMinuteTab = ({ search }: { search: string }) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "searchLastMinute",
    uri: `/posts/search`,
    queries: `search=${search}`,
    limit: "12",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: posts, loadMore, showSpinner } = usePaginateActions(options);

  const renderPost = useCallback(
    ({ item, index }: ListRenderItemInfo<PostListItem>) => {
      const { post } = item;

      return (
        <GridImageListItem
          index={index}
          post={post}
          posts={posts}
          discount={post?.product?.discount}
          expirationTime={post?.expirationTime}
        />
      );
    },
    []
  );

  const loading = isLoading && !isFetchingNextPage;
  const keyExtractor = useCallback((item: PostListItem) => item.id, []);

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage
        title={t("lastMinute")}
        description={t("noFoundOffers")}
      />
    );
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <FlatList
          numColumns={3}
          data={posts}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
        />
      )}
    </>
  );
};
