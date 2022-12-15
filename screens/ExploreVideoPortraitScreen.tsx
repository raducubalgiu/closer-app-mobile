import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useCallback } from "react";
import VideoPortraitListItem from "../components/customized/ListItems/VideoPortraitListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671112643/video-tiktok-1_eadbrw.mp4",
    description: "Travel is my life",
    bgColor: "red",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671112654/video-tiktok-2_zrfum3.mp4",
    description: "I love to travel",
    bgColor: "blue",
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671106547/video-portrait-2_brnugy.mp4",
    description: "I love to travel",
    bgColor: "yellow",
  },
];

const { height } = Dimensions.get("window");

export const ExploreVideoPortraitScreen = () => {
  const insets = useSafeAreaInsets();

  const renderVideo = useCallback(
    ({ item }: { item: any }) => (
      <VideoPortraitListItem uri={item.url} bgColor={item.bgColor} />
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <FlatList
      data={DATA}
      keyExtractor={keyExtractor}
      renderItem={renderVideo}
      snapToInterval={height - insets.top - insets.bottom}
      initialNumToRender={5}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      pagingEnabled={true}
      bounces={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});
