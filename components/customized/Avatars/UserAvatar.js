import { StyleSheet } from "react-native";
import { Avatar, Badge, Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const UserAvatar = (props) => {
  let avatar;
  if (props?.avatar !== undefined) {
    avatar = (
      <Avatar size={props.size} rounded source={{ uri: `${props?.avatar}` }} />
    );
  } else {
    avatar = (
      <Avatar
        size={props.size}
        rounded
        icon={{ name: "user", type: "font-awesome", size: props.iconSize }}
        containerStyle={{ backgroundColor: "#ccc" }}
      />
    );
  }

  return (
    <>
      {avatar}
      {props.withBadge && (
        <Badge
          containerStyle={styles.badgeContainer}
          badgeStyle={styles.badge}
          value={<Icon name="plus" type="entypo" size={17} color="white" />}
        />
      )}
    </>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    bottom: 3,
    left: 75,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: "white",
    width: 25,
    height: 25,
    borderRadius: 50,
  },
});
