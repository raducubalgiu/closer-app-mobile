import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const AvatarComplete = (props) => {
  return (
    <View>
      <Avatar
        rounded
        icon={{
          name: props.iconName,
          type: props.iconType,
          size: 25,
          color: Colors.textDark,
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
