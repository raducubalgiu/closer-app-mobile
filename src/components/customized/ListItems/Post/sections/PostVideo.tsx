import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { memo, useRef, useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

type IProps = { uri: string; isVisible: boolean };

const PostVideo = ({ uri, isVisible }: IProps) => {
  const { width } = useWindowDimensions();
  const ref = useRef<Video>(null);
  const navigation = useNavigation();
  const aspectRatio = 4 / 5;

  useEffect(() => {
    if (isVisible) {
      ref.current?.playFromPositionAsync(0);
    } else {
      ref.current?.pauseAsync();
    }
  }, [isVisible]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      ref.current?.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      width,
      height: width * 1.25,
      backgroundColor: "black",
    },
    video: {
      width: undefined,
      height: undefined,
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      //opacity: status?.didJustFinish ? 0 : 0.7,
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
      {/* <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        <Pressable onPress={() => ref.current?.playFromPositionAsync(0)}>
          <Icon name="replay" color="white" size={40} />
        </Pressable>
      </View> */}
    </View>
  );
};

export default memo(PostVideo);
