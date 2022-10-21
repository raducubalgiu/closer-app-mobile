import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export const ButtonLink = ({ onPress, word }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Text style={styles.link}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#002266",
  },
});
