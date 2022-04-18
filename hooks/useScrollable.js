import { Animated } from "react-native";
import { useEffect, useRef } from "react";

export const useScrollable = () => {
  const CONTAINER_HEIGHT = 54;
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);

  let scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT;
    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: "clamp",
  });

  return {
    scrollY,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    headerTranslate,
  };
};
