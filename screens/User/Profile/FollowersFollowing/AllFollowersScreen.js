import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeaderReusable from "../../../../components/customized/Headers/HeaderReusable";
import IconBackButton from "../../../../components/core/IconButton/IconBackButton";
import FollowersScreen from "./FollowersScreen";
import FollowingScreen from "./FollowingScreen";
import RatingsScreen from "./RatingsScreen";
import { Colors } from "../../../../assets/styles/Colors";
import { useAuth } from "../../../../context/auth";

const Tab = createMaterialTopTabNavigator();

const AllFollowers = (props) => {
  const { initialRoute } = props.route.params;
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={<IconBackButton />}
        secondBox={<Text style={styles.heading}>{user?.username}</Text>}
      />
      <Tab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          tabBarActiveTintColor: Colors.textDark,
          tabBarLabelStyle: {
            fontFamily: "Exo-SemiBold",
            textTransform: "capitalize",
            fontSize: 14,
          },
          tabBarStyle: { backgroundColor: "white" },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.textDark,
          },
        }}
      >
        <Tab.Screen
          name="Ratings"
          component={RatingsScreen}
          options={{ tabBarLabel: "Recenzii" }}
        />
        <Tab.Screen
          name="Followers"
          component={FollowersScreen}
          options={{ tabBarLabel: "Urmaritori" }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingScreen}
          options={{ tabBarLabel: "Urmaresti" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AllFollowers;

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
});
