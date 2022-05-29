import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import {
  Stack,
  FollowButton,
  IconButton,
  MainButton,
  Feedback,
} from "../../../components/core";
import {
  ProfileOverview,
  HeaderProfileGeneral,
  TopTabContainer,
  PostsProfileTab,
  ProductsProfileTab,
  AboutProfileTab,
  JobsProfileTab,
  CardSuggestedPeople,
} from "../../../components/customized";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import moment from "moment";

const ProfileGeneralScreen = ({ badgeDetails, route }) => {
  const { user } = useAuth();
  const { userId, username, avatar, name } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const fetchUser = useCallback(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSuggested = useCallback(() => {
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
      .catch(() => setLoading(false));
  }, [user, userDetails]);

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
        title={t("message")}
        radius={2.5}
        sx={styles.messageBtn}
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
    () => <PostsProfileTab userId={userId} username={userDetails?.username} />,
    [userId, userDetails]
  );
  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab userId={userId} services={userDetails?.services} />
    ),
    [userId, userDetails]
  );
  const JobsProfile = useCallback(
    () => (
      <JobsProfileTab
        userId={userDetails?._id}
        username={userDetails?.username}
      />
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
        openingHours={userDetails?.opening_hours}
      />
    ),
    [userDetails]
  );

  const removeCard = (userId) => {
    setSuggestedPeople(
      suggestedPeople.filter((suggested) => suggested?._id !== userId)
    );
  };

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
        onRemoveCard={() => removeCard(item?._id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          username={username}
          checkmark={userDetails?.checkmark}
        />
        <Feedback feedback={feedback} setFeedback={setFeedback} />
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileOverview
          user={userDetails}
          name={name}
          avatar={avatar}
          badgeDetails={badgeDetails}
          actionButtons={buttons}
          withAvailable={true}
          available={true}
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
            {admin && (
              <Tab.Screen name="Products" component={ProductsProfile} />
            )}
            {admin && <Tab.Screen name="Jobs" component={JobsProfile} />}
            <Tab.Screen name="About" component={AboutProfile} />
          </TopTabContainer>
        </View>
      </ScrollView>
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
  messageBtn: { borderWidth: 1, borderColor: "#ddd", marginLeft: 5 },
});
