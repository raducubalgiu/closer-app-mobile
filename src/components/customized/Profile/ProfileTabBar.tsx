import { StyleSheet, Animated } from "react-native";
import { forwardRef, memo, useCallback } from "react";
import { Icon } from "@rneui/themed";
import { Route, TabBar, TabBarProps } from "react-native-tab-view";

type IProps = {
  headerHeight: number;
  scrollY: Animated.Value;
  tabBarHeight: number;
  props: TabBarProps<Route>;
};

const ProfileTabBar = forwardRef(
  ({ headerHeight, scrollY, tabBarHeight, props }: IProps, ref: any) => {
    const tTabBar = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolateRight: "clamp",
    });

    const renderLabel = useCallback(({ route, focused }: any) => {
      return (
        <Icon
          name={route.name}
          type="material-community"
          size={22.5}
          color={focused ? "black" : "#ddd"}
        />
      );
    }, []);

    const handleTabPress = useCallback(({ route, preventDefault }: any) => {
      if (ref.current) {
        preventDefault();
      }
    }, []);

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: tTabBar }] }]}
      >
        <TabBar
          {...props}
          onTabPress={handleTabPress}
          style={{ ...styles.tab, height: tabBarHeight }}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  }
);

export default memo(ProfileTabBar);

const styles = StyleSheet.create({
  container: { top: 0, zIndex: 1, position: "absolute", width: "100%" },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f1f1",
  },
  indicator: { backgroundColor: "#222" },
});
