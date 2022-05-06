import { StyleSheet, SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useState, useCallback } from "react";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { useNavigation } from "@react-navigation/native";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { OutlinedButton, Protected } from "../../../components/core";
import HeaderProfile from "../../../components/customized/Headers/HeaderProfile";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";
import theme from "../../../assets/styles/theme";
import SettingsList from "../../../components/customized/Lists/SettingsList";
import { FAB, Icon } from "@rneui/themed";

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [openSettings, setOpenSettings] = useState(false);

  const closeSheet = useCallback(() => {
    setOpenSettings(false);
  }, []);

  console.log("RENDER PROFILE SCREEN!");

  const tabsNavigator = (
    <TopTabNavigator
      role={user?.role}
      userId={user?._id}
      // products={user?.products}
      // biography={user?.description}
      // website={user?.website}
      // location={user?.location}
    />
  );

  const buttons = (
    <>
      <OutlinedButton
        title="Editeaza profilul"
        onPress={() => navigation.navigate("EditProfile")}
        sx={styles.editBtn}
      />
      <TouchableOpacity
        style={styles.savedBtn}
        onPress={() => navigation.navigate("Bookmarks")}
      >
        <Icon
          name="bookmark"
          type="feather"
          size={20}
          color={theme.lightColors.black}
        />
      </TouchableOpacity>
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
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        name={user?.name}
        onOpenSettings={() => setOpenSettings(true)}
      />
      <ProfileOverview
        user={user}
        withBadge={true}
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
      />
      <View style={{ flex: 1, height: 700 }}>{tabsNavigator}</View>
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
});
