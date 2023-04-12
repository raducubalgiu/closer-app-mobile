import { Animated, ListRenderItemInfo } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAuth, useGetPaginate, usePaginateActions } from "../../../../hooks";
import GridImageListItem from "../../ListItems/Grid/GridImage/GridImageListItem";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { Spinner } from "../../../core";
import { Post } from "../../../../ts";

type IProps = { name: string; onScroll: () => void; headerHeight: number };
type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const HashtagPostsPopularTab = ({
  name,
  onScroll,
  headerHeight,
}: IProps) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const options = useGetPaginate({
    model: "hPopular",
    uri: `/users/${user?.id}/hashtags/${name}/posts/popular`,
    limit: "27",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    return (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  const renderPosts = useCallback(
    ({ item, index }: ListRenderItemInfo<PostListItem>) => {
      const { post } = item;

      return (
        <GridImageListItem
          index={index}
          post={post}
          discount={post?.product.discount}
          expirationTime={post.expirationTime}
          posts={posts}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: PostListItem) => item.post.id, []);

  return (
    <>
      {isLoading && !isFetchingNextPage && <Spinner />}
      <Animated.FlatList
        numColumns={3}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingBottom: headerHeight }}
        bounces={false}
      />
    </>
  );
};
