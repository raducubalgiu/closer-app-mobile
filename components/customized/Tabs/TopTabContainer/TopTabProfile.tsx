import { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { THIRD_ROLE } from "@env";
import { Icon } from "@rneui/themed";
import { VideosVTab } from "../ProfileTabs/VideosVTab";
import { VideosHTab } from "../ProfileTabs/VideosHTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { TabBadge } from "../TabBadge/TabBadge";
import theme from "../../../../assets/styles/theme";
import { User } from "../../../../models/user";

const { black } = theme.lightColors || {};

type IProps = { userId: string; service: any; option: any; user: User };

export const TopTabProfile = ({ userId, service, option, user }: IProps) => {
  const Tab = createMaterialTopTabNavigator();
  const { role } = user || {};

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} />,
    [userId]
  );

  const VideosVProfile = useCallback(
    () => <VideosVTab userId={userId} />,
    [userId]
  );

  const VideosHProfile = useCallback(
    () => <VideosHTab userId={userId} />,
    [userId]
  );

  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab userId={userId} service={service} option={option} />
    ),
    [userId, service, option]
  );

  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        userId={userId}
        website={user?.website}
        description={user?.description}
        email={user?.email}
      />
    ),
    [userId, user]
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = "";
          let iconType = "";
          let size = 22;

          if (route.name === "Posts") {
            iconType = "feather";
            iconName = focused ? "grid" : "grid";
          } else if (route.name === "Products") {
            iconType = "";
          } else if (route.name === "VideoV") {
            iconType = "feather";
            iconName = focused ? "video" : "video";
          } else if (route.name === "VideoH") {
            iconType = "feather";
            iconName = focused ? "video" : "video";
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
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBadge value={0} color={focused ? black : "#ccc"} />
            ),
          }}
        />
      )}
      <Tab.Screen name="VideoV" component={VideosVProfile} />
      <Tab.Screen name="VideoH" component={VideosHProfile} />
      <Tab.Screen name="About" component={AboutProfile} />
    </Tab.Navigator>
  );
};
