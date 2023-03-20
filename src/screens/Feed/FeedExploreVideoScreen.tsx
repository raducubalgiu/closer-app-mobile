import { FlatList, Dimensions, View, RefreshControl } from "react-native";
import { useCallback, useState, useRef } from "react";
import VideoListItem from "../../components/customized/ListItems/Video/VideoListItem/VideoListItem";
import { usePost, useAuth } from "../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";

const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "FeedExploreVideo">;

export const FeedExploreVideoScreen = ({ route }: IProps) => {
  const { index, videos, video } = route.params;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [visibleItem, setVisibleItem] = useState<any>(null);
  const { user } = useAuth();

  const { mutate } = usePost({ uri: `/posts/views` });

  const viewabilityConfigPlayVideo = { itemVisiblePercentThreshold: 95 };
  const viewabilityConfigSaveView = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 75,
    minimumViewTime: 3000,
  };

  const trackItem = useCallback((item: any) => {
    setVisibleItem(item);
  }, []);

  const onViewablePlayVideo = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  const saveView = useCallback((item: any) => {
    mutate({ postId: item.id, userId: user?.id, from: "explore" });
  }, []);

  const onViewableSaveView = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      saveView(visible.item);
    });
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: viewabilityConfigPlayVideo,
      onViewableItemsChanged: onViewablePlayVideo,
    },
    {
      viewabilityConfig: viewabilityConfigSaveView,
      onViewableItemsChanged: onViewableSaveView,
    },
  ]);

  const renderVideo = useCallback(
    ({ item }: { item: any }) => {
      return (
        <VideoListItem
          video={item.post}
          setScrollEnabled={setScrollEnabled}
          isVisible={visibleItem?.id === item?.post?.id}
        />
      );
    },
    [visibleItem]
  );

  const keyExtractor = useCallback((item: any) => item?.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.0}
        bounces={false}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        initialScrollIndex={index}
        onEndReachedThreshold={0.3}
        scrollEnabled={scrollEnabled}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};
