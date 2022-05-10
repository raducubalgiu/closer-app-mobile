import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";

export const TopTabContainer = ({ children, initialRouteName }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        tabBarActiveTintColor: theme.lightColors.black,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabStyle,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      {children}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  tabStyle: { backgroundColor: "white" },
  tabIndicator: {
    backgroundColor: theme.lightColors.black,
  },
});
