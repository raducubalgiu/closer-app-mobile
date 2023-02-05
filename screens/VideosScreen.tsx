import { FlatList, ListRenderItemInfo, Dimensions, View } from "react-native";
import { useCallback, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import VideoListItem from "../components/customized/ListItems/VideoListItem/VideoListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Post } from "../models/post";
import { useGetPaginate } from "../hooks";

const { height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "Videos">;

export const VideosScreen = ({ route }: IProps) => {
  const isFocused = useIsFocused();
  const { initialIndex, userId } = route.params;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const { data, hasNextPage, fetchNextPage, isLoading } = useGetPaginate({
    model: "posts",
    uri: `/users/${userId}/posts`,
    limit: "6",
    queries: "postType=video&orientation=portrait",
    enabled: isFocused,
  });

  const { pages } = data || {};
  const videos = pages?.map((page) => page.results).flat() || [];

  const renderPosts = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <VideoListItem
        post={item}
        isLoading={isLoading}
        setScrollEnabled={setScrollEnabled}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item?.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderPosts}
        initialScrollIndex={initialIndex}
        getItemLayout={getItemLayout}
        initialNumToRender={5}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate={0.5}
        pagingEnabled={true}
        scrollEnabled={scrollEnabled}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};
