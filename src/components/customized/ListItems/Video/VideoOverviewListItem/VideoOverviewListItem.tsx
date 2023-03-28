import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import { memo, useRef, useCallback, useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type IProps = {
  uri: string;
  id: string;
  onPress: () => void;
};

const VideoOverviewListItem = ({ uri, onPress, id }: IProps) => {
  const ref = useRef<Video | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      ref.current?.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View style={styles.box}>
        <SharedElement id={id} style={{ flex: 1 }}>
          <Video
            ref={ref}
            style={styles.video}
            source={{ uri }}
            useNativeControls={false}
            shouldPlay={true}
            isMuted={true}
            isLooping={true}
            resizeMode={ResizeMode.COVER}
          />
        </SharedElement>
      </View>
    </Pressable>
  );
};

export default memo(VideoOverviewListItem);

const styles = StyleSheet.create({
  container: { flex: 1 },
  box: {
    width: width / 3,
    height: width / 1.75,
    marginRight: 6,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  video: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
});
