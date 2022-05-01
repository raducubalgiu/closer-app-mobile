import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ContainedButton } from "../../core";
import theme from "../../../assets/styles/theme";
import UserAvatar from "../../customized/Avatars/UserAvatar";

const CardSuggestedPeople = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <UserAvatar
          avatar={props?.avatar}
          size={85}
          withBadge={false}
          withBadgeTop={true}
          iconSize={35}
        />
      </View>
      <Text style={styles.username}>@{props.username}</Text>
      <Text style={styles.job}>{props.business}</Text>
      <Text style={styles.followers}>{props.noFollowers} urmaritori</Text>
      <ContainedButton
        title="Urmareste"
        onPress={props.onPress}
        sx={{ paddingVertical: 4, paddingHorizontal: 35, marginTop: 15 }}
        sxText={{ fontSize: 12.5 }}
      />
    </TouchableOpacity>
  );
};

export default CardSuggestedPeople;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: 15,
    borderRadius: 10,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
  },
  username: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
    marginTop: 5,
    marginBottom: 1,
  },
  followers: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginTop: 10,
  },
  job: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    textTransform: "capitalize",
  },
});
