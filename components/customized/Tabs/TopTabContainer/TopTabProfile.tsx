import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { JobsProfileTab } from "../ProfileTabs/JobsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { TabBadge } from "../TabBadge/TabBadge";
import theme from "../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { THIRD_ROLE } from "@env";
import { useCallback } from "react";

const { black } = theme.lightColors;

export const TopTabProfile = ({ userId, service, option, user }) => {
  const Tab = createMaterialTopTabNavigator();
  const { description, website, location, role } = user || {};

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} />,
    [userId]
  );

  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab userId={userId} service={service} option={option} />
    ),
    [userId, service, option]
  );

  const JobsProfile = useCallback(
    () => <JobsProfileTab userId={userId} />,
    [userId]
  );

  const AboutProfile = useCallback(
    () => <AboutProfileTab biography={description} />,
    []
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconType;
          let size = 22;

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
        tabBarInactiveTintColor: "#ccc",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: black,
          marginBottom: 0.5,
        },
        lazy: true,
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Posts" component={PostsProfile} />
      {role !== THIRD_ROLE && (
        <Tab.Screen
          name="Products"
          component={ProductsProfile}
          options={{ tabBarIcon: () => <TabBadge value={0} /> }}
        />
      )}
      {role !== THIRD_ROLE && (
        <Tab.Screen name="Jobs" component={JobsProfile} />
      )}
      <Tab.Screen name="About" component={AboutProfile} />
    </Tab.Navigator>
  );
};