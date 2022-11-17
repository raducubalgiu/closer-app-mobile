import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { IconButton } from "../../../components/core";
import theme from "../../../assets/styles/theme";
import { useAuth, useGet, useGetMutate } from "../../../hooks";
import {
  ProfileOverview,
  HeaderProfileGeneral,
  SuggestedUsersList,
  TopTabProfile,
  FollowButton,
} from "../../../components/customized";
import { useNavigation } from "@react-navigation/native";

const { black } = theme.lightColors;

export const ProfileGeneralScreen = ({ route }) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { service, option } = route.params;
  const [suggested, setSuggested] = useState([]);
  const navigation = useNavigation();

  const { data: userDetails } = useGet({
    model: "fetchUser",
    uri: `/users/${username}`,
  });

  const { mutate: handleSuggested, isLoading } = useGetMutate({
    uri: `/users/${userDetails?._id}/get-suggested`,
    onSuccess: (res) => setSuggested(res.data),
  });

  const { data: follow } = useGet({
    model: "checkFollow",
    uri: `/users/${user._id}/followings/${userId || userDetails?._is}/follows`,
  });

  const goToMessage = () =>
    navigation.navigate("MessageItem", {
      item: {
        _id: userDetails?._id,
        username,
        avatar,
        name,
        checkmark,
        followersCount: userDetails?.followersCount,
        followingsCount: userDetails?.followingsCount,
      },
    });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          username={username}
          checkmark={checkmark}
          onOpenNotifications={null}
        />
      </SafeAreaView>
      <ProfileOverview
        user={userDetails}
        name={name ? name : userDetails?.name}
        username={username}
        avatar={avatar ? avatar : userDetails?.avatar}
      >
        <FollowButton
          size="md"
          isFollow={follow?.status}
          followeeId={userId || userDetails?._id}
          fetchSuggested={handleSuggested}
          fetchUser={() => {}}
        />
        {follow?.status && (
          <IconButton
            sx={styles.iconBtn}
            size={20}
            color={black}
            iconType="feather"
            iconName="message-circle"
            onPress={goToMessage}
          />
        )}
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
      <TopTabProfile
        user={userDetails}
        userId={userId || userDetails?._id}
        username={username}
        service={service}
        option={option}
      />
    </View>
  );
};

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
  messageBtn: { borderWidth: 1, borderColor: "#ddd", marginLeft: 5 },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
