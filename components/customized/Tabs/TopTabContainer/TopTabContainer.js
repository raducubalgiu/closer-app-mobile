import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

export const TopTabContainer = ({
  children,
  initialRouteName,
  profileTabs,
}) => {
  const Tab = createMaterialTopTabNavigator();

  let screenOptions;
  if (profileTabs) {
    screenOptions = ({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        let iconType;
        let size;

        if (route.name === "Posts") {
          iconType = "feather";
          iconName = focused ? "grid" : "grid";
        } else if (route.name === "Products") {
          iconType = "feather";
          iconName = focused ? "shopping-bag" : "shopping-bag";
        } else if (route.name === "Calendar") {
          iconType = "feather";
          iconName = focused ? "calendar" : "calendar";
        } else if (route.name === "Jobs") {
          iconType = "feather";
          iconName = focused ? "briefcase" : "briefcase";
        } else if (route.name === "About") {
          iconType = "feather";
          iconName = focused ? "user-check" : "user-check";
        }
        return (
          <Icon name={iconName} type={iconType} color={color} size={size} />
        );
      },
      tabBarActiveTintColor: theme.lightColors.primary,
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIndicatorStyle: {
        backgroundColor: theme.lightColors.black,
      },
    });
  } else {
    screenOptions = {
      tabBarActiveTintColor: theme.lightColors.black,
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabStyle,
      tabBarIndicatorStyle: styles.tabIndicator,
    };
  }

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
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
