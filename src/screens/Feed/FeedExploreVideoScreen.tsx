import {
  FlatList,
  Dimensions,
  View,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";
import { useCallback, useState, useRef } from "react";
import { usePost, useAuth } from "../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import VideoListItemm from "../../components/customized/ListItems/Video/VideoListItemm/VideoListItemm";
import { Video } from "expo-av";
import { findIndex, filter } from "lodash";
import { Post } from "../../ts";
import * as Animatable from "react-native-animatable";
import VideoListItem from "../../components/customized/ListItems/Video/VideoListItem/VideoListItem";

const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "FeedExploreVideo">;
type PostListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};
type VideoRef = { ref: Video; key: string };

export const FeedExploreVideoScreen = ({ route }: IProps) => {
  const { index, videos, video } = route.params;
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const VIDEO_HEIGHT = height - tabBarHeight;
  const videoRefs = useRef<VideoRef[]>([]);

  console.log("VIDEOS!!!", videos);

  const addToRefs = (ref: Video, item: PostListItem) => {
    const key = item.post.id;

    if (ref && !videoRefs.current.includes({ ref, key })) {
      videoRefs.current.push({ ref, key });
    }
    return ref;
  };

  const renderVideo = useCallback(
    ({ item }: ListRenderItemInfo<PostListItem>) => {
      return (
        <VideoListItemm ref={(ref: Video) => addToRefs(ref, item)} {...item} />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: PostListItem) => item?.post?.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: VIDEO_HEIGHT,
      offset: VIDEO_HEIGHT * index,
      index,
    }),
    []
  );

  const { mutate } = usePost({ uri: `/posts/views` });

  const onViewableItemsChanged = useRef(
    (info: { changed: Array<ViewToken> }) => {
      info.changed.forEach(({ index, key, isViewable }: ViewToken) => {
        const postIndex = findIndex(videoRefs.current, { key });
        const { ref } = videoRefs.current[postIndex];
        if (index === postIndex && isViewable) {
          ref.playFromPositionAsync(0);
        } else {
          ref.pauseAsync();
        }
      });
    }
  ).current;

  const onViewableSaveView = useRef((info: { changed: Array<ViewToken> }) => {
    const visibleItems = filter(info.changed, { isViewable: true });

    visibleItems.forEach(({ item }: ViewToken) => {
      mutate({
        postId: item.post.id,
        userId: user?.id,
        from: "explore",
      });
    });
  }).current;

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 80,
        minimumViewTime: 2000,
      },
      onViewableItemsChanged: onViewableSaveView,
    },
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 60 },
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]).current;

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.0}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        initialScrollIndex={index}
        onEndReachedThreshold={0.3}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      />
    </View>
  );
};
