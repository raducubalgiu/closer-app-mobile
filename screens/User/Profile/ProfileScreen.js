import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FAB, Icon } from "@rneui/themed";
import { Protected, Button, MainButton } from "../../../components/core";
import {
  TopTabContainer,
  ProfileOverview,
  ProfileMenuList,
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

const { black, primary } = theme.lightColors;
const { width, height } = Dimensions.get("window");

const ProfileScreen = (props) => {
  const { user } = useAuth();
  const {
    _id,
    name,
    username,
    avatar,
    checkmark,
    description,
    website,
    location,
    business,
    counter,
    role,
    opening_hours,
  } = user || {};
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);
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
        openingHours={opening_hours}
      />
    ),
    [description, website, location, role, opening_hours]
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
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        username={username}
        onOpenSettings={handlePresentModalPress}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileOverview
          _id={user?._id}
          name={name}
          avatar={avatar}
          role={role}
          business={business}
          counter={counter}
          withBadge
          badgeDetails={props.badgeDetails}
          withAvailable={false}
          available={false}
        >
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
            <Icon name="bookmark" type="feather" size={20} color={black} />
          </Button>
          <Icon
            name="instagram"
            type="feather"
            size={20}
            style={styles.socialBtn}
            color={black}
          />
          <Icon
            name="youtube"
            type="feather"
            size={20}
            style={styles.socialBtn}
            color={black}
          />
        </ProfileOverview>
        <View style={{ height }}>
          <TopTabContainer initialRouteName="Posts" profileTabs={true}>
            <Tab.Screen name="Posts" component={PostsProfile} />
            <Tab.Screen name="About" component={AboutProfile} />
          </TopTabContainer>
        </View>
      </ScrollView>
      <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={user?.role}>
        <FAB
          activeOpacity={1}
          visible={true}
          icon={{ name: "calendar", type: "feather", color: "white" }}
          color={primary}
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
            <ProfileMenuList onCloseSheet={handleCloseSheet} />
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
  tabsCont: {},
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
