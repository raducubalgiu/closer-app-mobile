import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
} from "react-native";
import { useCallback, useRef } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostVideoOverviewListItem from "../../components/customized/ListItems/Post/PostVideoOverviewListItem";
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

type PostListItem = { post: Post; isLiked: boolean; isBookmarked: boolean };

export const FeedExploreScreen = () => {
  const { user } = useAuth();
  const ref = useRef<FlatList>(null);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const video = useRef<Video>(null);

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
        />
      );
    },
    []
  );

  const renderVideo = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => {
      return (
        <PostVideoOverviewListItem
          uri={item?.images[0]?.url}
          id={item.id}
          onPress={() =>
            navigation.push("FeedVideoExplore", { initialIndex: index })
          }
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);
  const keyExtractorVideo = useCallback((item: Post) => item?.id, []);
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

  const goToVideos = () =>
    navigation.navigate("FeedVideoExplore", {
      initialIndex: 0,
    });

  const viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 65,
    //minimumViewTime: 2000,
  };

  const { mutate } = usePost({ uri: `/posts/views` });

  const trackItem = useCallback((item: PostListItem) => {
    // const { post } = item;
    // mutate({ postId: post.id, userId: user?.id, from: "explore" });
  }, []);

  const onViewableItemsChanged = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={0} />
      {!loading && (
        <FlatList
          ref={ref}
          // ListHeaderComponent={
          //   <>
          //     <HeadingAction title={t("videoclips")} onPress={goToVideos} />
          //     <FlatList
          //       horizontal
          //       showsHorizontalScrollIndicator={false}
          //       data={videos}
          //       keyExtractor={keyExtractorVideo}
          //       renderItem={renderVideo}
          //       contentContainerStyle={{ paddingLeft: 10, paddingRight: 5 }}
          //     />
          //     <Divider color="#ddd" style={{ marginTop: 15 }} />
          //     <HeadingAction title={t("stories")} onPress={() => {}} />
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
          //     />
          //   </>
          // }
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
