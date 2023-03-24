import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, ListRenderItemInfo } from "react-native";
import VideoListItem from "../../../components/customized/ListItems/Video/VideoListItem/VideoListItem";
import { Post } from "../../../ts";
import { RootStackParams } from "../../../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "UserVideos">;

export const UserVideosScreen = ({ route }: IProps) => {
  const { videos, id } = route.params;
  const [visibleItem, setVisibleItem] = useState<any>(null);

  const viewabilityConfigPlayVideo = { itemVisiblePercentThreshold: 95 };

  const trackItem = useCallback((item: any) => {
    setVisibleItem(item);
  }, []);

  const onViewablePlayVideo = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  const renderVideo = useCallback(({ item }: ListRenderItemInfo<Post>) => {
    return (
      <VideoListItem
        post={item}
        setScrollEnabled={() => {}}
        isVisible={!!visibleItem}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <FlatList
      data={videos}
      keyExtractor={keyExtractor}
      renderItem={renderVideo}
      initialScrollIndex={id}
      viewabilityConfig={viewabilityConfigPlayVideo}
      onViewableItemsChanged={onViewablePlayVideo}
    />
  );
};

const styles = StyleSheet.create({});
