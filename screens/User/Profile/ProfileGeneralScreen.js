import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { IconButton } from "../../../components/core";
import theme from "../../../assets/styles/theme";
import {
  useSheet,
  useAuth,
  usePost,
  useGet,
  useGetMutate,
} from "../../../hooks";
import {
  ProfileOverview,
  HeaderProfileGeneral,
  SuggestedUsersList,
  FollowUserSheet,
  TopTabProfile,
  FollowButton,
} from "../../../components/customized";
import { useNavigation } from "@react-navigation/native";

const { black } = theme.lightColors;

const ProfileGeneralScreen = ({ route }) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { searchedUser, service, option } = route.params;
  const [suggested, setSuggested] = useState([]);
  const navigation = useNavigation();

  const { data: userDetails } = useGet({
    model: "fetchUser",
    uri: `/users/${username}`,
  });
  const { mutate: makePost } = usePost({ uri: `/searches` });
  const { mutate: handleSuggested, isLoading } = useGetMutate({
    uri: `/users/${userId}/get-suggested`,
    onSuccess: (res) => setSuggested(res.data),
  });

  useEffect(() => {
    if (searchedUser) {
      makePost({ searchedUser, user: user?._id });
    }
  }, [searchedUser]);

  const closeSheet = () => SHOW_BS();
  const sheetContent = (
    <FollowUserSheet
      userId={userId}
      avatar={avatar}
      handleSuggested={handleSuggested}
      fetchUser={() => {}}
    />
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
          user={userDetails}
          name={name ? name : userDetails?.name}
          username={username}
          avatar={avatar ? avatar : userDetails?.avatar}
        >
          <FollowButton
            size="md"
            followeeId={userId}
            fetchSuggested={handleSuggested}
            fetchUser={() => {}}
          />
          <IconButton
            sx={styles.iconBtn}
            size={20}
            color={black}
            iconType="feather"
            iconName="message-circle"
            onPress={() =>
              navigation.navigate("MessageItem", {
                item: {
                  userId,
                  username,
                  avatar,
                  name,
                  checkmark,
                  followersCount: userDetails?.followersCount,
                  followingsCount: userDetails?.followingsCount,
                },
              })
            }
          />
          <IconButton
            sx={styles.iconBtn}
            size={20}
            color={black}
            iconType="feather"
            iconName="map-pin"
            onPress={() =>
              navigation.navigate("Map", {
                profession: userDetails?.profession,
              })
            }
          />
          <IconButton
            sx={styles.iconBtn}
            size={20}
            color={black}
            iconType="antdesign"
            iconName="adduser"
            onPress={handleSuggested}
            loading={isLoading}
          />
        </ProfileOverview>
        {suggested?.length > 0 && (
          <SuggestedUsersList suggested={suggested} userId={userId} />
        )}
        <View style={styles.tabsCont}>
          <TopTabProfile
            userId={userId}
            username={username}
            service={service}
            option={option}
            user={userDetails}
          />
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
  followBtnText: { color: black },
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
});
