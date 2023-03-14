import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import PostListItem from "../../components/customized/ListItems/Post/PostListItem";
import { HeaderFeed, NoFoundMessage } from "../../components/customized";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../src/hooks";
import { Post } from "../../models/post";
import { useTranslation } from "react-i18next";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const FeedBookablesScreen = () => {
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "bookablePosts",
    uri: `/posts/get-all-posts`,
    limit: "10",
    queries: "postType=photo&bookable=true",
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      return (
        <PostListItem
          post={item?.post}
          isLiked={item?.isLiked}
          isBookmarked={item?.isBookmarked}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(options?.refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  let header;
  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    header = (
      <NoFoundMessage title={t("posts")} description={t("noFoundPosts")} />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={1} />
      <FlatList
        ref={ref}
        ListHeaderComponent={header}
        refreshControl={refreshControl}
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
