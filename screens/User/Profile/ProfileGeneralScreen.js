import { SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { OutlinedButton, ContainedButton } from "../../../components/core";
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
  const { user } = useAuth();

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
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/user/${userId}/following`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => {
        fetchUser();
      })
      .catch((error) => console.log(error));
  };

  const buttons = (
    <>
      <ContainedButton title="Urmareste" onPress={followHandler} />
      <OutlinedButton title="Mesaj" sx={{ marginLeft: 10 }} />
    </>
  );

  const Tab = createMaterialTopTabNavigator();

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
});
