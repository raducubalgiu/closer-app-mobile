import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { THIRD_ROLE } from "@env";
import {
  Stack,
  FollowButton,
  IconButton,
  MainButton,
  CustomAvatar,
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
  TabBadge,
} from "../../../components/customized";
import theme from "../../../assets/styles/theme";
import { useSheet, useAuth, useHttpPost } from "../../../hooks";

const { black } = theme.lightColors;

const ProfileGeneralScreen = ({ badgeDetails, route }) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, searchedUser, service, option } =
    route.params;
  const [userDetails, setUserDetails] = useState([]);
  const {
    _id,
    role,
    description,
    website,
    location,
    checkmark,
    distance,
    status,
    endTime,
    services,
    business,
    counter,
    hours,
  } = userDetails || {};
  const [loading, setLoading] = useState(false);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();

  const { makePost } = useHttpPost(`/searches`);

  useEffect(() => {
    if (searchedUser) {
      makePost({ searchedUser, user: user?._id });
    }
  }, [searchedUser]);

  const fetchUser = useCallback(() => {
    const controller = new AbortController();
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${userId}?latlng=26.100195,44.428286`,
        {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => setUserDetails(res.data))
      .catch(() => console.log(err));

    return () => {
      controller.abort();
    };
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSuggested = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/businesses/${business?._id}/get-suggested`,
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

  const PostsProfile = useCallback(
    () => <PostsProfileTab userId={userId} username={username} />,
    [userId, username]
  );
  const ProductsProfile = useCallback(
    () => (
      <ProductsProfileTab
        userId={userId}
        services={services}
        service={service}
        option={option}
      />
    ),
    [userId, services, service, option]
  );
  const JobsProfile = useCallback(
    () => <JobsProfileTab userId={userId} username={username} />,
    [userId, username]
  );
  const AboutProfile = useCallback(
    () => (
      <AboutProfileTab
        biography={description}
        website={website}
        location={location}
        role={role}
        hours={hours}
      />
    ),
    [description, website, location, role, hours]
  );

  const removeCard = useCallback(
    (userId) => {
      setSuggestedPeople(
        suggestedPeople.filter((suggested) => suggested?._id !== userId)
      );
    },
    [userId]
  );

  const renderSuggested = ({ item }) => {
    const { avatar, name, business, counter, username, _id } = item;

    return (
      <CardSuggestedPeople
        avatar={avatar}
        title={name}
        business={business?.name}
        noFollowers={counter?.followersCount}
        ratingsAverage={counter?.ratingsAverage?.toFixed(1)}
        username={username}
        followeeId={_id}
        onRemoveCard={() => removeCard(item?._id)}
      />
    );
  };

  const closeSheet = () => SHOW_BS();
  const sheetContent = (
    <Stack sx={{ margin: 30 }}>
      <CustomAvatar avatar={avatar} size={70} />
      <Text style={styles.followText}>
        Urmareste pe fresh_salon pentru a avea acces la notificari cu privire la
        postari si promotii
      </Text>
      <FollowButton
        fullWidth
        size="md"
        followeeId={userId}
        fetchUser={fetchUser}
        fetchSuggested={handleSuggested}
      />
    </Stack>
  );
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(
    ["1%", "45%"],
    sheetContent,
    closeSheet
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          username={username}
          checkmark={checkmark}
          onOpenNotifications={SHOW_BS}
        />
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileOverview
          _id={_id}
          name={name}
          username={username}
          avatar={avatar}
          role={role}
          distance={distance}
          services={services}
          counter={counter}
          business={business}
          badgeDetails={badgeDetails}
          withAvailable={role !== THIRD_ROLE}
          available={status}
          endTime={endTime}
          location={location}
          showDetails
        >
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
            onPress={() => {}}
          />
          <IconButton
            sx={styles.iconBtn}
            size={20}
            color={black}
            iconType="antdesign"
            iconName="adduser"
            onPress={handleSuggested}
            loading={loading}
          />
        </ProfileOverview>
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
            {role !== THIRD_ROLE && (
              <Tab.Screen
                name="Products"
                component={ProductsProfile}
                options={{
                  tabBarIcon: () => <TabBadge value={counter?.productsCount} />,
                }}
              />
            )}
            {role !== THIRD_ROLE && (
              <Tab.Screen name="Jobs" component={JobsProfile} />
            )}
            <Tab.Screen name="About" component={AboutProfile} />
          </TopTabContainer>
        </View>
      </ScrollView>
      {BOTTOM_SHEET}
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
  followBtnText: { color: black, fontFamily: "Exo-SemiBold" },
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
    color: black,
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
  tabsCont: { flex: 1, height: 1000 },
  messageBtn: { borderWidth: 1, borderColor: "#ddd", marginLeft: 5 },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  followText: {
    marginTop: 15,
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Exo-Medium",
    fontSize: 14.5,
    color: black,
  },
});
