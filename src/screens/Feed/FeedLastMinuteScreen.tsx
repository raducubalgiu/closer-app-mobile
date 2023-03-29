import { StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { HeaderFeed } from "../../components/customized";
import { Divider } from "@rneui/themed";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
  usePost,
} from "../../hooks";
import { Post } from "../../ts";
import { Spinner } from "../../components/core";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import HeadingAction from "../../components/core/Heading/HeadingAction";
import PostImageListItem from "../../components/customized/ListItems/Post/PostImageListItem";
import PostVideoListItem from "../../components/customized/ListItems/Post/PostVideoListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import VideoOverviewListItem from "../../components/customized/ListItems/Video/VideoOverviewListItem/VideoOverviewListItem";
import { useTranslation } from "react-i18next";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const FeedLastMinuteScreen = () => {
  const ref = useRef<any>(null);
  useScrollToTop(ref);
  const { user } = useAuth();
  const [visibleItem, setVisibleItem] = useState<PostListItem | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const optionsVideo = useGetPaginate({
    model: "bookablePosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    limit: "10",
    queries: "postType=video&bookable=lastMinute",
  });

  const { data: videos } = usePaginateActions(optionsVideo);
  const { isLoading: isLoadingVideos } = optionsVideo;

  const options = useGetPaginate({
    model: "bookablePosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    limit: "10",
    queries: "bookable=lastMinute",
  });

  const { isLoading: isLoadingPosts, isFetchingNextPage } = options;
  const loading = (isLoadingPosts || isLoadingVideos) && !isFetchingNextPage;
  const { data: posts, showSpinner, loadMore } = usePaginateActions(options);

  const { refreshing, refetchByUser } = useRefreshByUser(options?.refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      switch (item.post.postType) {
        case "photo":
          return (
            <PostImageListItem
              post={item?.post}
              isLiked={item?.isLiked}
              isBookmarked={item?.isBookmarked}
              isVisible={visibleItem?.post.id === item.post.id}
            />
          );
        case "video":
          return (
            <PostVideoListItem
              post={item?.post}
              isLiked={item?.isLiked}
              isBookmarked={item?.isBookmarked}
              isVisible={visibleItem?.post.id === item.post.id}
            />
          );
        default:
          return null;
      }
    },
    [visibleItem]
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);

  const renderVideo = useCallback(({ item, index }: any) => {
    return (
      <VideoOverviewListItem
        onPress={() => goToVideoExplore(item, index)}
        uri={item?.post?.images[0]?.url}
        id={item?.id}
      />
    );
  }, []);

  const keyExtractorVideo = useCallback(
    (item: PostListItem) => item?.post?.id,
    []
  );

  const viewabilityConfigSetItem = { itemVisiblePercentThreshold: 50 };
  const viewabilityConfigSaveView = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 2000,
  };

  const goToVideoExplore = (item: PostListItem, index: number) => {
    navigation.navigate("FeedExploreVideo", {
      video: item.post,
      videos,
      index,
    });
  };

  const trackPost = useCallback((item: any) => {
    setVisibleItem(item);
  }, []);

  const onViewableSetItem = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackPost(visible.item);
    });
  }, []);

  const { mutate } = usePost({ uri: `/posts/views` });

  const saveView = useCallback((item: any) => {
    const { post } = item;
    mutate({ postId: post.id, userId: user?.id, from: "explore" });
  }, []);

  const onViewableSaveView = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      saveView(visible.item);
    });
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: viewabilityConfigSetItem,
      onViewableItemsChanged: onViewableSetItem,
    },
    {
      viewabilityConfig: viewabilityConfigSaveView,
      onViewableItemsChanged: onViewableSaveView,
    },
  ]);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={2} />
      <>
        {!loading && (
          <FlashList
            ref={ref}
            ListHeaderComponent={
              <>
                <HeadingAction title={t("videoclips")} onPress={() => {}} />
                <FlashList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={videos}
                  keyExtractor={keyExtractorVideo}
                  renderItem={renderVideo}
                  contentContainerStyle={styles.flatList}
                  estimatedItemSize={214}
                />
                <Divider color="#ddd" style={{ marginTop: 15 }} />
              </>
            }
            refreshControl={refreshControl}
            data={posts}
            renderItem={renderPost}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={showSpinner}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            estimatedItemSize={725}
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
  flatList: { paddingLeft: 10, paddingRight: 5 },
});
