import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { HeaderFeed } from "../../components/customized";
import PostListItem from "../../components/customized/ListItems/Post/PostListItem";
import { Post } from "../../models";
import { Divider } from "@rneui/themed";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../hooks";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../components/core";
import FeedExploreVideosList from "../../components/customized/Lists/FeedExploreVideosList";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const FeedLastMinuteScreen = () => {
  const ref = useRef<FlatList>(null);
  useScrollToTop(ref);
  const { t } = useTranslation("common");
  const { user } = useAuth();

  const optionsVideos = useGetPaginate({
    model: "lastMinuteVideos",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    queries: "postType=video&orientation=portrait",
    limit: "10",
  });

  const optionsPosts = useGetPaginate({
    model: "lastMinutePosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    queries: "postType=photo",
    limit: "10",
  });

  const {
    isLoading: isLoadingPosts,
    isRefetching: isRefetchingPosts,
    refetch,
    isFetchingNextPage,
  } = optionsPosts;
  const {
    data: posts,
    showSpinner,
    loadMore,
  } = usePaginateActions(optionsPosts);

  const { isLoading: isLoadingVideos, isRefetching: isRefetchingVideos } =
    optionsVideos;
  const { data: videos } = usePaginateActions(optionsVideos);

  const loading =
    (isLoadingPosts ||
      isLoadingVideos ||
      isRefetchingPosts ||
      isRefetchingVideos) &&
    !isFetchingNextPage;

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      return (
        <PostListItem
          post={item?.post}
          isLiked={item.isLiked}
          isBookmarked={item.isBookmarked}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: PostListItem) => item.post.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const header = <FeedExploreVideosList videos={videos} />;

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={2} />
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
