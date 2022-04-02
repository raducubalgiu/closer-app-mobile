import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import Stack from "../../core/Containers/Stack";
import { Colors } from "../../../assets/styles/Colors";

const CardFollowers = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack direction="row" justify="start">
        <Avatar size={55} rounded source={{ uri: `${props.avatar}` }} />
        <Stack align="start" sx={{ marginLeft: 10 }}>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </Stack>
      </Stack>
      <TouchableOpacity style={styles.btn} onPress={props.onPress}>
        <Text style={styles.btnText}>Urmaresti</Text>
      </TouchableOpacity>
    </Stack>
  );
};

export default CardFollowers;

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  username: {
    fontFamily: "Exo-SemiBold",
    fontSize: 13.5,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 13.5,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 13,
  },
});
