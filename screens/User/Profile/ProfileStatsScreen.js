import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { THIRD_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import {
  FollowersTab,
  FollowingsTab,
  RatingsTab,
  TopTabContainer,
} from "../../../components/customized/index";
import theme from "../../../assets/styles/theme";
import { Header } from "../../../components/core";

const ProfileStatsScreen = ({ route }) => {
  const { initialRoute, username, userId, role, counter } = route.params;
  const { ratingsQuantity, followersCount, followingCount } = route.params;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const Ratings = useCallback(() => <RatingsTab userId={userId} />, [userId]);
  const Followers = useCallback(
    () => <FollowersTab userId={userId} />,
    [userId]
  );
  const Followings = useCallback(
    () => <FollowingsTab userId={userId} />,
    [userId]
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={username} />
      </SafeAreaView>
      <TopTabContainer initialRouteName={initialRoute}>
        {role !== THIRD_ROLE && (
          <Tab.Screen
            name="Ratings"
            component={Ratings}
            options={{ tabBarLabel: `${ratingsQuantity} ${t("reviews")}` }}
          />
        )}
        <Tab.Screen
          name="Followers"
          component={Followers}
          options={{ tabBarLabel: `${followersCount} ${t("followers")}` }}
        />
        <Tab.Screen
          name="Following"
          component={Followings}
          options={{ tabBarLabel: `${followingCount} ${t("followings")}` }}
        />
      </TopTabContainer>
    </View>
  );
};

export default ProfileStatsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  heading: {
    color: theme.lightColors.black,
    fontSize: 16,
  },
});
