import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { forwardRef, memo } from "react";
import { ResizeMode, Video } from "expo-av";

type IProps = { uri: string };

const PostVideo = forwardRef(({ uri }: IProps, ref: any) => {
  const { width } = useWindowDimensions();

  return (
    <Video
      ref={ref}
      source={{ uri }}
      style={{ width, height: 500 }}
      isMuted={false}
      shouldPlay={false}
      isLooping={false}
      resizeMode={ResizeMode.COVER}
    />
  );
});

export default memo(PostVideo);

const styles = StyleSheet.create({});
