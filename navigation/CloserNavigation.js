import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { PortalProvider } from "@gorhom/portal";
import theme from "../assets/styles/theme";
import { useAuth } from "../hooks";
import "../i18next";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/User/Profile/ProfileScreen";
import ProfileGeneralScreen from "../screens/User/Profile/ProfileGeneralScreen";
import EditProfileScreen from "../screens/User/Profile/EditProfile/EditProfileScreen";
import EditNameScreen from "../screens/User/Profile/EditProfile/EditNameScreen";
import EditWebsiteScreen from "../screens/User/Profile/EditProfile/EditWebsiteScreen";
import EditBioScreen from "../screens/User/Profile/EditProfile/EditBioScreen";
import EditPhotoLibraryScreen from "../screens/User/Profile/EditProfile/EditPhotoLibraryScreen";
import SettingsScreen from "../screens/User/Profile/SettingsProfileScreen";
import SchedulesScreen from "../screens/SchedulesScreen";
import DiscountsScreen from "../screens/User/Profile/DiscountScreen";
import FindFriendsScreen from "../screens/User/Profile/FindFriendsScreen";
import SearchServicesScreen from "../screens/SearchServicesScreen";
import SearchPostsScreen from "../screens/SearchPostsScreen";
import SearchAllScreen from "../screens/SearchAllScreen";
import FiltersDateScreen from "../screens/FilterDateScreen";
import FiltersServiceScreen from "../screens/FiltersServiceScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MessageItemScreen from "../screens/MessageItemScreen";
import FeedScreen from "../screens/FeedScreen";
import PostScreen from "../screens/PostScreen";
import AuthScreen from "../screens/User/Auth/AuthScreen";
import LoginScreen from "../screens/User/Auth/LoginScreen";
import RegisterScreen from "../screens/User/Auth/RegisterScreen";
import UsernameScreen from "../screens/User/Auth/UsernameScreen";
import RegisterBusinessScreen from "../screens/User/Auth/RegisterBusinessScreen";
import BookmarksScreen from "../screens/User/Profile/BookmarksScreen";
import AddLocationScreen from "../screens/User/Profile/MyBusiness/AddLocationScreen";
import AddServicesScreen from "../screens/User/Profile/MyBusiness/AddServicesScreen";
import AddProductsScreen from "../screens/User/Profile/MyBusiness/AddProductsScreen";
import LikesScreen from "../screens/LikesScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MyBusinessScreen from "../screens/User/Profile/MyBusiness/MyBusinessScreen";
import MyDashboardScreen from "../screens/User/Profile/MyBusiness/MyDashboardScreen";
import MyCalendarScreen from "../screens/User/Profile/MyBusiness/MyCalendarScreen";
import MyLocationScreen from "../screens/User/Profile/MyBusiness/MyLocationScreen";
import MyProductsScreen from "../screens/User/Profile/MyBusiness/MyProductsScreen";
import AddBusinessTypeScreen from "../screens/User/Profile/MyBusiness/AddBusinessTypeScreen";
import AllServicesScreen from "../screens/AllServicesScreen";
import ProfileStatsScreen from "../screens/User/Profile/ProfileStatsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import EditProductScreen from "../screens/User/Profile/MyBusiness/EditProductScreen";
import EditUsernameScreen from "../screens/User/Profile/EditProfile/EditUsernameScreen";
import MyJobsScreen from "../screens/User/Profile/MyBusiness/MyJobsScreen";
import AddJobsScreen from "../screens/User/Profile/MyBusiness/AddJobsScreen";
import LocationsScreen from "../screens/LocationsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import AddScheduleScreen from "../screens/User/Profile/MyBusiness/AddScheduleScreen";
import ScheduleOverviewScreen from "../screens/ScheduleOverviewScreen";
import ScheduleDetailsScreen from "../screens/ScheduleDetailsScreen";
import MapScreen from "../screens/MapScreen";
import ScheduleConfirmScreen from "../screens/ScheduleConfirmScreen";
import ScheduleCancelScreen from "../screens/ScheduleCancelScreen";
import AllBookmarksScreens from "../screens/User/Profile/AllBookmarksScreens";
import HashtagScreen from "../screens/HashtagScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen name="SearchPosts" component={SearchPostsScreen} />
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

const RootStack = createNativeStackNavigator();

const TabsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconType;
          let iconSize;
          if (route.name === "Home") {
            iconType = "feather";
            iconName = focused ? "search" : "search";
          } else if (route.name === "Messages") {
            iconType = "feather";
            iconName = focused ? "message-circle" : "message-circle";
          } else if (route.name === "FeedStack") {
            iconType = "feather";
            iconName = focused ? "compass" : "compass";
          } else if (route.name === "Schedules") {
            iconType = "feather";
            iconName = focused ? "calendar" : "calendar";
          } else if (route.name === "Profile") {
            iconType = "feather";
            iconName = focused ? "user" : "user";
          }
          return (
            <Icon
              name={iconName}
              type={iconType}
              color={color}
              size={iconSize}
            />
          );
        },
        tabBarActiveTintColor: theme.lightColors.black,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="FeedStack" component={FeedStackNavigator} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedules" component={SchedulesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const CloserNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user && (
        <PortalProvider>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="App" component={TabsScreen} />
            <Stack.Screen
              name="SearchServices"
              component={SearchServicesScreen}
            />
            <Stack.Screen name="FiltersDate" component={FiltersDateScreen} />
            <Stack.Screen
              name="FiltersService"
              component={FiltersServiceScreen}
            />
            <Stack.Screen name="AllServices" component={AllServicesScreen} />
            <Stack.Screen name="Locations" component={LocationsScreen} />
            <RootStack.Screen
              name="AddLocation"
              component={AddLocationScreen}
            />
            <RootStack.Screen
              name="AddServices"
              component={AddServicesScreen}
            />
            <RootStack.Screen
              name="AddProducts"
              component={AddProductsScreen}
            />
            <RootStack.Screen name="AddJobs" component={AddJobsScreen} />
            <RootStack.Screen
              name="EditProduct"
              component={EditProductScreen}
            />
            <RootStack.Screen
              name="AddBusinessType"
              component={AddBusinessTypeScreen}
            />
            <RootStack.Screen
              name="EditProfile"
              component={EditProfileScreen}
            />
            <Stack.Screen name="EditName" component={EditNameScreen} />
            <Stack.Screen name="EditWebsite" component={EditWebsiteScreen} />
            <Stack.Screen name="EditBio" component={EditBioScreen} />
            <Stack.Screen name="EditUsername" component={EditUsernameScreen} />
            <Stack.Screen
              name="EditPhotoLibrary"
              component={EditPhotoLibraryScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="ScheduleDetails"
              component={ScheduleDetailsScreen}
            />
            <Stack.Screen
              name="ScheduleCancel"
              component={ScheduleCancelScreen}
            />
            <Stack.Screen name="Discounts" component={DiscountsScreen} />
            <Stack.Screen name="FindFriends" component={FindFriendsScreen} />
            <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
            <Stack.Screen name="AllBookmarks" component={AllBookmarksScreens} />
            <Stack.Screen name="MyBusiness" component={MyBusinessScreen} />
            <Stack.Screen name="MyDashboard" component={MyDashboardScreen} />
            <Stack.Screen name="MyCalendar" component={MyCalendarScreen} />
            <Stack.Screen name="MyLocation" component={MyLocationScreen} />
            <Stack.Screen name="MyProducts" component={MyProductsScreen} />
            <Stack.Screen name="MyJobs" component={MyJobsScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
            <Stack.Screen name="MessageItem" component={MessageItemScreen} />
            <Stack.Screen name="SearchAll" component={SearchAllScreen} />
            <Stack.Screen name="Hashtag" component={HashtagScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen
              name="ProfileGeneral"
              component={ProfileGeneralScreen}
            />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="ProfileStats" component={ProfileStatsScreen} />
            <Stack.Screen name="CalendarBig" component={CalendarScreen} />
            <Stack.Screen
              name="ScheduleConfirm"
              component={ScheduleConfirmScreen}
            />
            <Stack.Screen
              name="ScheduleOverview"
              component={ScheduleOverviewScreen}
            />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="AddSchedule" component={AddScheduleScreen} />
          </RootStack.Navigator>
        </PortalProvider>
      )}
      {!user && (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default CloserNavigation;
