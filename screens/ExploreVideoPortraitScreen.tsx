import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useCallback } from "react";
import VideoPortraitListItem from "../components/customized/ListItems/VideoPortraitListItem/VideoPortraitListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetPaginate } from "../hooks";
import { Spinner } from "../components/core";

const { height } = Dimensions.get("window");

export const ExploreVideoPortraitScreen = () => {
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
    limit: "20",
    //enabled: isFocused,
  });

  const renderVideo = useCallback(({ item }: { item: any }) => {
    return <VideoPortraitListItem post={item} />;
  }, []);

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

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        initialNumToRender={5}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={height}
        decelerationRate="fast"
        pagingEnabled={true}
        disableIntervalMomentum={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
