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

const Tab = createMaterialTopTabNavigator();

const ProfileStatsScreen = (props) => {
  const { userId } = props.route.params;
  const { initialRoute, username } = props.route.params;

  const RatingsDetails = () => <RatingsTab userId={userId} />;
  const FollowersDetails = () => <FollowersTab userId={userId} />;
  const FollowingsDetails = () => <FollowingsTab userId={userId} />;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={username} />
      <TopTabContainer initialRouteName={initialRoute}>
        <Tab.Screen
          name="Ratings"
          component={RatingsDetails}
          options={{ tabBarLabel: "Recenzii" }}
        />
        <Tab.Screen
          name="Followers"
          component={FollowersDetails}
          options={{ tabBarLabel: "Urmaritori" }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingsDetails}
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
