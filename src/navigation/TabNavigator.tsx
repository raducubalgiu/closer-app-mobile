import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { useAuth, useGet } from "../hooks";
import theme from "../../assets/styles/theme";
import {
  SchedulesScreen,
  HomeScreen,
  MessagesScreen,
  ProfileScreen,
  UserPostsScreen,
  UserAllPostsScreen,
} from "../screens";
import FeedNavigator from "./FeedNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
const { error, black, primary } = theme.lightColors || {};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyle: { backgroundColor: "rgba(0,0,0, 0.4)" },
        presentation: "card",
        detachPreviousScreen: false,
        animationEnabled: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="UserPosts"
        component={UserPostsScreen}
        sharedElements={(route, otherRoute, showing) => {
          const { post } = route.params;
          return [
            {
              id: post.id,
            },
          ];
        }}
      />
      <Stack.Screen
        name="UserAllPosts"
        component={UserAllPostsScreen}
        sharedElements={(route, otherRoute, showing) => {
          const { post, posts, index } = route.params;
          return [
            {
              id: post.id,
              posts,
              index,
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

const getTabStyle = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "FeedStack";

  switch (routeName) {
    case "FeedExploreVideo":
      return {
        tabBarStyle: { backgroundColor: "black", borderTopColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      };
    default:
      return {
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: black,
        tabBarInactiveTintColor: "gray",
      };
  }
};

const TabNavigator = () => {
  const { user } = useAuth();

  let badgeOptions = {};

  if (user) {
    const { data } = useGet({
      model: "currentSchedules",
      uri: `/users/${user.id}/schedules/current-schedules`,
    });

    if (data?.currentSchedules > 0) {
      badgeOptions = {
        tabBarBadge: data?.currentSchedules,
        tabBarBadgeStyle: {
          backgroundColor: error,
          fontSize: 11,
        },
      };
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let name = "";
          let type = "feather";
          let size = 24;
          let style = {};

          if (route.name === "Home") {
            name = focused ? "search" : "shopping-outline";
            type = focused ? "feather" : "material-community";
            size = type === "material-community" ? 26 : 24;
          } else if (route.name === "Messages") {
            name = focused ? "message-circle" : "message-circle";
          } else if (route.name === "FeedStack") {
            name = focused ? "compass" : "compass";
          } else if (route.name === "Schedules") {
            name = focused ? "calendar" : "calendar";
          } else if (route.name === "Profile") {
            name = focused ? "user" : "user";
          } else if (route.name === "SharedStack") {
            name = focused ? "user" : "user";
          }
          return (
            <Icon
              name={name}
              type={type}
              color={color}
              size={size}
              style={{ ...style }}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        ...getTabStyle(route),
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="FeedStack" component={FeedNavigator} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Schedules"
        component={SchedulesScreen}
        options={badgeOptions}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomAvatar
              avatar={user?.avatar}
              size={27.5}
              sx={focused ? { borderWidth: 2, borderColor: primary } : {}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
