import { useCallback, useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostsProfileTab } from "../ProfileTabs/PostsProfileTab";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { Icon } from "@rneui/themed";
import { VideosVTab } from "../ProfileTabs/VideosProfileTab";
import { JobsTab } from "../ProfileTabs/JobsTab";
import { ProductsProfileTab } from "../ProfileTabs/ProductsProfileTab";
import { AboutProfileTab } from "../ProfileTabs/AboutProfileTab";
import { TabBadge } from "../TabBadge/TabBadge";
import theme from "../../../../assets/styles/theme";
import { User } from "../../../../models/user";
import { Animated, Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { black } = theme.lightColors || {};
const { height } = Dimensions.get("window");

type IProps = {
  userId: string;
  service: any;
  option: any;
  user: User;
  profileOverview: any;
};

export const TopTabProfile = ({
  userId,
  service,
  option,
  user,
  profileOverview,
}: IProps) => {
  const Tab = createMaterialTopTabNavigator();
  const { role } = user || {};
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
  return (
    <Animated.View style={[{ transform: [{ translateY: headerTranslate }] }]}>
      {profileOverview}
      <View style={{ height: TOP_TAB_HEIGHT }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let name = "";
              let type = "material-community";
              let size = 25;

              if (route.name === "Posts") {
                name = focused ? "grid-large" : "grid-large";
                size = 24;
              } else if (route.name === "Products") {
                type = "";
              } else if (route.name === "VideoV") {
                name = focused
                  ? "play-box-multiple-outline"
                  : "play-box-multiple-outline";
              } else if (route.name === "VideoH") {
              } else if (route.name === "About") {
                name = focused
                  ? "account-circle-outline"
                  : "account-circle-outline";
              }
              return <Icon name={name} type={type} color={color} size={size} />;
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
                    iconProps={{
                      name: "shopping-outline",
                      type: "material-community",
                      color: focused ? black : "#ccc",
                    }}
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
                    value={0}
                    iconProps={{
                      name: "briefcase-outline",
                      type: "material-community",
                      color: focused ? black : "#ccc",
                    }}
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
