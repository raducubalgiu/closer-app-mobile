import { StyleSheet, SafeAreaView } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { Protected, CFAB, Button } from "../../../components/core";
import {
  ProfileMenuList,
  HeaderProfile,
  TopTabProfile,
  ProfileIconButton,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
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
    profileMenu
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
});
