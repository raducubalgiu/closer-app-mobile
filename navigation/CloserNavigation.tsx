import React, { useCallback } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { PortalProvider } from "@gorhom/portal";
import "../i18next";
import { useTranslation } from "react-i18next";
import theme from "../assets/styles/theme";
import { useAuth } from "../hooks";
import { RootStackParams } from "../models/navigation/rootStackParams";
import {
  EditProfileScreen,
  EditBioScreen,
  EditNameScreen,
  EditProfessionScreen,
  EditUsernameScreen,
  EditWebsiteScreen,
  EditAvatarScreen,
  MyBusinessScreen,
  MyDashboardScreen,
  MyProductsScreen,
  MyCalendarScreen,
  MyLocationScreen,
  MyJobsScreen,
  AddJobsScreen,
  AddLocationScreen,
  AddProductsScreen,
  AddScheduleScreen,
  AddServicesScreen,
  EditProductScreen,
  AllBookmarksScreen,
  BookmarksScreen,
  DiscountsScreen,
  FindFriendsScreen,
  ProfileScreen,
  ProfileGeneralScreen,
  ProfileStatsScreen,
  SettingsProfileScreen,
  CalendarScreen,
  CommentsScreen,
  FeedScreen,
  FiltersDateScreen,
  FiltersServiceScreen,
  HashtagScreen,
  HomeScreen,
  LikesScreen,
  LocationsScreen,
  MapScreen,
  MessageItemScreen,
  MessageNewScreen,
  MessagesScreen,
  NotificationsScreen,
  PostScreen,
  SchedulesScreen,
  ScheduleScreen,
  ScheduleCancelScreen,
  ScheduleConfirmScreen,
  ScheduleDetailsScreen,
  ScheduleOverviewScreen,
  SearchAllScreen,
  SearchPostsScreen,
  SearchServicesScreen,
  ServiceScreen,
  AuthScreen,
  LoginScreen,
  RegisterBusinessScreen,
  RegisterScreen,
  UsernameScreen,
  CameraScreen,
  CameraPreviewScreen,
  MessageSettingsScreen,
  PhotoLibraryScreen,
  PhotoAlbumsScreen,
  AddPostScreen,
} from "../screens";

import TestScreen from "../screens/TestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator<RootStackParams>();

const { black } = theme.lightColors;

const FeedStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false }}
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
      screenOptions={{ headerShown: false }}
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
        tabBarActiveTintColor: black,
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
  const { t } = useTranslation();

  const getScreens = useCallback(
    (user) => {
      if (user) {
        return (
          <PortalProvider>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="App" component={TabsScreen} />
              <RootStack.Group>
                <RootStack.Screen
                  name="SearchServices"
                  component={SearchServicesScreen}
                />
                <RootStack.Screen
                  name="FiltersDate"
                  component={FiltersDateScreen}
                />
                <RootStack.Screen
                  name="FiltersService"
                  component={FiltersServiceScreen}
                />
                <RootStack.Screen
                  name="Locations"
                  component={LocationsScreen}
                />
              </RootStack.Group>
              <RootStack.Group>
                <RootStack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
                <RootStack.Screen name="EditName" component={EditNameScreen} />
                <RootStack.Screen
                  name="EditWebsite"
                  component={EditWebsiteScreen}
                />
                <RootStack.Screen name="EditBio" component={EditBioScreen} />
                <RootStack.Screen
                  name="EditUsername"
                  component={EditUsernameScreen}
                />
                <RootStack.Screen
                  name="EditProfession"
                  component={EditProfessionScreen}
                />
              </RootStack.Group>
              <RootStack.Group>
                <RootStack.Screen
                  name="MyBusiness"
                  component={MyBusinessScreen}
                />
                <RootStack.Screen
                  name="MyDashboard"
                  component={MyDashboardScreen}
                />
                <RootStack.Screen
                  name="MyCalendar"
                  component={MyCalendarScreen}
                />
                <RootStack.Screen
                  name="MyLocation"
                  component={MyLocationScreen}
                />
                <RootStack.Screen
                  name="MyProducts"
                  component={MyProductsScreen}
                />
                <RootStack.Screen name="MyJobs" component={MyJobsScreen} />
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
                  options={{
                    headerShown: true,
                    headerTitle: t("addProduct"),
                    headerBackTitle: "",
                    headerTintColor: black,
                  }}
                />
                <RootStack.Screen name="AddJobs" component={AddJobsScreen} />
                <RootStack.Screen
                  name="EditProduct"
                  component={EditProductScreen}
                />
              </RootStack.Group>
              <RootStack.Group>
                <RootStack.Screen
                  name="MessageItem"
                  component={MessageItemScreen}
                />
                <RootStack.Screen
                  name="MessageSettings"
                  component={MessageSettingsScreen}
                />
                <RootStack.Screen
                  name="MessageNew"
                  component={MessageNewScreen}
                />
              </RootStack.Group>
              <RootStack.Screen
                name="Settings"
                component={SettingsProfileScreen}
              />
              <RootStack.Screen
                name="ScheduleDetails"
                component={ScheduleDetailsScreen}
              />
              <RootStack.Screen
                name="ScheduleCancel"
                component={ScheduleCancelScreen}
              />
              <RootStack.Screen name="Discounts" component={DiscountsScreen} />
              <RootStack.Screen
                name="FindFriends"
                component={FindFriendsScreen}
              />
              <RootStack.Screen name="Bookmarks" component={BookmarksScreen} />
              <RootStack.Screen
                name="AllBookmarks"
                component={AllBookmarksScreen}
              />
              <RootStack.Screen
                name="Comments"
                component={CommentsScreen}
                options={{
                  headerShown: true,
                  headerTitle: t("comments"),
                  headerBackTitle: "",
                  headerTintColor: black,
                }}
              />
              <RootStack.Screen name="SearchAll" component={SearchAllScreen} />
              <RootStack.Screen name="Hashtag" component={HashtagScreen} />
              <RootStack.Screen name="Service" component={ServiceScreen} />
              <RootStack.Screen
                name="Notifications"
                component={NotificationsScreen}
              />
              <RootStack.Screen name="Post" component={PostScreen} />
              <RootStack.Screen
                name="ProfileGeneral"
                component={ProfileGeneralScreen}
              />
              <RootStack.Screen name="Map" component={MapScreen} />
              <RootStack.Screen
                name="ProfileStats"
                component={ProfileStatsScreen}
              />
              <RootStack.Screen name="CalendarBig" component={CalendarScreen} />
              <RootStack.Screen
                name="ScheduleConfirm"
                component={ScheduleConfirmScreen}
              />
              <RootStack.Screen
                name="ScheduleOverview"
                component={ScheduleOverviewScreen}
              />
              <RootStack.Screen name="Schedule" component={ScheduleScreen} />
              <RootStack.Screen
                name="AddSchedule"
                component={AddScheduleScreen}
              />
              <RootStack.Screen
                name="AddPost"
                component={AddPostScreen}
                options={{ animation: "fade", animationDuration: 2 }}
              />
              <RootStack.Group screenOptions={{ gestureEnabled: false }}>
                <RootStack.Screen
                  options={{ presentation: "modal" }}
                  name="PhotoLibrary"
                  component={PhotoLibraryScreen}
                />
                <RootStack.Screen
                  options={{
                    presentation: "modal",
                    animation: "flip",
                  }}
                  name="PhotoAlbums"
                  component={PhotoAlbumsScreen}
                />
                <RootStack.Screen
                  options={{ presentation: "fullScreenModal" }}
                  name="EditAvatar"
                  component={EditAvatarScreen}
                />
              </RootStack.Group>
              <RootStack.Group
                screenOptions={{
                  animation: "fade",
                  animationDuration: 1,
                }}
              >
                <RootStack.Screen name="Camera" component={CameraScreen} />
                <RootStack.Screen
                  name="CameraPreview"
                  component={CameraPreviewScreen}
                />
              </RootStack.Group>
              <RootStack.Screen name="Test" component={TestScreen} />
            </RootStack.Navigator>
          </PortalProvider>
        );
      } else {
        return (
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
          </RootStack.Navigator>
        );
      }
    },
    [user]
  );

  return <NavigationContainer>{getScreens(user)}</NavigationContainer>;
};

export default CloserNavigation;
