import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spinner } from "../../components/core";
import { HeaderFeed } from "../../components/customized";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  usePost,
  useRefreshByUser,
} from "../../hooks";
import { Post } from "../../models/post";
import { RootStackParams } from "../../navigation/rootStackParams";
import StoryAvatarListItem from "../../components/customized/ListItems/Story/StoryAvatarListItem";
import PostListItem from "../../components/customized/ListItems/Post/PostListItem";
import { Video } from "expo-av";
import FeedExploreVideosList from "../../components/customized/Lists/FeedExploreVideosList";

type PostListItem = { post: Post; isLiked: boolean; isBookmarked: boolean };

export const FeedExploreScreen = () => {
  const { user } = useAuth();
  const ref = useRef<FlatList>(null);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const video = useRef<Video>(null);
  const [visibleItem, setVisibleItem] = useState<PostListItem | null>(null);

  const postsOptions = useGetPaginate({
    model: "allPosts",
    uri: `/users/${user?.id}/posts/get-all-posts`,
    limit: "20",
  });

  const videosOptions = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    limit: "5",
    queries: "postType=video&orientation=portrait",
  });

  const storiesOptions = useGetPaginate({
    model: "followings",
    uri: `/users/${user?.id}/followings`,
    limit: "20",
  });

  const {
    isLoading: isLoadingPosts,
    isFetchingNextPage,
    refetch,
  } = postsOptions;

  const {
    data: posts,
    loadMore,
    showSpinner,
  } = usePaginateActions(postsOptions);

  const { isLoading: isLoadingVideos } = videosOptions;
  const { data: videos } = usePaginateActions(videosOptions);
  const { data: stories } = usePaginateActions(storiesOptions);
  const loading = (isLoadingPosts || isLoadingVideos) && !isFetchingNextPage;

  useScrollToTop(ref);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      return (
        <PostListItem
          post={item?.post}
          isLiked={item?.isLiked}
          isBookmarked={item?.isBookmarked}
          ref={video}
          isVisible={visibleItem?.post.id === item.post.id}
        />
      );
    },
    [visibleItem]
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);
  const keyExtractorStory = useCallback((item: any) => item.id, []);

  const renderStoryAvatar = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <StoryAvatarListItem
        username={item?.followeeId?.username}
        avatar={item?.followeeId?.avatar}
        onPress={() =>
          navigation.navigate("Story", { userId: item?.followeeId?.id })
        }
      />
    ),
    []
  );

  const goToVideos = () => {};

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

  const header = <FeedExploreVideosList videos={videos} />;

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={0} />
      {!loading && (
        <FlatList
          ref={ref}
          // ListHeaderComponent={
          //   <>
          //     <FeedExploreVideosList videos={videos} />
          //     <Divider color="#ddd" style={{ marginTop: 15 }} />
          //     {/* <HeadingAction title={t("stories")} onPress={() => {}} />
          //     <FlatList
          //       ListHeaderComponent={
          //         <Stack sx={{ paddingLeft: 10 }}>
          //           <AvatarBadge
          //             avatar={user?.avatar}
          //             size={67}
          //             sx={styles.avatarBadge}
          //           />
          //           <Text style={styles.storyTxt}>Povestea ta</Text>
          //         </Stack>
          //       }
          //       data={stories}
          //       horizontal
          //       keyExtractor={keyExtractorStory}
          //       showsHorizontalScrollIndicator={false}
          //       renderItem={renderStoryAvatar}
          //     />
          //     <Divider
          //       color="#ddd"
          //       style={{ marginTop: 15, marginBottom: 10 }}
          //     /> */}
          //   </>
          // }
          // ListHeaderComponent={header}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  avatarBadge: { margin: 2.1, borderWidth: 1.5, borderColor: "white" },
  storyTxt: { fontSize: 12.5, marginTop: 5 },
});
