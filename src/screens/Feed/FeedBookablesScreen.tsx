import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import FeedExploreVideosList from "../../components/customized/Lists/FeedExploreVideosList";
import PostListItem from "../../components/customized/ListItems/Post/PostListItem";
import { HeaderFeed } from "../../components/customized";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
  usePost,
} from "../../hooks";
import { Post } from "../../models/post";
import { Spinner } from "../../components/core";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const FeedBookablesScreen = () => {
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { user } = useAuth();
  const [visibleItem, setVisibleItem] = useState<PostListItem | null>(null);

  const optionsVideo = useGetPaginate({
    model: "bookablePosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    limit: "10",
    queries: "postType=video&bookable=true&orientation=portrait",
  });

  const { data: videos } = usePaginateActions(optionsVideo);
  const { isLoading: isLoadingVideos } = optionsVideo;

  const options = useGetPaginate({
    model: "bookablePosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    limit: "10",
    queries: "postType=photo&bookable=true",
  });

  const { isLoading: isLoadingPosts, isFetchingNextPage } = options;
  const loading = (isLoadingPosts || isLoadingVideos) && !isFetchingNextPage;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      return (
        <PostListItem
          post={item?.post}
          isLiked={item?.isLiked}
          isBookmarked={item?.isBookmarked}
          isVisible={visibleItem?.post.id === item.post.id}
        />
      );
    },
    [visibleItem]
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(options?.refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const header = <FeedExploreVideosList videos={videos} />;

  const viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 65,
  };

  const { mutate } = usePost({ uri: `/posts/views` });

  const trackItem = useCallback((item: PostListItem) => {
    setVisibleItem(item);
    const { post } = item;
    mutate({ postId: post.id, userId: user?.id, from: "explore" });
  }, []);

  const onViewableItemsChanged = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={1} />
      <>
        {!loading && (
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
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        )}
        {loading && <Spinner />}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
