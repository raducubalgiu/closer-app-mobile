import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import { useAuth } from "../context/auth";
import "../i18next";

import { Colors } from "../assets/styles/Colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/User/Profile/ProfileScreen";
import ProfileGeneralScreen from "../screens/User/Profile/ProfileGeneralScreen";
import EditProfileScreen from "../screens/User/Profile/EditProfile/EditProfileScreen";
import EditNameScreen from "../screens/User/Profile/EditProfile/EditNameScreen";
import EditWebsiteScreen from "../screens/User/Profile/EditProfile/EditWebsiteScreen";
import EditBioScreen from "../screens/User/Profile/EditProfile/EditBioScreen";
import SettingsScreen from "../screens/User/Profile/Settings/SettingsProfileScreen";
import SchedulesScreen from "../screens/User/Profile/Settings/SchedulesProfileScreen";
import DiscountsScreen from "../screens/User/Profile/Settings/DiscountsProfileScreen";
import FindFriendsScreen from "../screens/User/Profile/FindFriendsScreen";
import ProfileTabsScreen from "../screens/User/Profile/ProfileStatsTabs/ProfileTabsScreen";

import SearchScreen from "../screens/SearchScreen";
import FiltersDateScreen from "../screens/FilterDateScreen";
import FiltersServiceScreen from "../screens/FiltersServiceScreen";
import ServicesNavigation from "../screens/ServicesNavigationScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ServiceItemScreen from "../screens/ServiceItemScreen";
import FeedScreen from "../screens/FeedScreen";

// Auth
import AuthScreen from "../screens/User/Auth/AuthScreen";
import LoginScreen from "../screens/User/Auth/LoginScreen";
import RegisterScreen from "../screens/User/Auth/RegisterScreen";
import UsernameScreen from "../screens/User/Auth/UsernameScreen";
import RegisterBusinessScreen from "../screens/User/Auth/RegisterBusinessScreen";
import SavedPostsScreen from "../screens/User/Profile/SavedPostsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StackBase" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AllServices" component={ServicesNavigation} />
      <Stack.Screen name="FiltersDate" component={FiltersDateScreen} />
      <Stack.Screen name="FiltersService" component={FiltersServiceScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="ServiceItem" component={ServiceItemScreen} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen
        name="RegisterBusiness"
        component={RegisterBusinessScreen}
      />
    </Stack.Navigator>
  );
};

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExploreStack" component={ExploreScreen} />
      <Stack.Screen name="ProfileTabsScreen" component={ProfileTabsScreen} />
      <Stack.Screen name="ProfileGeneral" component={ProfileGeneralScreen} />
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditName" component={EditNameScreen} />
      <Stack.Screen name="EditWebsite" component={EditWebsiteScreen} />
      <Stack.Screen name="EditBio" component={EditBioScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Schedules" component={SchedulesScreen} />
      <Stack.Screen name="Discounts" component={DiscountsScreen} />
      <Stack.Screen name="ProfileTabsScreen" component={ProfileTabsScreen} />
      <Stack.Screen name="FindFriends" component={FindFriendsScreen} />
      <Stack.Screen name="Saved" component={SavedPostsScreen} />
      <Stack.Screen name="ProfileGeneral" component={ProfileGeneralScreen} />
    </Stack.Navigator>
  );
};

const CloserNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let iconType;

            if (route.name === "Home") {
              iconType = "antdesign";
              iconName = focused ? "home" : "home";
            } else if (route.name === "Explore") {
              iconType = "antdesign";
              iconName = focused ? "search1" : "search1";
            } else if (route.name === "Feed") {
              iconType = "material";
              iconName = focused
                ? "local-fire-department"
                : "local-fire-department";
            } else if (route.name === "Messages") {
              iconType = "ionicon";
              iconName = focused ? "chatbubble-outline" : "chatbubble-outline";
            } else if (route.name === "User") {
              iconType = "antdesign";
              iconName = focused ? "user" : "user";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} type={iconType} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={StackNavigator} />
        <Tab.Screen name="Explore" component={ExploreStackNavigator} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        {user ? (
          <Tab.Screen name="User" component={UserStackNavigator} />
        ) : (
          <Tab.Screen name="User" component={AuthStackNavigator} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default CloserNavigation;
