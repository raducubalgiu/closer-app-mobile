import { Pressable, StyleSheet, Dimensions, View } from "react-native";
import { memo, useRef, useState } from "react";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
type IProps = { uri: string; bgColor: string };

const { width, height } = Dimensions.get("window");

const VideoPortraitListItem = ({ uri, bgColor }: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = useRef<any>(null);
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      width,
      height: height - insets.bottom - insets.top,
      position: "relative",
    },
    video: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    infoContainer: {},
  });

  const handlePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  return (
    <Pressable style={styles.container} onPress={handlePlay}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri }}
        useNativeControls={false}
        onPlaybackStatusUpdate={() => {}}
        shouldPlay={isPlaying}
        isMuted={false}
        isLooping={true}
      />
      {/* <View style={styles.infoContainer}></View> */}
      <View
        style={{
          position: "absolute",
          top: (height - insets.bottom - insets.top) / 2,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        {!isPlaying && (
          <Icon name="play" type="ionicon" size={55} color="white" />
        )}
      </View>
    </Pressable>
  );
};

export default memo(VideoPortraitListItem);
