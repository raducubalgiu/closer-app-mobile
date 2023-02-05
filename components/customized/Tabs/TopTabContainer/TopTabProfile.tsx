import { useCallback, useEffect, useRef, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { Icon } from "@rneui/themed";
import { VideosVTab } from "../ProfileTabs/VideosVTab";
import { JobsTab } from "../ProfileTabs/JobsTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { TabBadge } from "../TabBadge/TabBadge";
import theme from "../../../../assets/styles/theme";
import { User } from "../../../../models/user";
import ProfileOverview from "../../ProfileOverview/ProfileOverview";
import { Button } from "../../../core";
import { ProfileIconButton } from "../../IconButtons/ProfileIconButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { black } = theme.lightColors || {};
const { height } = Dimensions.get("window");

type IProps = { userId: string; service: any; option: any; user: User };

export const TopTabProfile = ({ userId, service, option, user }: IProps) => {
  const Tab = createMaterialTopTabNavigator();
  const { role } = user || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const TOP_TAB_HEIGHT = height - insets.top - insets.bottom;
  const HEADER_HEIGHT = 290;
  const listPB = HEADER_HEIGHT - insets.top - insets.bottom - 100;

  const value = useRef(new Animated.Value(0)).current;
  const headerTranslate = value.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: value } } }],
    {
      useNativeDriver: false,
    }
  );

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} onScroll={onScroll} />,
    [userId]
  );

  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab
        locationId={user?.locationId}
        userId={userId}
        service={service}
        option={option}
        onScroll={onScroll}
      />
    ),
    [userId, service, option, user]
  );

  const VideosVProfile = useCallback(
    () => <VideosVTab userId={userId} onScroll={onScroll} />,
    [userId]
  );

  const VideosHProfile = useCallback(
    () => <JobsTab userId={userId} />,
    [userId]
  );

  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        locationId={user?.locationId}
        website={user?.website}
        description={user?.description}
        email={user?.email}
        role={user?.role}
        hours={user?.hours}
        onScroll={onScroll}
        paddingBottom={listPB}
      />
    ),
    [user]
  );

  const navigateBookmarks = () => navigation.navigate("Bookmarks", { user });
  const navigateProfile = () => navigation.navigate("EditProfile", { user });
  const navigateInstagram = () => navigation.navigate("ExploreVideoPortrait");
  const navigateYoutube = () => navigation.navigate("Test", { user });

  return (
    <Animated.View style={[{ transform: [{ translateY: headerTranslate }] }]}>
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
      <View style={{ height: TOP_TAB_HEIGHT }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName = "";
              let iconType = "";
              let size = 22;

              if (route.name === "Posts") {
                iconType = "feather";
                iconName = focused ? "grid" : "grid";
              } else if (route.name === "Products") {
                iconType = "";
              } else if (route.name === "VideoV") {
                iconType = "feather";
                iconName = focused ? "video" : "video";
              } else if (route.name === "VideoH") {
                iconType = "feather";
                iconName = focused ? "video" : "video";
              } else if (route.name === "About") {
                iconType = "feather";
                iconName = focused ? "user-check" : "user-check";
              }
              return (
                <Icon
                  name={iconName}
                  type={iconType}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarActiveTintColor: black,
            tabBarInactiveTintColor: "#ccc",
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIndicatorStyle: {
              backgroundColor: black,
              marginBottom: 0.5,
            },
            lazy: true,
          })}
          sceneContainerStyle={{ backgroundColor: "white" }}
        >
          <Tab.Screen name="Posts" component={PostsProfile} />
          {(role === MAIN_ROLE || role === SECOND_ROLE) && (
            <Tab.Screen
              name="Products"
              component={ProductsProfile}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBadge
                    value={user?.productsCount}
                    name="shopping-bag"
                    color={focused ? black : "#ccc"}
                  />
                ),
              }}
            />
          )}
          <Tab.Screen name="VideoV" component={VideosVProfile} />
          {role === MAIN_ROLE && (
            <Tab.Screen
              name="Jobs"
              component={VideosHProfile}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBadge
                    name="briefcase"
                    value={0}
                    color={focused ? black : "#ccc"}
                  />
                ),
              }}
            />
          )}
          <Tab.Screen name="About" component={AboutProfile} />
        </Tab.Navigator>
      </View>
    </Animated.View>
  );
};
