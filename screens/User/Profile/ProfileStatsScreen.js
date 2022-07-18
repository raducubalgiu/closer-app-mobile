import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  FollowersTab,
  FollowingsTab,
  RatingsTab,
  TopTabContainer,
} from "../../../components/customized/index";
import theme from "../../../assets/styles/theme";
import { Header } from "../../../components/core";
import { THIRD_ROLE } from "@env";

const ProfileStatsScreen = ({ route }) => {
  const { initialRoute, username, userId, role } = route.params;
  const Tab = createMaterialTopTabNavigator();

  const Ratings = () => <RatingsTab userId={userId} />;
  const Followers = () => <FollowersTab userId={userId} />;
  const Followings = () => <FollowingsTab userId={userId} />;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={username} />
      <TopTabContainer initialRouteName={initialRoute}>
        {role !== THIRD_ROLE && (
          <Tab.Screen
            name="Ratings"
            component={Ratings}
            options={{ tabBarLabel: "Recenzii" }}
          />
        )}
        <Tab.Screen
          name="Followers"
          component={Followers}
          options={{ tabBarLabel: "Urmaritori" }}
        />
        <Tab.Screen
          name="Following"
          component={Followings}
          options={{ tabBarLabel: "Urmaresti" }}
        />
      </TopTabContainer>
    </SafeAreaView>
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
