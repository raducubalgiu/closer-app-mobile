import { StyleSheet, useWindowDimensions, View } from "react-native";
import { memo, useCallback, useRef, useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

type IProps = { uri: string; isVisible: boolean };

const PostVideo = ({ uri, isVisible }: IProps) => {
  const { width } = useWindowDimensions();
  const ref = useRef<Video>(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (isVisible) {
        ref.current?.playFromPositionAsync(0);
      } else {
        ref.current?.pauseAsync();
      }
    }, [isVisible])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      ref.current?.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      width,
      height: 500,
      backgroundColor: "#f1f1f1",
    },
    video: {
      width: undefined,
      height: undefined,
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
      <Video
        ref={ref}
        source={{ uri }}
        style={styles.video}
        isMuted={false}
        shouldPlay={false}
        rate={1.0}
        shouldCorrectPitch={true}
        isLooping={false}
        resizeMode={ResizeMode.COVER}
      />
      {/* <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "black",
          opacity: 0.2,
        }}
      >
        <Icon
          name="replay"
          style={{
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        />
      </View> */}
    </View>
  );
};

export default memo(PostVideo);
