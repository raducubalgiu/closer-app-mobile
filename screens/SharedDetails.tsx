import {
  Image,
  Dimensions,
  View,
  Text,
  FlatList,
  StatusBar,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, withTiming } from "react-native-reanimated";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Header, IconBackButton, Stack } from "../components/core";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardPost from "../components/customized/Cards/CardPost/CardPost";

const { height } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<RootStackParams, "SharedDetail">;
  route: RouteProp<RootStackParams, "SharedDetail">;
}

export const SharedDetails = ({ route, navigation }: Props) => {
  const { allPosts, index } = route.params;
  const isGestureActive = useSharedValue(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      if (goBack) {
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withSpring(0, { velocity: velocityX });
        translateY.value = withSpring(0, { velocity: velocityY });
      }
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: "white",
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const renderPost = useCallback(
    ({ item }) => <CardPost post={item} onShowDetails={() => {}} />,
    []
  );

  const getItemLayout = (data, index) => ({
    length: 600,
    offset: 600 * index,
    index,
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[style, { borderTopLeftRadius: 25, borderTopRightRadius: 25 }]}
      >
        <SafeAreaView style={{ paddingBottom: -35 }}>
          <Header title="Postari" />
        </SafeAreaView>
        <Animated.FlatList
          data={allPosts}
          keyExtractor={(item) => item._id}
          renderItem={renderPost}
          bounces={false}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={index}
          getItemLayout={getItemLayout}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
