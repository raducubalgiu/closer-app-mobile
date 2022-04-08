import { Icon } from "react-native-elements";
import React from "react";
import PostsProfileScreen from "./User/Profile/PostsProfileScreen";
import ProductsProfileScreen from "./User/Profile/ProductsProfileScreen";
import CalendarProfileScreen from "./User/Profile/CalendarProfileScreen";
import JobsProfileScreen from "./User/Profile/ProfileStatsTabs/JobsProfileScreen";
import AboutProfileScreen from "./User/Profile/AboutProfileScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../assets/styles/Colors";

const TopTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  const topTab = (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIndicatorContainerStyle: {
          color: "red",
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.textDark,
        },
      })}
    >
      <Tab.Screen name="Posts" component={PostsProfileScreen} />
      <Tab.Screen name="Products" component={ProductsProfileScreen} />
      <Tab.Screen name="Calendar" component={CalendarProfileScreen} />
      <Tab.Screen name="Jobs" component={JobsProfileScreen} />
      <Tab.Screen name="About" component={AboutProfileScreen} />
    </Tab.Navigator>
  );

  return <>{topTab}</>;
};

export default TopTabNavigator;
