import { StyleSheet, Text, SafeAreaView } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeaderReusable from "../../../../components/customized/Headers/HeaderReusable";
import IconBackButton from "../../../../components/core/IconButton/IconBackButton";
import FollowersTabDetails from "./FollowersTabDetails";
import FollowingTabDetails from "./FollowingTabDetails";
import RatingsTabDetails from "./RatingsTabDetails";
import { Colors } from "../../../../assets/styles/Colors";
import { useAuth } from "../../../../context/auth";

const Tab = createMaterialTopTabNavigator();

const ProfileTabsScreen = (props) => {
  const { user } = useAuth();
  const { initialRoute, userId, username } = props.route.params;
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [reviews, setReviews] = useState([]);

  const FollowersTab = () => <FollowersTabDetails followers={followers} />;
  const FollowingsTab = () => <FollowingTabDetails followings={followings} />;
  const RatingsTab = () => <RatingsTabDetails reviews={reviews} />;

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-followers`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setFollowers(res.data.followers))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-followings`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setFollowings(res.data.followings))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-reviews`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={<IconBackButton />}
        secondBox={<Text style={styles.heading}>{username}</Text>}
      />
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
          component={RatingsTab}
          options={{ tabBarLabel: "Recenzii" }}
        />
        <Tab.Screen
          name="Followers"
          component={FollowersTab}
          options={{ tabBarLabel: "Urmaritori" }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingsTab}
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
