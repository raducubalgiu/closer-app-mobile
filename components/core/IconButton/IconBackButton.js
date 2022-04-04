import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const IconBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-ios" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 5,
    paddingRight: 5,
  },
});

export default IconBackButton;
