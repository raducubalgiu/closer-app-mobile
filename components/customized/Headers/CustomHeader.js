import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";

const CustomHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" size={20} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    marginLeft: 15,
    fontFamily: "Exo-SemiBold",
    fontSize: 16.5,
    color: Colors.textDark,
  },
  icon: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 50,
  },
});
