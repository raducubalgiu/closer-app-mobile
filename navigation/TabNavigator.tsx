import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { useAuth, useGet } from "../hooks";
import theme from "../assets/styles/theme";
import {
  SchedulesScreen,
  HomeScreen,
  MessagesScreen,
  ProfileScreen,
} from "../screens";
import FeedNavigator from "./FeedNavigator";

const Tab = createBottomTabNavigator();
const { error, black, primary } = theme.lightColors || {};

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
        tabBarActiveTintColor: black,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "white" },
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
        name="Profile"
        component={ProfileScreen}
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
