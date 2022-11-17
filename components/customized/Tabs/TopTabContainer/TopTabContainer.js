import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";

const { width } = Dimensions.get("window");
const { black } = theme.lightColors;

export const TopTabContainer = ({
  children,
  initialRouteName,
  tabBarScrollEnabled,
  options,
}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor: theme.lightColors.black,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabStyle,
        tabBarIndicatorStyle: styles.tabIndicator,
        tabBarScrollEnabled,
        ...options,
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
      initialLayout={{ width, height: 0 }}
    >
      {children}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "600",
  },
  tabStyle: { backgroundColor: "white" },
  tabIndicator: {
    backgroundColor: black,
  },
});
