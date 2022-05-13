import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { Stack, Button } from "../../core";
import theme from "../../../assets/styles/theme";

export const CardRecentSearch = ({ onPress, word }) => {
  return (
    <Button sx={styles.item} onPress={onPress}>
      <Stack direction="row" justify="start">
        <Icon
          name="search"
          type="feather"
          color={theme.lightColors.grey0}
          size={17.5}
        />
        <Text style={styles.searchItem}>{word}</Text>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
  searchItem: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    marginLeft: 10,
  },
});
