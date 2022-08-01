import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { width } = Dimensions.get("window");
const { black } = theme.lightColors;

export const TopTabContainer = ({
  children,
  initialRouteName,
  profileTabs,
  tabBarScrollEnabled,
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
        } else if (route.name === "Calendar") {
          iconType = "feather";
          iconName = focused ? "clock" : "clock";
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
      tabBarActiveTintColor: black,
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIndicatorStyle: {
        backgroundColor: black,
        marginBottom: 0.5,
      },
      lazy: true,
    });
  } else {
    screenOptions = {
      tabBarActiveTintColor: theme.lightColors.black,
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabStyle,
      tabBarIndicatorStyle: styles.tabIndicator,
      tabBarScrollEnabled,
    };
  }

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
      sceneContainerStyle={{ backgroundColor: "white" }}
      initialLayout={{ width, height: 0 }}
    >
      {children}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: "Exo-SemiBold",
    //textTransform: "capitalize",
    fontSize: 14,
  },
  tabStyle: { backgroundColor: "white" },
  tabIndicator: {
    //backgroundColor: theme.lightColors.black,
    backgroundColor: "transparent",
  },
});
