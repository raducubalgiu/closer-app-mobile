import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spinner } from "../../components/core";
import { HeaderFeed } from "../../components/customized";
import { Divider } from "@rneui/themed";
import { useAuth, useGet, usePost } from "../../hooks";
import { Post } from "../../ts";
import { RootStackParams } from "../../navigation/rootStackParams";
import HeadingAction from "../../components/core/Heading/HeadingAction";
import VideoOverviewListItem from "../../components/customized/ListItems/Video/VideoOverviewListItem/VideoOverviewListItem";
import PostImageListItem from "../../components/customized/ListItems/Post/PostImageListItem";
import PostVideoListItem from "../../components/customized/ListItems/Post/PostVideoListItem";
import PostCarouselListItem from "../../components/customized/ListItems/Post/PostCarouselListItem";
import { filter } from "lodash";

type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const FeedExploreScreen = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [hasNext, setHasNext] = useState<null | number>(null);
  const [page, setPage] = useState(1);
  const ref = useRef<any>(null);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [visibleItem, setVisibleItem] = useState<PostListItem | null>(null);
  useScrollToTop(ref);

  const { isInitialLoading, isPreviousData, isRefetching } = useGet({
    model: "posts",
    uri: `/users/${user?.id}/posts/get-all-posts?page=${page}&limit=20`,
    options: {
      onSuccess: (response) => {
        if (response.data.next !== hasNext) {
          setHasNext(response.data.next);
          setPosts((posts) => posts.concat(response.data.results));
        }
      },
      keepPreviousData: true,
    },
  });

  const { data: videos } = useGet({
    model: "videos",
    uri: `/users/${user?.id}/posts/get-all-posts?page=1&limit=5&postType=video`,
  });

  // const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  // const refreshControl = (
  //   <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  // );

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      switch (item.post.postType) {
        case "carousel":
          return (
            <PostCarouselListItem
              post={item?.post}
              isLiked={item?.isLiked}
              isBookmarked={item?.isBookmarked}
              isVisible={visibleItem?.post.id === item.post.id}
            />
          );
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

  const trackPost = useCallback((item: PostListItem) => {
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

  const onViewableSaveView = useCallback(
    (info: { changed: Array<ViewToken> }): void => {
      const visibleItems = filter(info.changed, { isViewable: true });
      visibleItems.forEach((visible: ViewToken) => {
        saveView(visible.item);
      });
    },
    []
  );

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

  const loadMore = () => {
    if (!!hasNext && !isPreviousData) {
      setPage((page) => page + 1);
    }
  };

  const footer = (
    <>{isRefetching ? <Spinner sx={{ paddingVertical: 30 }} /> : null}</>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={0} />
      {!isInitialLoading && (
        <FlatList
          ref={ref}
          ListHeaderComponent={
            <>
              <HeadingAction
                title={t("videoclips")}
                onPress={() => goToVideoExplore(videos[0], 0)}
              />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={videos?.results}
                keyExtractor={keyExtractorVideo}
                renderItem={renderVideo}
                contentContainerStyle={styles.flatList}
              />
              <Divider color="#ddd" style={{ marginTop: 15 }} />
            </>
          }
          //refreshControl={refreshControl}
          data={posts}
          renderItem={renderPost}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          //estimatedItemSize={725}
        />
      )}
      {isInitialLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "white", flex: 1 },
  flatList: { paddingLeft: 10, paddingRight: 5 },
  avatarBadge: { margin: 2.1, borderWidth: 1.5, borderColor: "white" },
  storyTxt: { fontSize: 12.5, marginTop: 5 },
});
