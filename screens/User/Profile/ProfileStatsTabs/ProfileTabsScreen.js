import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowersTabDetails from "./FollowersTabDetails";
import FollowingTabDetails from "./FollowingTabDetails";
import RatingsTabDetails from "./RatingsTabDetails";
import { Colors } from "../../../../assets/styles/Colors";
import Header from "../../../../components/customized/Headers/Header";

const Tab = createMaterialTopTabNavigator();

const ProfileTabsScreen = (props) => {
  const { initialRoute, username } = props.route.params;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={username} />
      <Tab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          tabBarActiveTintColor: Colors.textDark,
          tabBarLabelStyle: styles.tabLabel,
          tabBarStyle: styles.tabStyle,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen
          name="Ratings"
          component={RatingsTabDetails}
          options={{ tabBarLabel: "Recenzii" }}
        />
        <Tab.Screen
          name="Followers"
          component={FollowersTabDetails}
          options={{ tabBarLabel: "Urmaritori" }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingTabDetails}
          options={{ tabBarLabel: "Urmaresti" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ProfileTabsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  heading: {
    fontFamily: "Exo-Bold",
    color: Colors.textDark,
    fontSize: 16,
  },
  tabLabel: {
    fontFamily: "Exo-SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  tabStyle: { backgroundColor: "white" },
  tabIndicator: {
    backgroundColor: Colors.textDark,
  },
});
