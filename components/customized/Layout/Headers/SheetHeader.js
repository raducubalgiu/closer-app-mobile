import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconBackButton, Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";

export const SheetHeader = ({ title, description, sx }) => {
  return (
    <Stack direction="row" sx={{ ...styles.sheetOverview, ...sx }}>
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
    fontSize: 17,
  },
  description: {
    color: theme.lightColors.grey0,
    marginTop: 5,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
  },
});
