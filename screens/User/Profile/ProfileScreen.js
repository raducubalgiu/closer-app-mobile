import { StyleSheet, SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BottomSheetPopup from "../../../components/customized/BottomSheets/BottomSheetPopup";
import { useNavigation } from "@react-navigation/native";
import SwitchAccount from "../../../components/customized/SwitchAccount/SwitchAccount";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import OutlinedButton from "../../../components/core/Buttons/OutlinedButton";
import HeaderProfile from "../../../components/customized/Headers/HeaderProfile";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";
import theme from "../../../assets/styles/theme";
import SettingsList from "../../../components/customized/Lists/SettingsList";
import { FAB, Icon } from "@rneui/themed";

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const {
    _id,
    business,
    followersCount,
    followingCount,
    ratingsAverage,
    ratingsQuantity,
    username,
    services,
    avatar,
    role,
  } = user;
  const navigation = useNavigation();
  const [openSettings, setOpenSettings] = useState(false);
  const [posts, setPosts] = useState([]);

  const closeSheet = useCallback(() => {
    setOpenSwitch(false);
    setOpenSettings(false);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/get-posts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

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
        onOpenSwitch={() => setOpenSwitch(true)}
        name={user?.name}
        onOpenSettings={() => {
          setOpenSettings(true);
        }}
      />
      <ProfileOverview
        userId={_id}
        username={username}
        checkmark={false}
        followersCount={followersCount}
        followingCount={followingCount}
        avatar={avatar?.url}
        business={business?.name}
        role={role}
        ratingsAverage={ratingsAverage}
        ratingsQuantity={ratingsQuantity}
        services={services}
        withBadge={true}
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
      />
      <TopTabNavigator
        role={user?.role}
        posts={posts}
        products={user?.products}
        biography={user?.description}
        website={user?.website}
        location={user?.location}
      />

      <FAB
        visible={true}
        icon={{ name: "calendar", type: "feather", color: "white" }}
        color={theme.lightColors.primary}
        placement="right"
        onPress={() => navigation.navigate("MyCalendar")}
      />
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
