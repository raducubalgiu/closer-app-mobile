import { FlatList, useWindowDimensions } from "react-native";
import { useCallback, useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useVector, snapPoint } from "react-native-redash";
import { RootStackParams } from "../../navigation/rootStackParams";
import PostListItem from "../../components/customized/ListItems/Post/PostImageListItem";
import { Header } from "../../components/core";

type IProps = NativeStackScreenProps<RootStackParams, "UserAllPosts">;

export const SearchPopularDetailScreen = ({ route }: IProps) => {
  const { posts, post, index } = route.params;
  const ref = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { t } = useTranslation();

  const translation = useVector();
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

  const renderPost = useCallback(({ item }: any) => {
    return <PostListItem post={item} isLiked={false} isBookmarked={false} />;
  }, []);

  const keyExtractor = useCallback((item: any) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 670,
      offset: 670 * index,
      index,
    }),
    []
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style]}>
        <Header title={t("posts")} />
        <FlatList
          ref={ref}
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
          initialScrollIndex={index}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
