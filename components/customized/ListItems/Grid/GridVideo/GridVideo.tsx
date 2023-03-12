import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { Video, ResizeMode } from "expo-av";

type IProps = { uri: string };

const GridVideo = ({ uri }: IProps) => {
  return (
    <Video
      style={{
        width: undefined,
        height: undefined,
        flex: 1,
      }}
      source={{ uri }}
      useNativeControls={false}
      shouldPlay={false}
      isMuted={true}
      isLooping={false}
      resizeMode={ResizeMode.COVER}
    />
  );
};

export default memo(GridVideo);

const styles = StyleSheet.create({});
