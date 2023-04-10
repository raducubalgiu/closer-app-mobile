import { StyleSheet, View, Pressable, useWindowDimensions } from "react-native";
import { ForwardedRef, forwardRef, memo, useRef } from "react";
import { Post } from "../../../../../ts";
import { Video, ResizeMode } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import VideoDetails from "./VideoDetails";

type IProps = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

const VideoListItemm = forwardRef(
  ({ id, post, isLiked, isBookmarked }: IProps, ref: ForwardedRef<Video>) => {
    const { width, height } = useWindowDimensions();
    const tabBarHeight = useBottomTabBarHeight();
    const VIDEO_HEIGHT = height - tabBarHeight;

    return (
      <View style={styles.container}>
        <Pressable onPress={() => {}} style={{ width, height: VIDEO_HEIGHT }}>
          <SharedElement id={post?.id} style={{ flex: 1 }}>
            <Video
              ref={ref}
              style={{
                width: undefined,
                height: undefined,
                ...StyleSheet.absoluteFillObject,
              }}
              source={{ uri: post?.images[0]?.url }}
              useNativeControls={false}
              shouldCorrectPitch={true}
              isMuted={false}
              isLooping={false}
              resizeMode={ResizeMode.COVER}
            />
            <VideoDetails />
          </SharedElement>
        </Pressable>
      </View>
    );
  }
);

export default memo(VideoListItemm);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
