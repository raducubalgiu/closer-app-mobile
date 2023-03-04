import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Pressable,
  Text,
  Platform,
} from "react-native";
import { useCallback, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Protected, Button, Stack } from "../../../components/core";
import {
  HeaderProfile,
  PostOptionsSheet,
  ProfileIconButton,
  ProfileMenuSheet,
} from "../../../components/customized";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import PostsProfileTab from "../../../components/customized/Tabs/ProfileTabs/PostsProfileTab";
import VideosVTab from "../../../components/customized/Tabs/ProfileTabs/VideosVTab";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { useSheet, useAuth, useGet } from "../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { FAB } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const { width } = Dimensions.get("window");
const { primary } = theme.lightColors || {};

const HEADER_HEIGHT = 300;

export const ProfileScreen = () => {
  const { user: userContext } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const scrollY = useRef<any>(new Animated.Value(0)).current;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", icon: "grid-large" },
    { key: "videos", icon: "play-box-multiple-outline" },
  ]);

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

  const navigateBookmarks = () =>
    navigation.navigate("Bookmarks", { user: userContext });
  const navigateProfile = () =>
    navigation.navigate("EditProfile", { user: userContext });
  const navigateInstagram = () => navigation.navigate("ExploreVideoPortrait");
  const navigateYoutube = () => {};

  const Posts = useCallback(
    () => (
      <PostsProfileTab
        userId={user?.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      />
    ),
    [user]
  );

  const Videos = useCallback(
    () => (
      <VideosVTab
        userId={user?.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      />
    ),
    [user]
  );

  const renderScene = SceneMap({
    posts: Posts,
    videos: Videos,
  });

  const scrollHeader = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolateRight: "clamp",
  });

  const renderLabel = useCallback(
    ({ route, focused }: any) => (
      <Icon
        name={route.icon}
        type="material-community"
        color={focused ? "black" : "#ddd"}
      />
    ),
    []
  );

  const renderTabBar = useCallback((props: any) => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, 0],
      extrapolateRight: "clamp",
    });

    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}
      >
        <TabBar
          {...props}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <HeaderProfile
        checkmark={checkmark}
        onGoToFindFriends={() => navigation.navigate("FindFriends")}
        username={username}
        onOpenSettings={SHOW_BS}
        onOpenPostOptions={showPostOptions}
      />
      <View style={{ flex: 1 }}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(id) => setIndex(id)}
          renderTabBar={renderTabBar}
          initialLayout={{ width, height: 0 }}
        />
        <Animated.View
          style={[styles.header, { transform: [{ translateY: scrollHeader }] }]}
        >
          {userContext?.settings?.status === "hidden" && (
            <Pressable onPress={() => navigation.navigate("HideAccount")}>
              <Stack sx={styles.hidden}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {t("yourAccountIsHidden")}
                </Text>
              </Stack>
            </Pressable>
          )}
          <ProfileOverview
            name={userContext?.name}
            username={userContext?.username}
            avatar={userContext?.avatar}
            user={user}
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
        </Animated.View>
      </View>
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
  header: {
    height: HEADER_HEIGHT,
    position: "absolute",
  },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    height: 45,
    backgroundColor: "white",
  },
  indicator: { backgroundColor: "#222" },
});
