import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { Stack, Button, IconButton } from "../../core";
import theme from "../../../assets/styles/theme";

<<<<<<< HEAD
const { black } = theme.lightColors;

export const CardRecentSearch = ({ onPress, word }) => {
  return (
    <Button sx={styles.item} onPress={onPress}>
      <Stack direction="row" justify="start">
        <Icon name="search" type="feather" color={black} size={20} />
        <Text style={styles.searchItem}>{word}</Text>
=======
const { grey0, black } = theme.lightColors;

export const CardRecentSearch = ({ onPress, word, onDelete }) => {
  return (
    <Button sx={styles.item} onPress={onPress}>
      <Stack direction="row">
        <Stack direction="row" justify="start">
          <Icon name="search" type="feather" color={black} size={20} />
          <Text style={styles.searchItem}>{word}</Text>
        </Stack>
        <IconButton
          onPress={onDelete}
          iconName="close"
          size={17.5}
          color={grey0}
          sx={{ padding: 5 }}
        />
>>>>>>> bf4ba3bdf2098719ef9959ddd47838b27b7bf850
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  searchItem: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    marginLeft: 10,
  },
});
