import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconBackButton, IconButton, Stack, Checkmark } from "../../../core";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors;

export const HeaderProfileGeneral = ({
  username,
  onOpenSettings,
  onOpenNotifications,
  checkmark,
}) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack direction="row">
        <IconBackButton sx={{ marginRight: 15 }} />
        <Icon name="bells" type="antdesign" color="white" />
      </Stack>
      <Stack direction="row">
        <Text style={styles.name}>@{username}</Text>
        {checkmark && <Checkmark />}
      </Stack>
      <Stack direction="row">
        <IconButton
          onPress={onOpenNotifications}
          iconName="bell"
          iconType="feather"
          color={black}
        />
        <IconButton
          onPress={onOpenSettings}
          iconName="more-horizontal"
          iconType="feather"
          color={black}
          sx={{ marginLeft: 15 }}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 15, marginVertical: 10 },
  name: { fontFamily: "Exo-SemiBold", fontSize: 15, color: black },
});
