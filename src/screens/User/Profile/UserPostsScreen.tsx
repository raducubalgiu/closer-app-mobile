import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { Header } from "../../../components/core";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Post } from "../../../ts";
import { ResizeMode, Video } from "expo-av";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVector, snapPoint } from "react-native-redash";
import { useNavigation } from "@react-navigation/native";
import PostListItem from "../../../components/customized/ListItems/Post/PostListItem";
import { SharedElement } from "react-navigation-shared-element";

type IProps = NativeStackScreenProps<RootStackParams, "UserPosts">;

export const UserPostsScreen = ({ route }: IProps) => {
  const { post } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const translation = useVector();
  const AnimatedVideo = Animated.createAnimatedComponent(Video);

  const isGestureActive = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationX, translationY, velocityX, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height / 2]) === height / 2 ||
        snapPoint(translationX, velocityX, [0, 0.1]) === 0.1;

      if (snapBack) {
        runOnJS(navigation.goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      flex: 1,
      backgroundColor: "white",
      paddingTop: insets.top,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style, borderStyle]}>
        <Header title="Postari" />
        {/* <SharedElement id={post.id} style={{ flex: 1 }}>
          <Image
            source={{ uri: post?.images[0]?.url }}
            style={{
              width: undefined,
              height: 500,
              resizeMode: "cover",
            }}
          />
        </SharedElement> */}
        <PostListItem post={post} isLiked={false} isBookmarked={false} />
      </Animated.View>
    </PanGestureHandler>
  );
};
