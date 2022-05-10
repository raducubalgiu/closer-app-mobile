import { Icon } from "@rneui/themed";
import PostsProfileScreen from "./User/Profile/PostsProfileScreen";
import React, { useCallback, useMemo } from "react";
import CalendarProfileScreen from "./User/Profile/CalendarProfileScreen";
import JobsProfileScreen from "./User/Profile/JobsProfileScreen";
import AboutProfileScreen from "./User/Profile/AboutProfileScreen";
import ProductsProfileScreen from "./User/Profile/ProductsProfileScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../assets/styles/theme";

const TopTabNavigator = (props) => {
  const { role, userId } = props;
  const Tab = createMaterialTopTabNavigator();

  console.log("RENDER TOP TABS");

  const PostsProfile = useCallback(
    () => <PostsProfileScreen userId={userId} />,
    [userId]
  );
  const ProductsProfile = useCallback(
    () => <ProductsProfileScreen userId={userId} />,
    [userId]
  );
  const AboutProfile = () => (
    <AboutProfileScreen
      biography={props?.biography}
      website={props?.website}
      location={props?.location}
    />
  );

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
        tabBarActiveTintColor: theme.lightColors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: theme.lightColors.black,
        },
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Posts" component={PostsProfile} />
      <Tab.Screen name="Products" component={ProductsProfile} />
      <Tab.Screen name="Calendar" component={CalendarProfileScreen} />
      <Tab.Screen name="Jobs" component={JobsProfileScreen} />
      <Tab.Screen name="About" component={AboutProfile} />
    </Tab.Navigator>
  );

  return <>{topTab}</>;
};

export default TopTabNavigator;
