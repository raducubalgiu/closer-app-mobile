import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const ProfileListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.detailsItem}>
      <View style={styles.container}>
        <View style={styles.description}>
          <Icon style={{ marginRight: 15 }} {...props} />
          <Text style={styles.text}>{props.listItemName}</Text>
        </View>
        <View>
          <Icon name="keyboard-arrow-right" size={22} style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileListItem;

const styles = StyleSheet.create({
  detailsItem: {
    paddingVertical: 12.5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { fontFamily: "Exo-Medium", color: Colors.textDark, fontSize: 14 },
  icon: { backgroundColor: "#f1f1f1", padding: 3, borderRadius: 50 },
});
