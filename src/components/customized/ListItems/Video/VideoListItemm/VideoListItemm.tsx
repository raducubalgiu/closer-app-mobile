import { StyleSheet, View, Pressable, useWindowDimensions } from "react-native";
import { ForwardedRef, forwardRef, memo, useRef } from "react";
import { Post } from "../../../../../ts";
import { Video, ResizeMode } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";

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
        <Pressable
          onPress={() => {}}
          style={{ width, height: VIDEO_HEIGHT, flex: 1 }}
        >
          <Video
            ref={ref}
            style={{
              width: undefined,
              height: undefined,
              ...StyleSheet.absoluteFillObject,
              flex: 1,
            }}
            source={{ uri: post?.images[0]?.url }}
            useNativeControls={false}
            shouldCorrectPitch={true}
            isMuted={false}
            isLooping={true}
            resizeMode={ResizeMode.COVER}
          />
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
