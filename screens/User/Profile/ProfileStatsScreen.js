import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
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
  const { initialRoute, username, userId, role } = route.params;
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const Ratings = () => <RatingsTab userId={userId} />;
  const Followers = () => <FollowersTab userId={userId} />;
  const Followings = () => <FollowingsTab userId={userId} />;

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
            options={{ tabBarLabel: t("reviews") }}
          />
        )}
        <Tab.Screen
          name="Followers"
          component={Followers}
          options={{ tabBarLabel: t("followers") }}
        />
        <Tab.Screen
          name="Following"
          component={Followings}
          options={{ tabBarLabel: t("followings") }}
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
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
    fontSize: 16,
  },
});
