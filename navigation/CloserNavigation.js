import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useAuth } from "../context/auth";
import { hideTabs } from "../utils/hideTabs";
import "../i18next";

import { Colors } from "../assets/styles/Colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/User/Profile/ProfileScreen";
import ProfileGeneralScreen from "../screens/User/Profile/ProfileGeneralScreen";
import EditProfileScreen from "../screens/User/Profile/EditProfile/EditProfileScreen";
import EditNameScreen from "../screens/User/Profile/EditProfile/EditNameScreen";
import EditWebsiteScreen from "../screens/User/Profile/EditProfile/EditWebsiteScreen";
import EditBioScreen from "../screens/User/Profile/EditProfile/EditBioScreen";
import EditPhotoLibraryScreen from "../screens/User/Profile/EditProfile/EditPhotoLibraryScreen";
import SettingsScreen from "../screens/User/Profile/Settings/SettingsProfileScreen";
import SchedulesScreen from "../screens/User/Profile/Settings/SchedulesProfileScreen";
import DiscountsScreen from "../screens/User/Profile/Settings/DiscountsProfileScreen";
import FindFriendsScreen from "../screens/User/Profile/FindFriendsScreen";
import ProfileTabsScreen from "../components/customized/Tabs/ProfileStatsTabs/ProfileTabsScreen";

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
import BookmarksScreen from "../screens/User/Profile/BookmarksScreen";
import AddLocationScreen from "../screens/User/Profile/CompleteProfile/AddLocationScreen";
import AddServicesScreen from "../screens/User/Profile/CompleteProfile/AddServicesScreen";
import AddProductsScreen from "../screens/User/Profile/CompleteProfile/AddProductsScreen";
import LikesScreen from "../screens/LikesScreen";
import CommentsScreen from "../screens/User/Profile/CommentsScreen";
import MyBusinessScreen from "../screens/User/Profile/MyBusiness/MyBusinessScreen";
import MyDashboardScreen from "../screens/User/Profile/MyBusiness/MyDashboardScreen";
import MyCalendarScreen from "../screens/User/Profile/MyBusiness/MyCalendarScreen";
import MyLocationScreen from "../screens/User/Profile/MyBusiness/MyLocationScreen";
import MyProductsScreen from "../screens/User/Profile/MyBusiness/MyProductsScreen";
import AddBusinessTypeScreen from "../screens/User/Profile/CompleteProfile/AddBusinessTypeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
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

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileGeneral"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileGeneral" component={ProfileGeneralScreen} />
      <Stack.Screen name="ProfileTabsScreen" component={ProfileTabsScreen} />
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
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen
        name="ProfileGeneralStack"
        component={ProfileStackNavigator}
      />
    </Stack.Navigator>
  );
};

const FeedStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        initialRouteName="Profile"
      />
      <Stack.Screen name="AddLocation" component={AddLocationScreen} />
      <Stack.Screen name="AddServices" component={AddServicesScreen} />
      <Stack.Screen name="AddProducts" component={AddProductsScreen} />
      <Stack.Screen name="AddBusinessType" component={AddBusinessTypeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditName" component={EditNameScreen} />
      <Stack.Screen name="EditWebsite" component={EditWebsiteScreen} />
      <Stack.Screen name="EditBio" component={EditBioScreen} />
      <Stack.Screen
        name="EditPhotoLibrary"
        component={EditPhotoLibraryScreen}
      />
      <Stack.Screen name="MyBusiness" component={MyBusinessScreen} />
      <Stack.Screen name="MyDashboard" component={MyDashboardScreen} />
      <Stack.Screen name="MyCalendar" component={MyCalendarScreen} />
      <Stack.Screen name="MyLocation" component={MyLocationScreen} />
      <Stack.Screen name="MyProducts" component={MyProductsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Schedules" component={SchedulesScreen} />
      <Stack.Screen name="Discounts" component={DiscountsScreen} />
      <Stack.Screen name="FindFriends" component={FindFriendsScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen
        name="ProfileGeneralStack"
        component={ProfileStackNavigator}
      />
    </Stack.Navigator>
  );
};

const RootStack = createNativeStackNavigator();

const TabsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconType;
          if (route.name === "HomeStack") {
            iconType = "feather";
            iconName = focused ? "home" : "home";
          } else if (route.name === "ExploreStack") {
            iconType = "feather";
            iconName = focused ? "video" : "video";
          } else if (route.name === "FeedStack") {
            iconType = "feather";
            iconName = focused ? "search" : "search";
          } else if (route.name === "Messages") {
            iconType = "feather";
            iconName = focused ? "bell" : "bell";
          } else if (route.name === "UserStack") {
            iconType = "feather";
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} type={iconType} color={color} />;
        },
        tabBarActiveTintColor: Colors.textDark,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: hideTabs(route),
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="ExploreStack" component={ExploreStackNavigator} />
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="UserStack" component={UserStackNavigator} />
    </Tab.Navigator>
  );
};

const CloserNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen
            name="App"
            component={TabsScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name="AuthStack"
            component={AuthStackNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default CloserNavigation;
