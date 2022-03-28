import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";
import React from "react";

const ProfileEditAvatar = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Avatar
          size={90}
          rounded
          source={{ uri: `${props.userAvatar}` }}
          title={
            <Icon
              name="user-alt"
              type="font-awesome-5"
              size={30}
              color="#f1f1f1"
            />
          }
        />
        <Text style={styles.text}>Schimba fotografia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEditAvatar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    marginTop: 15,
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 14,
  },
});
