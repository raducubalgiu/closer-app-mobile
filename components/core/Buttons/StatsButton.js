import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

const StatsButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.statsNumber}>
        {props?.statsNo ? props?.statsNo : 0}
      </Text>
      <Text style={styles.statsText}>{props.labelStats}</Text>
    </TouchableOpacity>
  );
};

export default StatsButton;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  statsText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 13,
    marginTop: 5,
  },
  statsNumber: { fontFamily: "Exo-Bold", fontSize: 14 },
});
