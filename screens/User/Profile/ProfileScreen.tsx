import { StyleSheet, View, Text, Pressable } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import theme from "../../../assets/styles/theme";
import { Protected, Button, Stack } from "../../../components/core";
import {
  HeaderProfile,
  TopTabProfile,
  PostOptionsSheet,
  ProfileIconButton,
  ProfileMenuSheet,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { useSheet, useAuth, useGet, useRefreshOnFocus } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { FAB } from "@rneui/themed";
import { useTranslation } from "react-i18next";

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

  const closeSheet = useCallback(() => CLOSE_BS(), []);
  const profileMenu = <ProfileMenuSheet onCloseSheet={closeSheet} />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet([1, 200], profileMenu, {
    duration: 200,
  });

  const postSheet = <PostOptionsSheet />;
  const { BOTTOM_SHEET: postOptions, SHOW_BS: showPostOptions } = useSheet(
    [1, 200],
    postSheet,
    { duration: 200 }
  );

  useRefreshOnFocus(refetch);

  const navigateBookmarks = () =>
    navigation.navigate("Bookmarks", { user: userContext });
  const navigateProfile = () =>
    navigation.navigate("EditProfile", { user: userContext });
  const navigateInstagram = () => navigation.navigate("ExploreVideoPortrait");
  const navigateYoutube = () =>
    navigation.navigate("Test", { user: userContext });

  return (
    <View style={styles.container}>
      <View style={{ height: 100, zIndex: 10000 }}>
        <HeaderProfile
          checkmark={checkmark}
          onGoToFindFriends={() => navigation.navigate("FindFriends")}
          username={username}
          onOpenSettings={SHOW_BS}
          onOpenPostOptions={showPostOptions}
        />
      </View>
      {userContext?.status === "hidden" && (
        <Pressable onPress={() => navigation.navigate("HideAccount")}>
          <Stack sx={styles.hidden}>
            <Text style={{ color: "white", fontWeight: "500" }}>
              {t("yourAccountIsHidden")}
            </Text>
          </Stack>
        </Pressable>
      )}
      <TopTabProfile
        userId={user?.id}
        service={null}
        option={null}
        user={user}
        profileOverview={
          <ProfileOverview
            user={user}
            name={user?.name}
            username={user?.username}
            avatar={user?.avatar}
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
        }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  hidden: {
    marginHorizontal: 15,
    marginBottom: 15,
    height: 32.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
});
