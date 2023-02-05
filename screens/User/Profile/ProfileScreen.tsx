import { StyleSheet, SafeAreaView, View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import theme from "../../../assets/styles/theme";
import { Protected } from "../../../components/core";
import {
  ProfileMenuList,
  HeaderProfile,
  TopTabProfile,
  PostOptionsSheet,
} from "../../../components/customized";
import { useSheet, useAuth, useGet, useRefreshOnFocus } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { FAB } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { primary } = theme.lightColors || {};

export const ProfileScreen = () => {
  const { user: userContext } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();

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

  useRefreshOnFocus(refetch);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
