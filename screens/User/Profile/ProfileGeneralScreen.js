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
  MainButton,
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
  CardSuggestedPeople,
} from "../../../components/customized";
import { useAuth } from "../../../hooks/auth";
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
      .catch(() => {
        setLoading(false);
      });
  };

  const admin =
    userDetails?.role === "admin" || userDetails?.role === "employee";

  const buttons = (
    <>
      <FollowButton
        size="md"
        followeeId={userId}
        fetchUser={fetchUser}
        fetchSuggested={handleSuggested}
      />
      <MainButton
        variant="outlined"
        title="Mesaj"
        radius={2.5}
        sx={{ borderWidth: 1, borderColor: "#ddd", marginLeft: 5 }}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />
      {!loading && (
        <IconButton
          sx={styles.iconBtn}
          size={20}
          color={theme.lightColors.black}
          iconType="antdesign"
          iconName="adduser"
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
    () => (
      <ProductsProfileTab userId={userId} services={userDetails?.services} />
    ),
    [userId, userDetails]
  );

  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        biography={userDetails?.description}
        website={userDetails?.website}
        location={userDetails?.location}
        role={userDetails?.role}
      />
    ),
    [userDetails]
  );
  const CalendarProfile = useCallback(
    () => <CalendarProfileTab services={userDetails?.services} />,
    [userDetails]
  );

  const renderSuggested = ({ item }) => {
    const { avatar, name, business, counter, username, _id } = item;

    return (
      <CardSuggestedPeople
        avatar={avatar}
        title={name}
        business={business?.name}
        noFollowers={counter?.followersCount}
        ratingsAverage={counter?.ratingsAverage.toFixed(1)}
        username={username}
        followeeId={_id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          name={userDetails?.name}
          checkmark={userDetails?.checkmark}
        />
      </SafeAreaView>
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
          {admin && <Tab.Screen name="Products" component={ProductsProfile} />}
          {admin && <Tab.Screen name="Calendar" component={CalendarProfile} />}
          {admin && <Tab.Screen name="Jobs" component={JobsProfileTab} />}
          <Tab.Screen name="About" component={AboutProfile} />
        </TopTabContainer>
      </View>
    </View>
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
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    marginBottom: 10,
    fontSize: 15,
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
