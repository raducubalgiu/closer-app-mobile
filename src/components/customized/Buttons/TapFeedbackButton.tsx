import { Pressable } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

type IProps = { children: any; sx?: {}; onPress: () => void };

export const TapFeedbackButton = ({ children, sx, onPress }: IProps) => {
  const pressed = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler<any>({
    onStart: () => {
      pressed.value = true;
    },
    onActive: () => {
      pressed.value = true;
    },
    onFinish: () => {
      pressed.value = false;
    },
  });

  const bgColor = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "rgba(0, 0, 0, 0.2)" : "white",
    };
  });

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[{ paddingVertical: 10 }, sx, bgColor]}>
        <Pressable onPress={onPress}>{children}</Pressable>
      </Animated.View>
    </TapGestureHandler>
  );
};
