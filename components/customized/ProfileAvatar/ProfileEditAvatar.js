import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const ProfileEditAvatar = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: "center" }}>
        {props?.userAvatar && (
          <View style={{ position: "relative" }}>
            <Avatar
              size={95}
              rounded
              source={{ uri: `${props?.userAvatar}` }}
              avatarStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            />
            <View
              style={{
                position: "absolute",
                top: 35,
                left: 35,
              }}
            >
              <Icon name="camera" type="feather" color="white" size={25} />
            </View>
          </View>
        )}
        {!props?.userAvatar && (
          <Avatar
            size={90}
            rounded
            icon={{
              name: "photo-camera",
              type: "material",
              color: "white",
              size: 30,
            }}
            containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          />
        )}
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
    fontFamily: "Exo-Bold",
    color: Colors.textDark,
    fontSize: 15,
  },
});
