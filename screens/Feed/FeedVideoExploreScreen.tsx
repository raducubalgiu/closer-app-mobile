import { FlatList, Dimensions, View, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import VideoListItem from "../../components/customized/ListItems/VideoListItem/VideoListItem";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";

const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "FeedVideoExplore">;

export const FeedVideoExploreScreen = ({ route }: IProps) => {
  const { initialIndex } = route.params;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [visibleItem, setVisibleItem] = useState<any>(null);

  const options = useGetPaginate({
    model: "videos",
    uri: `/posts/get-all-posts`,
    queries: `postType=video&orientation=portrait`,
    limit: "20",
  });

  const { isLoading, isFetching, refetch } = options;
  const loading = isLoading || isFetching;
  const { data: videos, loadMore, showSpinner } = usePaginateActions(options);

  const renderVideo = useCallback(
    ({ item }: { item: any }) => (
      <VideoListItem
        post={item}
        isLoading={loading}
        setScrollEnabled={setScrollEnabled}
        isVisible={visibleItem?.id === item?.id}
      />
    ),
    [loading, visibleItem]
  );

  const keyExtractor = useCallback((item: any) => item?.id, []);

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const viewabilityConfig = { itemVisiblePercentThreshold: 95 };

  const trackItem = useCallback((item: any) => {
    setVisibleItem(item);
  }, []);

  const onViewableItemsChanged = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.0}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={showSpinner}
        scrollEnabled={scrollEnabled}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};
