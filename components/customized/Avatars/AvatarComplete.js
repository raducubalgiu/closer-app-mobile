import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";

const AvatarComplete = (props) => {
  return (
    <View>
      <Avatar
        rounded
        icon={{
          name: props.iconName,
          type: props.iconType,
          size: 25,
          color: theme.lightColors.black,
        }}
        containerStyle={styles.avatarContainer}
      />
      {props.withBadge && (
        <Badge
          status="success"
          containerStyle={styles.badgeContainer}
          value={<Icon name="check" type="entypo" size={10} color="white" />}
        />
      )}
    </View>
  );
};

export default AvatarComplete;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 15,
    left: 42.5,
  },
});
