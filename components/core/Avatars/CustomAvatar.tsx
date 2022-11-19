import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const CustomAvatar = ({
  avatar = [],
  size = 55,
  iconSize = 30,
  withBadge = false,
  badgeContainer = {},
  badgeDetails = {},
  sx = {},
  badgeSx = {},
}) => {
  const hasAvatar = (av) => {
    if (av === undefined || av.length === 0) {
      return undefined;
    } else {
      return true;
    }
  };

  let showAvatar;
  if (hasAvatar(avatar)) {
    showAvatar = (
      <Avatar
        size={size}
        rounded
        source={avatar && { uri: `${avatar[0]?.url}` }}
        containerStyle={{ ...sx }}
      />
    );
  } else {
    showAvatar = (
      <Avatar
        size={size}
        rounded
        icon={{
          name: "user",
          type: "font-awesome",
          size: iconSize,
        }}
        containerStyle={{
          backgroundColor: "#ccc",
          ...sx,
        }}
      />
    );
  }

  return (
    <View>
      {showAvatar}
      {withBadge && (
        <Badge
          containerStyle={{ ...styles.badgeContainer, ...badgeContainer }}
          badgeStyle={{ ...styles.badge, ...badgeSx }}
          value={<Icon name={""} {...badgeDetails} color="white" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    bottom: 3,
    left: 75,
  },
  badge: {
    backgroundColor: primary,
    borderWidth: 2,
    borderColor: "white",
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  availableCont: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  availableBadge: {
    width: 17,
    height: 17,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
});
