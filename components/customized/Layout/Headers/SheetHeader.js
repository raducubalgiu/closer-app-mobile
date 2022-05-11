import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconBackButton, Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";

export const SheetHeader = ({ title, description }) => {
  return (
    <Stack direction="row" sx={styles.sheetOverview}>
      <IconBackButton size={20} />
      <Stack>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
      <Icon name="chevron-back" type="ionicon" color="white" />
    </Stack>
  );
};

export default SheetHeader;

const styles = StyleSheet.create({
  sheetOverview: {
    marginHorizontal: 15,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  description: {
    color: theme.lightColors.grey0,
    fontFamily: "Exo-Medium",
    marginTop: 5,
    textAlign: "center",
    fontSize: 13,
    marginBottom: 15,
  },
});
