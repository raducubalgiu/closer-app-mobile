import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconBackButton, IconButton, Stack, Checkmark } from "../../../core";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = {
  username: string;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  checkmark: boolean;
};

export const HeaderProfileGeneral = ({
  username,
  onOpenSettings,
  onOpenNotifications,
  checkmark,
}: IProps) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", zIndex: 1000 }}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <IconBackButton sx={{ marginRight: 15 }} />
          <Icon name="bells" type="antdesign" color="white" />
        </Stack>
        <Stack direction="row">
          <Text style={styles.name}>@{username}</Text>
          {checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
        </Stack>
        <Stack direction="row">
          <IconButton onPress={onOpenNotifications} name="bell" color={black} />
          <IconButton
            onPress={onOpenSettings}
            name="more-horizontal"
            color={black}
            sx={{ marginLeft: 15 }}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  name: { fontSize: 15, color: black, fontWeight: "600" },
});
