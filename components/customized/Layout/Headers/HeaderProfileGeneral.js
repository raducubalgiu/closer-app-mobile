import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconBackButton, IconButton, Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";

export const HeaderProfileGeneral = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack direction="row">
        <IconBackButton />
        <Icon name="bells" type="antdesign" color="white" />
      </Stack>
      <Text style={styles.name}>{props?.name}</Text>
      <Stack direction="row">
        <IconButton
          onPress={props.onOpenSettings}
          iconName="bell"
          iconType="feather"
          color={theme.lightColors.black}
        />
        <IconButton
          onPress={props.onOpenSettings}
          iconName="more-horizontal"
          iconType="feather"
          color={theme.lightColors.black}
          sx={{ marginLeft: 15 }}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, marginHorizontal: 20 },
  name: { fontFamily: "Exo-Medium", fontSize: 15 },
});
