import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "@rneui/themed";
import {
  PostsProfileTab,
  ProductsProfileTab,
  AboutProfileTab,
  JobsProfileTab,
  CalendarProfileTab,
} from "../components/customized";
import theme from "../assets/styles/theme";

const TopTabNavigator = (props) => {
  const { role, userId } = props;
  const Tab = createMaterialTopTabNavigator();

  console.log("RENDER TOP TABS");

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} />,
    [userId]
  );
  const ProductsProfile = useCallback(
    () => <ProductsProfileTab userId={userId} />,
    [userId]
  );
  const AboutProfile = () => (
    <AboutProfileTab
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
      <Tab.Screen name="Calendar" component={CalendarProfileTab} />
      <Tab.Screen name="Jobs" component={JobsProfileTab} />
      <Tab.Screen name="About" component={AboutProfile} />
    </Tab.Navigator>
  );

  return <>{topTab}</>;
};

export default TopTabNavigator;
