import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useCallback } from "react";
import VideoPortraitListItem from "../components/customized/ListItems/VideoPortraitListItem/VideoPortraitListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    uri: "https://res.cloudinary.com/closer-app/video/upload/v1671105330/video-portrait-1_bwqst6.mp4",
    username: "raducubalgiu",
    bookable: false,
    ratingsAverage: 4.5,
    checkmark: true,
    avatar:
      "https://res.cloudinary.com/closer-app/image/upload/v1667841461/raducu-balgiu-avatar_ejmoaf.jpg",
    description: "Travel is my life and i love to travel a lot",
  },
  {
    id: "2",
    uri: "https://res.cloudinary.com/closer-app/video/upload/v1671112654/video-tiktok-2_zrfum3.mp4",
    username: "johny_balboa",
    bookable: false,
    ratingsAverage: 0,
    checkmark: false,
    avatar:
      "https://res.cloudinary.com/closer-app/image/upload/v1667549586/florin-bratu-1_rggozs.jpg",
    description: "I love to travel and my dream is to go to USA",
  },
  {
    id: "3",
    uri: "https://res.cloudinary.com/closer-app/video/upload/v1671106547/video-portrait-2_brnugy.mp4",
    username: "johny_bravo",
    bookable: true,
    ratingsAverage: 0,
    checkmark: true,
    avatar:
      "https://res.cloudinary.com/closer-app/image/upload/v1667548703/rowanrow-1_qpgnus.jpg",
    description: "I love to travel and my dream is to go to USA",
  },
];

const { height } = Dimensions.get("window");

export const ExploreVideoPortraitScreen = () => {
  const renderVideo = useCallback(
    ({ item }: { item: any }) => <VideoPortraitListItem post={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={DATA}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        snapToInterval={height}
        initialNumToRender={5}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled={true}
        //bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
