import { useCallback, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "@react-navigation/native";
import VideoLandscapeListItem from "../components/customized/ListItems/VideoLandscapeListItem";

const DATA = [
  {
    id: "1",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671035489/IMG_6668_tpqfwy.mov",
    description: "Lionel Messi reveals if he wants to play in final...",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671021391/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-medium_n4v1hg.mp4",
    description: "Roncero estalla contra Messi",
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671021461/mixkit-people-pouring-a-warm-drink-around-a-campfire-513-medium_knr1yg.mp4",
    description: "Something was really changed",
  },
  {
    id: "4",
    url: "https://res.cloudinary.com/closer-app/video/upload/v1671021517/mixkit-dual-highway-crossing-through-nature-44273-medium_tcf03a.mp4",
    description: "Hello guys, i am really grateful to be here...",
  },
];

const { height } = Dimensions.get("window");

export const ExploreVideoLandscape = () => {
  const ref = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.unlockAsync();
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    }, [])
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    []
  );

  const renderVideo = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <VideoLandscapeListItem
        avatar={[
          {
            url: "https://res.cloudinary.com/closer-app/image/upload/v1667841461/raducu-balgiu-avatar_ejmoaf.jpg",
          },
        ]}
        uri={item.url}
        description={item.description}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={DATA}
        ref={ref}
        keyExtractor={keyExtractor}
        renderItem={renderVideo}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        snapToInterval={height}
        initialNumToRender={5000}
        snapToAlignment={"center"}
        decelerationRate={0.1}
        pagingEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "black", flex: 1 },
});
