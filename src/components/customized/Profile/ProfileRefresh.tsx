import {
  StyleSheet,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";
import { memo } from "react";

type IProps = { scrollY: Animated.Value; headerMoveScrollY: Animated.Value };

const ProfileRefresh = ({ scrollY, headerMoveScrollY }: IProps) => {
  const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);

  const tIos = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [120, 0],
    extrapolate: "clamp",
  });

  const tAndroid = headerMoveScrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [150, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      {Platform.select({
        ios: (
          <AnimatedIndicator
            style={[styles.ios, { transform: [{ translateY: tIos }] }]}
            animating
          />
        ),
        android: (
          <Animated.View
            style={[styles.android, { transform: [{ translateY: tAndroid }] }]}
          >
            <ActivityIndicator animating />
          </Animated.View>
        ),
      })}
    </>
  );
};

export default memo(ProfileRefresh);

const styles = StyleSheet.create({
  ios: {
    top: -50,
    position: "absolute",
    alignSelf: "center",
  },
  android: {
    backgroundColor: "#eee",
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: -50,
    position: "absolute",
  },
});
