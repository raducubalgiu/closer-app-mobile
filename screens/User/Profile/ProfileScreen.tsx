import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import theme from "../../../assets/styles/theme";
import { Protected, Button } from "../../../components/core";
import {
  ProfileMenuList,
  HeaderProfile,
  TopTabProfile,
  ProfileIconButton,
  PostOptionsSheet,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { useSheet, useAuth, useGet, useRefreshOnFocus } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { FAB } from "@rneui/themed";

const { primary } = theme.lightColors || {};

export const ProfileScreen = () => {
  const { user: userContext } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const { data: user, refetch } = useGet({
    model: "fetchUser",
    uri: `/users/${userContext?.username}`,
  });

  const { username, checkmark, role } = user || {};
  const isBusiness = role === MAIN_ROLE || role === SECOND_ROLE;

  const closeSheet = useCallback(() => CLOSE_BS(), []);
  const profileMenu = <ProfileMenuList onCloseSheet={closeSheet} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["1%", isBusiness ? 235 : 200],
    profileMenu
  );

  const postSheet = <PostOptionsSheet />;
  const { BOTTOM_SHEET: postOptions, SHOW_BS: showPostOptions } = useSheet(
    [1, 230],
    postSheet
  );

  const navigateBookmarks = () => navigation.navigate("Bookmarks", { user });
  const navigateProfile = () => navigation.navigate("EditProfile", { user });
  const navigateInstagram = () => navigation.navigate("ExploreVideoPortrait");
  const navigateYoutube = () => navigation.navigate("AddProducts");

  useRefreshOnFocus(refetch);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        username={username}
        onOpenSettings={SHOW_BS}
        onOpenPostOptions={showPostOptions}
      />
      <ProfileOverview
        user={user}
        name={userContext?.name}
        username={userContext?.username}
        avatar={userContext?.avatar}
      >
        <Button
          title={t("editProfile")}
          onPress={navigateProfile}
          variant="outlined"
          sxBtn={{ width: 150 }}
        />
        <ProfileIconButton name="bookmark" onPress={navigateBookmarks} />
        <ProfileIconButton name="instagram" onPress={navigateInstagram} />
        <ProfileIconButton name="youtube" onPress={navigateYoutube} />
      </ProfileOverview>
      <TopTabProfile
        userId={user?.id}
        service={null}
        option={null}
        user={user}
      />
      <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={role}>
        <FAB
          color={primary}
          icon={{ name: "calendar", type: "feather", color: "white" }}
          placement="right"
          onPress={() => navigation.navigate("MyCalendar")}
        />
      </Protected>
      {BOTTOM_SHEET}
      {postOptions}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
