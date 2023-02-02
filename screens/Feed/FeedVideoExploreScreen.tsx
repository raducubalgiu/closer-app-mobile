import { FlatList, Dimensions, View, RefreshControl } from "react-native";
import { useCallback } from "react";
import VideoPortraitListItem from "../../components/customized/ListItems/VideoListItem/VideoListItem";
import { useGetPaginate, useRefreshByUser } from "../../hooks";
import { Spinner } from "../../components/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../models/navigation/rootStackParams";

const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "FeedVideoExplore">;

export const FeedVideoExploreScreen = ({ route }: IProps) => {
  const { initialIndex } = route.params;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "videos",
    uri: `/posts/get-all-posts`,
    queries: `postType=video&orientation=portrait`,
    limit: "5",
  });

  const loading = isLoading || isFetching;

  const renderVideo = useCallback(
    ({ item }: { item: any }) => {
      return <VideoPortraitListItem post={item} isLoading={loading} />;
    },
    [loading]
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const videos = pages?.map((page) => page.results).flat();
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

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        refreshControl={refreshControl}
        initialNumToRender={5}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate={0.5}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex ? initialIndex : 0}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={showSpinner}
      />
    </View>
  );
};
