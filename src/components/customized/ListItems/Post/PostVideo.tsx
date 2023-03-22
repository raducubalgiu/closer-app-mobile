import { useWindowDimensions } from "react-native";
import { memo, useCallback, useRef, useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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
};

export default memo(PostVideo);
