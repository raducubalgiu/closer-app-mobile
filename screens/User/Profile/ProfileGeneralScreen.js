import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useState, useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import {
  Stack,
  FollowButton,
  OutlinedButton,
  IconButton,
} from "../../../components/core";
import {
  ProfileOverview,
  HeaderProfileGeneral,
  TopTabContainer,
  PostsProfileTab,
  CalendarProfileTab,
  ProductsProfileTab,
  AboutProfileTab,
  JobsProfileTab,
} from "../../../components/customized";
import { useAuth } from "../../../context/auth";
import CardSuggestedPeople from "../../../components/customized/Cards/CardSuggestedPeople";
import theme from "../../../assets/styles/theme";

const ProfileGeneralScreen = (props) => {
  const { user } = useAuth();
  const { userId } = props.route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const Tab = createMaterialTopTabNavigator();

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${userId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setUserDetails(res.data.user);
        })
        .catch((error) => console.log(error));
    }, [userId])
  );

  const fetchUser = () => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  const handleSuggested = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/businesses/${userDetails?.business?._id}/get-suggested`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setSuggestedPeople(res.data.suggestedPeople);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const buttons = (
    <>
      <FollowButton
        size="lg"
        followeeId={userId}
        fetchUser={fetchUser}
        fetchSuggested={handleSuggested}
      />
      <OutlinedButton
        title="Mesaj"
        sx={styles.btnMessage}
        sxText={{ fontFamily: "Exo-SemiBold" }}
      />
      {!loading && (
        <IconButton
          sx={styles.iconBtn}
          size={20}
          color={theme.lightColors.black}
          iconType="antdesign"
          iconName="addusergroup"
          onPress={handleSuggested}
        />
      )}
      {loading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} />,
    [userId]
  );
  const ProductsProfile = useCallback(
    () => <ProductsProfileTab userId={userId} />,
    [userId]
  );
  const AboutProfile = () => (
    <AboutProfileTab
      biography={userDetails?.description}
      website={userDetails?.website}
      location={userDetails?.location}
    />
  );

  const renderSuggested = ({ item }) => (
    <CardSuggestedPeople
      title={item?.name}
      business={item?.business?.name}
      noFollowers={item?.followersCount}
      username={item?.username}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfileGeneral
        name={userDetails?.name}
        checkmark={userDetails?.checkmark}
      />
      <ProfileOverview
        user={userDetails}
        badgeDetails={props.badgeDetails}
        actionButtons={buttons}
      />
      {suggestedPeople.length !== 0 && (
        <Stack align="start" justify="start" sx={styles.suggestedPeople}>
          <Text style={styles.suggestedTitle}>Sugestii pentru tine</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={suggestedPeople}
            keyExtractor={(item) => item?._id}
            renderItem={renderSuggested}
          />
        </Stack>
      )}
      <View style={styles.tabsCont}>
        <TopTabContainer initialRouteName="Posts" profileTabs={true}>
          <Tab.Screen name="Posts" component={PostsProfile} />
          <Tab.Screen name="Products" component={ProductsProfile} />
          <Tab.Screen name="Calendar" component={CalendarProfileTab} />
          <Tab.Screen name="Jobs" component={JobsProfileTab} />
          <Tab.Screen name="About" component={AboutProfile} />
        </TopTabContainer>
      </View>
    </SafeAreaView>
  );
};

export default ProfileGeneralScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  unfollowBtn: {
    borderWidth: 1,
    borderRadius: 0,
    paddingVertical: 10,
    borderRadius: 2.5,
  },
  followBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2.5,
  },
  followBtnText: { color: theme.lightColors.black, fontFamily: "Exo-SemiBold" },
  btnMessage: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 0,
    paddingVertical: 10,
    borderRadius: 2.5,
  },
  iconBtn: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    marginLeft: 5,
    borderRadius: 2.5,
  },
  suggestedTitle: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    marginBottom: 5,
  },
  suggestedPeople: {
    margin: 15,
  },
  activityIndicator: {
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7,
    borderRadius: 5,
  },
  tabsCont: { flex: 1, height: 700 },
});
