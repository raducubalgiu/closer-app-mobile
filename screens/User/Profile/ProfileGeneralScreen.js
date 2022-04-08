import { SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import {
  OutlinedButton,
  ContainedButton,
  IconButton,
} from "../../../components/core";
import HeaderProfileGeneral from "../../../components/customized/Headers/HeaderProfileGeneral";
import PostsProfileScreen from "./PostsProfileScreen";
import ProductsProfileScreen from "./ProductsProfileScreen";
import CalendarProfileScreen from "./CalendarProfileScreen";
import AboutProfileScreen from "./AboutProfileScreen";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";

const ProfileGeneralScreen = (props) => {
  const { userId } = props.route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [follow, setFollow] = useState(true);
  const { user } = useAuth();
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/follower/${userId}/followee/check-follow`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setFollow(res.data.status);
      })
      .catch((error) => console.log(error));
  }, [user?._id, userId]);

  const fetchUser = useCallback(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setUserDetails(resp.data.user);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const followHandler = () => {
    axios
      .post(
        `http://192.168.100.2:8000/api/v1/users/follow`,
        {
          userId: user?._id,
          followingId: userId,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => {
        setFollow(follow ? false : true);
        fetchUser();
      })
      .catch((error) => console.log(error));
  };

  const buttons = (
    <>
      <ContainedButton
        title={follow ? "Urmaresti" : "Urmareste"}
        sx={follow ? styles.followBtn : styles.unfollowBtn}
        sxText={follow && styles.followBtnText}
        onPress={followHandler}
      />
      <OutlinedButton
        title="Mesaj"
        sx={styles.btnMessage}
        sxText={{ fontFamily: "Exo-SemiBold" }}
      />
      <IconButton
        sx={styles.iconBtn}
        size={20}
        color={Colors.textDark}
        iconType="antdesign"
        iconName="addusergroup"
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfileGeneral name={userDetails?.name} />
      <ProfileOverview
        user={userDetails}
        withBadge={false}
        actionButtons={buttons}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let iconType;
            let size;

            if (route.name === "Posts") {
              iconType = "antdesign";
              iconName = focused ? "appstore-o" : "appstore-o";
            } else if (route.name === "Products") {
              iconType = "material-community";
              iconName = focused ? "shopping-outline" : "shopping-outline";
            } else if (route.name === "Calendar") {
              iconType = "antdesign";
              iconName = focused ? "calendar" : "calendar";
            } else if (route.name === "About") {
              iconType = "antdesign";
              iconName = focused ? "solution1" : "solution1";
            }
            return (
              <Icon name={iconName} type={iconType} color={color} size={size} />
            );
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIndicatorContainerStyle: {
            color: "red",
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.textDark,
          },
        })}
      >
        <Tab.Screen name="Posts" component={PostsProfileScreen} />
        <Tab.Screen name="Products" component={ProductsProfileScreen} />
        <Tab.Screen name="Calendar" component={CalendarProfileScreen} />
        <Tab.Screen name="About" component={AboutProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ProfileGeneralScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  unfollowBtn: { borderWidth: 1 },
  followBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
  },
  followBtnText: { color: Colors.textDark, fontFamily: "Exo-SemiBold" },
  btnMessage: { marginLeft: 5, borderWidth: 1, borderColor: "#ddd" },
  iconBtn: {
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderRadius: 5,
    marginLeft: 5,
  },
});
