import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import ContainedButton from "../Buttons/ContainedButton";
import OutlinedButton from "../Buttons/OutlinedButton";

const CardUserRecommend = (props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Avatar size={64} rounded source={{ uri: `${props.avatar}` }} />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.followersCount}>
        {props.followersCount} urmaritori
      </Text>
      <Text style={styles.job}>{props.job}</Text>
      <View style={{ marginTop: 25 }}>
        <OutlinedButton title="Urmareste" />
      </View>
    </TouchableOpacity>
  );
};

export default CardUserRecommend;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 50,
    marginTop: 25,
    marginLeft: 20,
    borderColor: "#eee",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontFamily: "Exo-Bold",
    marginTop: 10,
    fontSize: 16,
    color: Colors.textDark,
  },
  followersCount: {
    fontFamily: "Exo-SemiBold",
    fontSize: 12,
    marginTop: 1,
    marginBottom: 10,
  },
  job: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    marginTop: 2,
  },
});
