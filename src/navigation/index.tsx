import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import "../../i18next";
import { useAuth } from "../hooks";
import { RootStackParams } from "./rootStackParams";
import {
  AccountScreen,
  AccountInfoScreen,
  AccountInfoEmailScreen,
  AccountInfoGenderScreen,
  AccountPasswordScreen,
  AssistanceScreen,
  AddPhotosScreen,
  AddVideosScreen,
  AddPhotosPreviewScreen,
  AddPostScreen,
  AddScheduleScreen,
  ClearCacheScreen,
  CameraScreen,
  CameraTimerScreen,
  CameraPreviewScreen,
  ChatSettingsScreen,
  ChatGroupSettingsScreen,
  ChatGroupUsersScreen,
  ChatGroupUserScreen,
  ChatGroupNameScreen,
  ChatGroupMediaScreen,
  ChatGroupAddUsersScreen,
  ChatGroupCreateScreen,
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
  EditAvatarCameraScreen,
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
  FiltersDateScreen,
  FiltersServiceScreen,
  HashtagScreen,
  HideAccountScreen,
  LanguageScreen,
  LanguageAppScreen,
  LanguageTranslationScreen,
  LikesScreen,
  LocationsScreen,
  LocationFiltersScreen,
  MapScreen,
  MessagesScreen,
  MessageNewScreen,
  MessagesSearchScreen,
  NotificationsScreen,
  ProductScreen,
  PrivacyScreen,
  PrivacyCommentsScreen,
  PrivacyCommentsCreateScreen,
  PrivacyCommentsViewScreen,
  PrivacyLikesScreen,
  PrivacyFollowingsScreen,
  PrivacyBlockedAccounts,
  PrivacyTagsAndMentionsScreen,
  PrivacyMentionsScreen,
  PrivacyTagsScreen,
  ProductReviewsScreen,
  ReportAProblemScreen,
  ReportUserScreen,
  ScheduleCancelScreen,
  ScheduleConfirmScreen,
  ScheduleDetailsScreen,
  SearchAllScreen,
  SearchPostsScreen,
  SearchServicesScreen,
  ServiceScreen,
  SavingDataScreen,
  StoryScreen,
  PhotoLibraryScreen,
  PhotoAlbumsScreen,
  SearchPopularDetailScreen,
  TagUsersScreen,
} from "../screens";

const Stack = createNativeStackNavigator<RootStackParams>();
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { PortalProvider } from "@gorhom/portal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <PortalProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App" component={TabNavigator} />
            <Stack.Screen
              name="SearchPosts"
              component={SearchPostsScreen}
              options={{
                animation: "fade",
                animationDuration: 150,
              }}
            />
            <Stack.Screen
              name="SearchAll"
              component={SearchAllScreen}
              options={{
                animation: "fade",
                animationDuration: 150,
              }}
            />
            <Stack.Screen
              name="SearchPopular"
              component={SearchPopularDetailScreen}
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
            <Stack.Screen
              name="SearchServices"
              component={SearchServicesScreen}
              options={{ animation: "fade", animationDuration: 150 }}
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
            <Stack.Screen name="ReportUser" component={ReportUserScreen} />
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
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
            <Stack.Screen
              name="ChatGroupSettings"
              component={ChatGroupSettingsScreen}
            />
            <Stack.Screen
              name="ChatGroupUsers"
              component={ChatGroupUsersScreen}
            />
            <Stack.Screen
              name="ChatGroupName"
              component={ChatGroupNameScreen}
            />
            <Stack.Screen
              name="ChatGroupMedia"
              component={ChatGroupMediaScreen}
            />
            <Stack.Screen
              name="ChatGroupAddUsers"
              component={ChatGroupAddUsersScreen}
            />
            <Stack.Screen
              name="ChatGroupUser"
              component={ChatGroupUserScreen}
            />
            <Stack.Screen
              name="ChatGroupCreate"
              component={ChatGroupCreateScreen}
            />
            <Stack.Screen
              name="MessageNew"
              component={MessageNewScreen}
              options={{ animation: "simple_push" }}
            />
            <Stack.Screen
              name="MessagesSearch"
              component={MessagesSearchScreen}
              options={{ animation: "fade_from_bottom" }}
            />
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
            <Stack.Screen
              name="PrivacyCommentsCreate"
              component={PrivacyCommentsCreateScreen}
            />
            <Stack.Screen
              name="PrivacyCommentsView"
              component={PrivacyCommentsViewScreen}
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
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="LanguageApp" component={LanguageAppScreen} />
            <Stack.Screen
              name="LanguageTranslation"
              component={LanguageTranslationScreen}
            />
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
            <Stack.Screen
              name="AddPhotos"
              component={AddPhotosScreen}
              options={{ animation: "fade", animationDuration: 200 }}
            />
            <Stack.Screen
              name="AddVideos"
              component={AddVideosScreen}
              options={{ animation: "fade", animationDuration: 200 }}
            />
            <Stack.Screen
              name="AddPhotosPreview"
              component={AddPhotosPreviewScreen}
              options={{ animation: "none" }}
            />
            <Stack.Screen name="AddPost" component={AddPostScreen} />
            <Stack.Screen name="TagUsers" component={TagUsersScreen} />
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
            <Stack.Screen
              name="EditAvatarCamera"
              component={EditAvatarCameraScreen}
            />
            <Stack.Screen
              name="EditAvatar"
              component={EditAvatarScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="CameraTimer"
              component={CameraTimerScreen}
              options={{ animation: "none" }}
            />
            <Stack.Screen
              name="CameraPreview"
              component={CameraPreviewScreen}
              options={{ animation: "none" }}
            />
            <Stack.Screen name="Likes" component={LikesScreen} />
          </Stack.Navigator>
        </PortalProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
