import { StyleSheet, SafeAreaView } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import {
  Protected,
  MainButton,
  CFAB,
  SocialIconButton,
} from "../../../components/core";
import {
  ProfileOverview,
  ProfileMenuList,
  HeaderProfile,
  TopTabProfile,
} from "../../../components/customized";
import { useSheet, useAuth } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

export const ProfileScreen = () => {
  const { user } = useAuth();
  const { name, username, avatar, checkmark, role } = user || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const closeSheet = useCallback(() => CLOSE_BS(), []);
  const profileMenu = <ProfileMenuList onCloseSheet={closeSheet} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    [10, "60%"],
    profileMenu,
    closeSheet
  );
  const navigateBookmarks = () => navigation.navigate("Bookmarks", { user });
  const navigateProfile = () => navigation.navigate("EditProfile", { user });
  const navigateInstagram = () => navigation.navigate("SharedList");
  const navigateYoutube = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfile
        checkmark={checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        username={username}
        onOpenSettings={SHOW_BS}
      />
      <ProfileOverview
        user={user}
        name={name}
        username={username}
        avatar={avatar}
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
      <TopTabProfile
        userId={user?._id}
        service={null}
        option={null}
        user={user}
      />
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
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
