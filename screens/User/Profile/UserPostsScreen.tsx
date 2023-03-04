import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
  Image,
  Dimensions,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { Header } from "../../../components/core";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Post } from "../../../models";
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
import CardPost from "../../../components/customized/Cards/CardPost/CardPost";

const { width, height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "UserPosts">;

export const UserPostsScreen = ({ route }: IProps) => {
  const { id, posts } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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

  const borderStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isGestureActive.value ? 24 : 0),
  }));

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

  const renderPost = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <CardPost post={item} onShowDetails={() => {}} />
      //   <View style={{ height }}>
      //     <SharedElement id={item.id}>
      //       {item.postType === "photo" && (
      //         <Image
      //           source={{ uri: item.images[0]?.url }}
      //           style={{ width, height: height / 2 }}
      //         />
      //       )}
      //       {item.postType === "video" && (
      //         <Video
      //           source={{ uri: item.images[0]?.url }}
      //           style={{ width, height: height / 1.5 }}
      //           resizeMode={ResizeMode.COVER}
      //           shouldPlay={true}
      //           isMuted={false}
      //           isLooping={true}
      //         />
      //       )}
      //     </SharedElement>
      //     <Text>
      //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      //       voluptatum, eveniet sint corrupti, ex tempora ducimus ipsum modi
      //       recusandae iste suscipit eaque in numquam, blanditiis officiis
      //       eligendi a nobis temporibus!
      //     </Text>
      //   </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 540,
      offset: 540 * index,
      index,
    }),
    []
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style, borderStyle]}>
        <Header title="Postari" />
        <FlatList
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderPost}
          initialScrollIndex={id}
          getItemLayout={getItemLayout}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
