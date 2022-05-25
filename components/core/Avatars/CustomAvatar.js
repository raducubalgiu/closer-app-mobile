import { StyleSheet } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

export const CustomAvatar = (props) => {
  const hasAvatar = (avatar) => {
    if (avatar === undefined || avatar.length === 0) {
      return undefined;
    } else {
      return true;
    }
  };

  let showAvatar;
  if (hasAvatar(props?.avatar)) {
    showAvatar = (
      <Avatar
        size={props.size ? props.size : 55}
        rounded
        source={{ uri: `${props?.avatar[0]?.url}` }}
      />
    );
  } else {
    showAvatar = (
      <Avatar
        size={props.size ? props.size : 55}
        rounded
        icon={{
          name: "user",
          type: "font-awesome",
          size: props.iconSize ? props.iconSize : 30,
        }}
        containerStyle={{ backgroundColor: "#ccc" }}
      />
    );
  }

  return (
    <>
      {showAvatar}
      {props.withBadge && (
        <Badge
          containerStyle={{ ...styles.badgeContainer, ...props.badgeContainer }}
          badgeStyle={styles.badge}
          value={<Icon {...props.badgeDetails} size={17} color="white" />}
        />
      )}
    </>
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
});
