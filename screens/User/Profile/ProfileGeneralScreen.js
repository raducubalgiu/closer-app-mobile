import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { OutlinedButton, IconButton } from "../../../components/core";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import HeaderProfileGeneral from "../../../components/customized/Headers/HeaderProfileGeneral";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";
import { Stack } from "../../../components/core";
import CardSuggestedPeople from "../../../components/customized/Cards/CardSuggestedPeople";
import FollowButton from "../../../components/core/Buttons/FollowButton";

const ProfileGeneralScreen = (props) => {
  const { user } = useAuth();
  const { userId } = props.route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestedPeople, setSuggestedPeople] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setUserDetails(resp.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}/get-posts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err));
  }, []);

  const fetchUser = () => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((resp) => {
        setUserDetails(resp.data.user);
      })
      .catch((error) => console.log(error));
  };

  const handleSuggested = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.BASE_ENDPOINT}/users/${userDetails?.job}/get-suggested`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setSuggestedPeople(res.data.suggestedPeople);
        setLoading(false);
      })
      .catch((err) => {
        console.log(error);
        setLoading(false);
      });
  };

  const buttons = (
    <>
      <FollowButton
        size="lg"
        followingId={userId}
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
          color={Colors.textDark}
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfileGeneral name={userDetails?.name} />
      <ProfileOverview
        user={userDetails}
        withBadge={false}
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
            renderItem={({ item }) => (
              <CardSuggestedPeople
                title={item?.name}
                job={item?.job}
                noFollowers={item?.followersCount}
                username={item?.username}
              />
            )}
          />
        </Stack>
      )}
      <TopTabNavigator
        posts={posts}
        products={userDetails?.products}
        role={userDetails?.role}
        location={userDetails?.location}
      />
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
  followBtnText: { color: Colors.textDark, fontFamily: "Exo-SemiBold" },
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
    color: Colors.textLight,
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
});
