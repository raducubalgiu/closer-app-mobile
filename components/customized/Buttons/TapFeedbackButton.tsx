import { Animated, Pressable } from "react-native";

type IProps = { children: any; sx?: {}; onPress: () => void };

export const TapFeedbackButton = ({ children, sx, onPress }: IProps) => {
  const animation = new Animated.Value(0);

  const handleAnimation = () => {
    animation.setValue(1);
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: false,
      duration: 5,
    }).start(() => {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 0,
        useNativeDriver: false,
        duration: 5,
      }).start();
      onPress();
    });
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "rgba(0, 0, 0, 0.2)"],
  });

  return (
    <Pressable onPress={handleAnimation} style={sx}>
      <Animated.View style={{ paddingVertical: 10, backgroundColor }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
