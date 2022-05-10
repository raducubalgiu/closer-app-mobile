import { StyleSheet } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const CustomAvatar = (props) => {
  const checkAvatar = (avatar) => {
    if (avatar === undefined || avatar.length === 0) {
      return undefined;
    } else {
      return avatar;
    }
  };

  let avatar;
  if (checkAvatar(props?.avatar)) {
    avatar = (
      <Avatar
        size={props.size ? props.size : 55}
        rounded
        source={{ uri: `${props?.avatar}` }}
      />
    );
  } else {
    avatar = (
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
      {avatar}
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

export default CustomAvatar;

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