import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import { memo } from "react";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

type IProps = {
  uri: string;
  id: string;
  onPress: () => void;
};

const PostVideoOverviewListItem = ({ uri, onPress }: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={["#f1f1f1", "#d9d9d9"]}
        start={{ x: 1, y: 0.4 }}
        end={{ x: 1, y: 0.9 }}
        style={{ width: width / 3, height: width / 1.75, marginRight: 6 }}
      >
        <Video
          style={styles.video}
          source={{ uri }}
          useNativeControls={false}
          shouldPlay={true}
          isMuted={true}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
        />
      </LinearGradient>
    </Pressable>
  );
};

export default memo(PostVideoOverviewListItem);

const styles = StyleSheet.create({
  container: { flex: 1, height: width / 1.75 },
  video: {
    width: width / 3,
    height: width / 1.75,
    marginRight: 6,
    borderRadius: 5,
  },
});
