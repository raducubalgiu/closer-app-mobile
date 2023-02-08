import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import { Icon } from "@rneui/themed";
import { memo } from "react";
import { ResizeMode, Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";

const { width } = Dimensions.get("window");

type IProps = {
  uri: string;
  id: string;
  onPress: () => void;
};

const PostVideoOverviewListItem = ({ uri, id, onPress }: IProps) => {
  return (
    <SharedElement id={id} style={styles.container}>
      <Pressable onPress={onPress}>
        <Video
          style={styles.video}
          source={{ uri }}
          useNativeControls={false}
          shouldPlay={true}
          isMuted={true}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
        />
      </Pressable>
    </SharedElement>
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
    backgroundColor: "#f1f1f1",
  },
});
