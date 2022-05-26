import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const StatsButton = ({ onPress, statsNo, labelStats, labelStyle }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.statsNumber}>{statsNo ? statsNo : 0}</Text>
      <Text style={styles.statsText}>{labelStats}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  statsText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginTop: 5,
  },
  statsNumber: { fontFamily: "Exo-Bold", fontSize: 15 },
});
