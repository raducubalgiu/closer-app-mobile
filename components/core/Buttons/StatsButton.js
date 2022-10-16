import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../assets/styles/theme";

export const StatsButton = ({ onPress, statsNo, labelStats }) => {
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
  container: { alignItems: "center", minWidth: 75 },
  statsText: {
    color: theme.lightColors.grey3,
    fontSize: 13,
    marginTop: 5,
    fontWeight: "500",
  },
  statsNumber: { fontSize: 16, fontWeight: "700" },
});
