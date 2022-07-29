import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { Protected, MainButton, CFAB } from "../../../components/core";
import { SocialIconButton } from "../../../components/core";
import { useSheet, useAuth } from "../../../hooks";
import {
  TopTabContainer,
  ProfileOverview,
  ProfileMenuList,
  PostsProfileTab,
  AboutProfileTab,
  HeaderProfile,
} from "../../../components/customized";

const { height } = Dimensions.get("window");

const ProfileScreen = ({ badgeDetails }) => {
  const { user } = useAuth();
  const { _id, name, username, avatar, checkmark, description } = user || {};
  const { counter, role, services, hours } = user || {};
  const { website, location, business } = user || {};
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={_id} username={username} />,
    [_id]
  );

  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        biography={description}
        website={website}
        location={location}
        role={role}
        hours={hours}
      />
    ),
    [description, website, location, role, hours]
  );

  const closeSheet = useCallback(() => CLOSE_BS(), []);
  const profileMenu = <ProfileMenuList onCloseSheet={closeSheet} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["25%", "60%"],
    profileMenu,
    closeSheet
  );
  const navigateBookmarks = () => navigation.navigate("Bookmarks");
  const navigateProfile = () => navigation.navigate("EditProfile");
  const navigateInstagram = () => {};
  const navigateYoutube = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        username={username}
        onOpenSettings={SHOW_BS}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileOverview
          _id={user?._id}
          name={name}
          username={username}
          avatar={avatar}
          role={role}
          services={services}
          business={business}
          counter={counter}
          withBadge
          badgeDetails={badgeDetails}
          withAvailable={false}
          available={false}
          showDetails={false}
        >
          <MainButton
            variant="outlined"
            title={t("editProfile")}
            radius={2.5}
            sx={{ borderWidth: 1, borderColor: "#ddd" }}
            onPress={navigateProfile}
          />
          <SocialIconButton onPress={navigateBookmarks} name="bookmark" />
          <SocialIconButton onPress={navigateInstagram} name="instagram" />
          <SocialIconButton onPress={navigateYoutube} name="youtube" />
        </ProfileOverview>
        <View style={{ height }}>
          <TopTabContainer initialRouteName="Posts" profileTabs={true}>
            <Tab.Screen name="Posts" component={PostsProfile} />
            <Tab.Screen name="About" component={AboutProfile} />
          </TopTabContainer>
        </View>
      </ScrollView>
      <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={role}>
        <CFAB
          onPress={() => navigation.navigate("MyCalendar")}
          icon={{ name: "calendar", type: "feather", color: "white" }}
        />
      </Protected>
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  editBtn: {
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 0,
  },
  savedBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
  },
  tabsCont: {},
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
