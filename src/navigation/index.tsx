import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import "../i18next";
import { useAuth } from "../hooks";
import { RootStackParams } from "./rootStackParams";
import {
  AccountScreen,
  AccountInfoScreen,
  AccountInfoEmailScreen,
  AccountInfoGenderScreen,
  AccountPasswordScreen,
  AssistanceScreen,
  AddScheduleScreen,
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
  ProfileGeneralScreen,
  ProfileStatsScreen,
  SettingsProfileScreen,
  SoundScreen,
  CalendarScreen,
  CommentsScreen,
  FeedVideoExploreScreen,
  FiltersDateScreen,
  FiltersServiceScreen,
  HashtagScreen,
  HideAccountScreen,
  LikesScreen,
  LocationsScreen,
  LocationFiltersScreen,
  MapScreen,
  MessageItemScreen,
  MessageNewScreen,
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
  ScheduleCancelScreen,
  ScheduleConfirmScreen,
  ScheduleDetailsScreen,
  SearchAllScreen,
  SearchPostsScreen,
  SearchServicesScreen,
  ServiceScreen,
  SavingDataScreen,
  StoryScreen,
  CameraScreen,
  CameraPreviewScreen,
  MessageSettingsScreen,
  PhotoLibraryScreen,
  PhotoAlbumsScreen,
  AddPostScreen,
  UserLocationPermissionScreen,
  UserPostsScreen,
} from "../../screens";

const Stack = createSharedElementStackNavigator<RootStackParams>();
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { PortalProvider } from "@gorhom/portal";

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <PortalProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App" component={TabNavigator} />
            <Stack.Screen
              name="SearchServices"
              component={SearchServicesScreen}
            />
            <Stack.Screen name="FiltersDate" component={FiltersDateScreen} />
            <Stack.Screen
              name="FiltersService"
              component={FiltersServiceScreen}
            />
            <Stack.Screen name="Locations" component={LocationsScreen} />
            <Stack.Screen
              name="LocationFilters"
              component={LocationFiltersScreen}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="EditName" component={EditNameScreen} />
            <Stack.Screen name="EditWebsite" component={EditWebsiteScreen} />
            <Stack.Screen name="EditBio" component={EditBioScreen} />
            <Stack.Screen name="EditUsername" component={EditUsernameScreen} />
            <Stack.Screen
              name="EditProfession"
              component={EditProfessionScreen}
            />
            <Stack.Screen name="MyBusiness" component={MyBusinessScreen} />
            <Stack.Screen name="MyDashboard" component={MyDashboardScreen} />
            <Stack.Screen name="MyCalendar" component={MyCalendarScreen} />
            <Stack.Screen
              name="AddSchedule"
              component={AddScheduleScreen}
              options={{
                presentation: "modal",
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="MyCalendarStatistics"
              component={MyCalendarStatisticsScreen}
            />
            <Stack.Screen
              name="MyCalendarSettings"
              component={MyCalendarSettingsScreen}
            />
            <Stack.Screen name="MyLocation" component={MyLocationScreen} />
            <Stack.Screen name="MyProducts" component={MyProductsScreen} />
            <Stack.Screen name="MyJobs" component={MyJobsScreen} />
            <Stack.Screen name="AddLocation" component={AddLocationScreen} />
            <Stack.Screen name="AddServices" component={AddServicesScreen} />
            <Stack.Screen name="AddProducts" component={AddProductsScreen} />
            <Stack.Screen name="AddJobs" component={AddJobsScreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} />
            <Stack.Screen name="MessageItem" component={MessageItemScreen} />
            <Stack.Screen
              name="MessageSettings"
              component={MessageSettingsScreen}
            />
            <Stack.Screen name="MessageNew" component={MessageNewScreen} />
            <Stack.Screen name="Settings" component={SettingsProfileScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
            <Stack.Screen
              name="AccountInfoEmail"
              component={AccountInfoEmailScreen}
            />
            <Stack.Screen
              name="AccountInfoGender"
              component={AccountInfoGenderScreen}
            />
            <Stack.Screen
              name="AccountPassword"
              component={AccountPasswordScreen}
            />
            <Stack.Screen
              name="DeleteAccount"
              component={DeleteAccountScreen}
            />
            <Stack.Screen
              name="DeleteAccountPermanently"
              component={DeleteAccountPermanentlyScreen}
            />
            <Stack.Screen
              name="DisableAccount"
              component={DisableAccountScreen}
            />
            <Stack.Screen name="HideAccount" component={HideAccountScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen
              name="PrivacyComments"
              component={PrivacyCommentsScreen}
            />
            <Stack.Screen name="PrivacyLikes" component={PrivacyLikesScreen} />
            <Stack.Screen
              name="PrivacyFollowings"
              component={PrivacyFollowingsScreen}
            />
            <Stack.Screen
              name="PrivacyBlockedAccounts"
              component={PrivacyBlockedAccounts}
            />
            <Stack.Screen
              name="PrivacyTagsAndMentions"
              component={PrivacyTagsAndMentionsScreen}
            />
            <Stack.Screen
              name="PrivacyMentions"
              component={PrivacyMentionsScreen}
            />
            <Stack.Screen name="PrivacyTags" component={PrivacyTagsScreen} />
            <Stack.Screen name="ClearCache" component={ClearCacheScreen} />
            <Stack.Screen name="SavingData" component={SavingDataScreen} />
            <Stack.Screen name="Assistance" component={AssistanceScreen} />
            <Stack.Screen
              name="ReportAProblem"
              component={ReportAProblemScreen}
            />
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
            <Stack.Screen name="AllBookmarks" component={AllBookmarksScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} />
            <Stack.Screen name="SearchAll" component={SearchAllScreen} />
            <Stack.Screen name="Hashtag" component={HashtagScreen} />
            <Stack.Screen name="Service" component={ServiceScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Sound" component={SoundScreen} />
            <Stack.Screen name="Story" component={StoryScreen} />
            <Stack.Screen
              name="ProductReviews"
              component={ProductReviewsScreen}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
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
            <Stack.Screen name="AddProgram" component={AddUserProgramScreen} />
            <Stack.Screen name="AddPost" component={AddPostScreen} />
            <Stack.Screen
              name="FeedVideoExplore"
              component={FeedVideoExploreScreen}
            />
            <Stack.Screen
              options={{ presentation: "modal" }}
              name="PhotoLibrary"
              component={PhotoLibraryScreen}
            />
            <Stack.Screen
              options={{
                presentation: "modal",
              }}
              name="PhotoAlbums"
              component={PhotoAlbumsScreen}
            />
            <Stack.Screen name="EditAvatar" component={EditAvatarScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen
              name="CameraPreview"
              component={CameraPreviewScreen}
            />
            <Stack.Screen name="Likes" component={LikesScreen} />
            <Stack.Screen name="SearchPosts" component={SearchPostsScreen} />
            <Stack.Screen
              name="UserLocationPermission"
              component={UserLocationPermissionScreen}
            />
          </Stack.Navigator>
        </PortalProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
