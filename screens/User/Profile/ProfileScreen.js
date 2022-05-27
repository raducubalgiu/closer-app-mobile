import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useCallback, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FAB, Icon } from "@rneui/themed";
import { Protected, Button, MainButton } from "../../../components/core";
import {
  TopTabContainer,
  ProfileOverview,
  SettingsList,
  PostsProfileTab,
  AboutProfileTab,
  HeaderProfile,
} from "../../../components/customized";
import { useAuth } from "../../../hooks/auth";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import theme from "../../../assets/styles/theme";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useTranslation } from "react-i18next";

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  const { t } = useTranslation();

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={user?._id} username={user?.username} />,
    [user?._id]
  );

  const AboutProfile = () => (
    <AboutProfileTab
      biography={user?.description}
      website={user?.website}
      location={user?.location}
      role={user?.role}
    />
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  const buttons = (
    <>
      <MainButton
        variant="outlined"
        title={t("editProfile")}
        radius={2.5}
        sx={{ borderWidth: 1, borderColor: "#ddd" }}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
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

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={user?.checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        name={user?.name}
        onOpenSettings={handlePresentModalPress}
      />
      <ProfileOverview
        user={user}
        withBadge
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
        username={user?.username}
        avatar={user?.avatar}
        withAvailable={true}
        available={true}
      />
      <View style={styles.tabsCont}>
        <TopTabContainer initialRouteName="Posts" profileTabs={true}>
          <Tab.Screen name="Posts" component={PostsProfile} />
          <Tab.Screen name="About" component={AboutProfile} />
        </TopTabContainer>
      </View>
      <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={user?.role}>
        <FAB
          visible={true}
          icon={{ name: "calendar", type: "feather", color: "white" }}
          color={theme.lightColors.primary}
          placement="right"
          onPress={() => navigation.navigate("MyCalendar")}
        />
      </Protected>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
          >
            <SettingsList onCloseModal={handleCloseSheet} />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
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
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
