import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const CustomAvatar = ({
  avatar,
  size,
  iconSize,
  withBadge,
  badgeContainer,
  badgeDetails,
  withAvailable,
  available,
  sx,
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
        size={size ? size : 55}
        rounded
        source={avatar && { uri: `${avatar[0]?.url}` }}
        containerStyle={{ ...sx }}
      />
    );
  } else {
    showAvatar = (
      <Avatar
        size={size ? size : 55}
        rounded
        icon={{
          name: "user",
          type: "font-awesome",
          size: iconSize ? iconSize : 30,
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
          badgeStyle={styles.badge}
          value={<Icon {...badgeDetails} size={17} color="white" />}
        />
      )}
      {withAvailable && (
        <Badge
          containerStyle={styles.availableCont}
          status="success"
          badgeStyle={
            available
              ? {
                  ...styles.availableBadge,
                  backgroundColor: theme.lightColors.success,
                }
              : {
                  ...styles.availableBadge,
                  backgroundColor: "#ccc",
                }
          }
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
    backgroundColor: theme.lightColors.primary,
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
