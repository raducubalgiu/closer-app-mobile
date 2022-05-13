import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FAB, Icon } from "@rneui/themed";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { OutlinedButton, Protected, Button } from "../../../components/core";
import {
  TopTabContainer,
  ProfileOverview,
  SettingsList,
  PostsProfileTab,
  AboutProfileTab,
  HeaderProfile,
} from "../../../components/customized";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [openSettings, setOpenSettings] = useState(false);
  const Tab = createMaterialTopTabNavigator();

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={user?._id} />,
    [user?._id]
  );

  const AboutProfile = () => (
    <AboutProfileTab
      biography={user?.description}
      website={user?.website}
      location={user?.location}
    />
  );

  const closeSheet = useCallback(() => {
    setOpenSettings(false);
  }, []);

  console.log(user);

  const buttons = (
    <>
      <OutlinedButton
        title="Editeaza profilul"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
        sx={styles.editBtn}
      />
      <Button
        style={styles.savedBtn}
        onPress={() => navigation.navigate("Bookmarks")}
      >
        <Icon
          name="bookmark"
          type="feather"
          size={20}
          color={theme.lightColors.black}
        />
      </Button>
      <Icon
        name="instagram"
        type="feather"
        size={20}
        style={styles.socialBtn}
        color={theme.lightColors.black}
      />
      <Icon
        name="youtube"
        type="feather"
        size={20}
        style={styles.socialBtn}
        color={theme.lightColors.black}
      />
    </>
  );

  const sheetSettings = (
    <BottomSheetPopup
      open={openSettings}
      onClose={closeSheet}
      height={60}
      sheetBody={openSettings && <SettingsList />}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={user?.checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        name={user?.name}
        onOpenSettings={() => setOpenSettings(true)}
      />
      <ProfileOverview
        user={user}
        withBadge
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
      />
      <View style={styles.tabsCont}>
        <TopTabContainer initialRouteName="Posts" profileTabs={true}>
          <Tab.Screen name="Posts" component={PostsProfile} />
          <Tab.Screen name="About" component={AboutProfile} />
        </TopTabContainer>
      </View>
      <Protected roles={[process.env.MAIN_ROLE, process.env.SECOND_ROLE]}>
        <FAB
          visible={true}
          icon={{ name: "calendar", type: "feather", color: "white" }}
          color={theme.lightColors.primary}
          placement="right"
          onPress={() => navigation.navigate("MyCalendar")}
        />
      </Protected>
      {sheetSettings}
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
  socialBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: 5,
  },
  tabsCont: { flex: 1, height: 700 },
});
