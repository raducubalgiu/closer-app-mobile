import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import "../i18next";

import { Colors } from "../assets/styles/Colors";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import NotificationScreen from "../screens/NotificationScreen";
import LoginScreen from "../screens/User/LoginScreen";
import RegisterScreen from "../screens/User/RegisterScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import AllServicesScreen from "../screens/AllServicesScreen";
import EditProfileScreen from "../screens/User/EditProfileScreen";
import GiftsScreen from "../screens/User/GiftsScreen";
import RatingsScreen from "../screens/User/RatingsScreen";
import ControlPanelScreen from "../screens/User/ControlPanelScreen";
import ReportProblemScreen from "../screens/User/ReportProblemScreen";
import SettingsScreen from "../screens/User/SettingsScreen";
import LegalScreen from "../screens/User/LegalScreen";
import RegisterBusinessScreen from "../screens/User/RegisterBusinessScreen";

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
      <Stack.Screen name="AllServices" component={AllServicesScreen} />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Gifts" component={GiftsScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="ControlPanel" component={ControlPanelScreen} />
      <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
      <Stack.Screen
        name="RegisterBusiness"
        component={RegisterBusinessScreen}
      />
    </Stack.Navigator>
  );
};

const CloserNavigation = () => {
  const user = true;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconType;

            if (route.name === "Home") {
              iconType = "ionicon";
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Favorites") {
              iconType = "ionicon";
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Traseu") {
              iconType = "font-awesome-5";
              iconName = focused ? "route" : "route";
            } else if (route.name === "Notifications") {
              iconType = "ionicon";
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "User") {
              iconType = "ionicon";
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return (
              <Icon name={iconName} type={iconType} color={color} size={size} />
            );
          },
          tabBarActiveTintColor: Colors.textDark,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={StackNavigator} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
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
