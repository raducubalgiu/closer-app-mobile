import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { PortalProvider } from "@gorhom/portal";
import "../i18next";
import { useTranslation } from "react-i18next";
import theme from "../assets/styles/theme";
import { useAuth, useGet } from "../hooks";
import { RootStackParams } from "./rootStackParams";
import {
  AccountScreen,
  AccountInfoScreen,
  AccountInfoEmailScreen,
  AccountInfoGenderScreen,
  AccountPasswordScreen,
  AssistanceScreen,
  AddScheduleScreen,
  AuthScreen,
  ClearCacheScreen,
  DeleteAccountScreen,
  DeleteAccountPermanentlyScreen,
  DisableAccountScreen,
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
  MyCalendarStatisticsScreen,
  MyCalendarSettingsScreen,
  MyLocationScreen,
  MyJobsScreen,
  AddJobsScreen,
  AddLocationScreen,
  AddProductsScreen,
  AddUserProgramScreen,
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
  SoundScreen,
  CalendarScreen,
  CommentsScreen,
  FeedExploreScreen,
  FeedFollowingsScreen,
  FeedBookablesScreen,
  FeedLastMinuteScreen,
  FeedVideoExploreScreen,
  FiltersDateScreen,
  FiltersServiceScreen,
  HashtagScreen,
  HomeScreen,
  HideAccountScreen,
  LikesScreen,
  LocationsScreen,
  LocationFiltersScreen,
  MapScreen,
  MessageItemScreen,
  MessageNewScreen,
  MessagesScreen,
  NotificationsScreen,
  ProductScreen,
  PrivacyScreen,
  PrivacyCommentsScreen,
  PrivacyLikesScreen,
  PrivacyFollowingsScreen,
  PrivacyBlockedAccounts,
  PrivacyTagsAndMentionsScreen,
  PrivacyMentionsScreen,
  PrivacyTagsScreen,
  ProductReviewsScreen,
  ReportAProblemScreen,
  SchedulesScreen,
  ScheduleCancelScreen,
  ScheduleConfirmScreen,
  ScheduleDetailsScreen,
  SearchAllScreen,
  SearchPostsScreen,
  SearchServicesScreen,
  ServiceScreen,
  LoginScreen,
  RegisterBusinessScreen,
  RegisterScreen,
  SavingDataScreen,
  VideosScreen,
  UsernameScreen,
  CameraScreen,
  CameraPreviewScreen,
  MessageSettingsScreen,
  PhotoLibraryScreen,
  PhotoAlbumsScreen,
  AddPostScreen,
  UserLocationPermissionScreen,
} from "../screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator<RootStackParams>();

const { black, primary, error } = theme.lightColors || {};
import CustomAvatar from "../components/core/Avatars/CustomAvatar";

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

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Stack.Screen name="FeedExplore" component={FeedExploreScreen} />
      <Stack.Screen name="FeedFollowings" component={FeedFollowingsScreen} />
      <Stack.Screen name="FeedBookables" component={FeedBookablesScreen} />
      <Stack.Screen name="FeedLastMinute" component={FeedLastMinuteScreen} />
    </Stack.Navigator>
  );
};

const TabsScreen = () => {
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
      <Tab.Screen name="FeedStack" component={FeedStack} />
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

const CloserNavigation = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      {user ? (
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
                options={{ animation: "fade_from_bottom" }}
              />
              <RootStack.Screen
                name="FiltersService"
                component={FiltersServiceScreen}
              />
              <RootStack.Screen name="Locations" component={LocationsScreen} />
              <RootStack.Screen
                name="LocationFilters"
                component={LocationFiltersScreen}
                options={{ presentation: "modal" }}
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
                name="AddSchedule"
                component={AddScheduleScreen}
                options={{
                  presentation: "modal",
                  gestureEnabled: false,
                }}
              />
              <RootStack.Screen
                name="MyCalendarStatistics"
                component={MyCalendarStatisticsScreen}
              />
              <RootStack.Screen
                name="MyCalendarSettings"
                component={MyCalendarSettingsScreen}
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
            <RootStack.Group>
              <RootStack.Screen
                name="Settings"
                component={SettingsProfileScreen}
              />
              <RootStack.Screen name="Account" component={AccountScreen} />
              <RootStack.Screen
                name="AccountInfo"
                component={AccountInfoScreen}
              />
              <RootStack.Screen
                name="AccountInfoEmail"
                component={AccountInfoEmailScreen}
              />
              <RootStack.Screen
                name="AccountInfoGender"
                component={AccountInfoGenderScreen}
              />
              <RootStack.Screen
                name="AccountPassword"
                component={AccountPasswordScreen}
              />
              <RootStack.Screen
                name="DeleteAccount"
                component={DeleteAccountScreen}
              />
              <RootStack.Screen
                name="DeleteAccountPermanently"
                component={DeleteAccountPermanentlyScreen}
              />
              <RootStack.Screen
                name="DisableAccount"
                component={DisableAccountScreen}
              />
              <RootStack.Screen
                name="HideAccount"
                component={HideAccountScreen}
              />
              <RootStack.Screen name="Privacy" component={PrivacyScreen} />
              <RootStack.Screen
                name="PrivacyComments"
                component={PrivacyCommentsScreen}
              />
              <RootStack.Screen
                name="PrivacyLikes"
                component={PrivacyLikesScreen}
              />
              <RootStack.Screen
                name="PrivacyFollowings"
                component={PrivacyFollowingsScreen}
              />
              <RootStack.Screen
                name="PrivacyBlockedAccounts"
                component={PrivacyBlockedAccounts}
              />
              <RootStack.Screen
                name="PrivacyTagsAndMentions"
                component={PrivacyTagsAndMentionsScreen}
              />
              <RootStack.Screen
                name="PrivacyMentions"
                component={PrivacyMentionsScreen}
              />
              <RootStack.Screen
                name="PrivacyTags"
                component={PrivacyTagsScreen}
              />
              <RootStack.Screen
                name="ClearCache"
                component={ClearCacheScreen}
              />
              <RootStack.Screen
                name="SavingData"
                component={SavingDataScreen}
              />
              <RootStack.Screen
                name="Assistance"
                component={AssistanceScreen}
              />
              <RootStack.Screen
                name="ReportAProblem"
                component={ReportAProblemScreen}
              />
            </RootStack.Group>
            <RootStack.Screen
              name="ScheduleDetails"
              component={ScheduleDetailsScreen}
            />
            <RootStack.Screen
              name="ScheduleCancel"
              component={ScheduleCancelScreen}
              options={{
                headerShown: true,
                headerTitle: "",
                headerBackButtonMenuEnabled: false,
                headerTintColor: black,
                headerShadowVisible: false,
              }}
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
            <RootStack.Screen name="Comments" component={CommentsScreen} />
            <RootStack.Screen name="SearchAll" component={SearchAllScreen} />
            <RootStack.Screen name="Hashtag" component={HashtagScreen} />
            <RootStack.Screen name="Service" component={ServiceScreen} />
            <RootStack.Screen name="Product" component={ProductScreen} />
            <RootStack.Screen name="Sound" component={SoundScreen} />
            <RootStack.Screen
              name="ProductReviews"
              component={ProductReviewsScreen}
            />
            <RootStack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
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
              name="AddProgram"
              component={AddUserProgramScreen}
            />
            <RootStack.Screen name="AddPost" component={AddPostScreen} />
            <RootStack.Group
              screenOptions={{
                gestureEnabled: false,
                animation: "fade",
                animationDuration: 200,
              }}
            >
              <RootStack.Screen name="Videos" component={VideosScreen} />
              <RootStack.Screen
                name="FeedVideoExplore"
                component={FeedVideoExploreScreen}
              />
            </RootStack.Group>
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
            <RootStack.Screen name="Likes" component={LikesScreen} />
            <RootStack.Screen
              name="SearchPosts"
              component={SearchPostsScreen}
              //options={{ animation: "simple_push" }}
            />
            <RootStack.Screen
              name="UserLocationPermission"
              component={UserLocationPermissionScreen}
            />
          </RootStack.Navigator>
        </PortalProvider>
      ) : (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default CloserNavigation;
