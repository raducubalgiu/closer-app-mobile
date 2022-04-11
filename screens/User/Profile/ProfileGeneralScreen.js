import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import {
  OutlinedButton,
  ContainedButton,
  IconButton,
} from "../../../components/core";
import HeaderProfileGeneral from "../../../components/customized/Headers/HeaderProfileGeneral";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";
import TopTabNavigator from "../../TopTabNavigator";
import { Stack } from "../../../components/core";
import CardSuggestedPeople from "../../../components/customized/Cards/CardSuggestedPeople";

const ProfileGeneralScreen = (props) => {
  const { userId } = props.route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [follow, setFollow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const { user } = useAuth();

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

  const handleSuggested = () => {
    setLoading(true);
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/users/${userDetails?.job}/get-suggested`,
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

  const followHandler = () => {
    if (!follow) {
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
          setFollow(true);
          handleSuggested();
          fetchUser();
        })
        .catch((error) => console.log(error));
    }
    if (follow) {
      axios
        .delete(
          `http://192.168.100.2:8000/api/v1/users/${user?._id}/followee/${userId}/follower/unfollow`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => {
          setFollow(false);
          fetchUser();
        })
        .catch((error) => console.log(error));
    }
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
        <View
          style={{
            marginLeft: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 7,
            borderRadius: 5,
          }}
        >
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
      <TopTabNavigator />
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
  suggestedTitle: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    marginBottom: 5,
  },
  suggestedPeople: {
    margin: 15,
  },
});
