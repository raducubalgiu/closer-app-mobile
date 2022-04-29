import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";

const width = Dimensions.get("window").width;

const MyBusinessCard = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.sx }}
      onPress={props.onPress}
    >
      <View
        style={{
          width: "100%",
          maxWidth: width / 2,
          alignItems: "center",
        }}
      >
        <Icon
          name={props.iconName}
          type={props.iconType}
          size={props.size ? props.size : 30}
          color={Colors.textDark}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyBusinessCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    marginVertical: 10,
    fontSize: 15,
    color: Colors.textDark,
  },
  description: {
    textAlign: "center",
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
  },
});
