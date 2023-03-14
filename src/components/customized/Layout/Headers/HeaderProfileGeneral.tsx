import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconBackButton, IconButton, Stack, Checkmark } from "../../../core";
import theme from "../../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";

const { black, success } = theme.lightColors || {};

type IProps = {
  username: string;
  onOpenSettings: () => void;
  checkmark: boolean;
  hours: any;
};

export const HeaderProfileGeneral = ({
  username,
  onOpenSettings,
  checkmark,
}: IProps) => {
  const { t } = useTranslation();
  let open = true;

  return (
    <SafeAreaView style={{ backgroundColor: "white", zIndex: 1000 }}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <IconBackButton sx={{ marginRight: 15 }} />
        </Stack>
        <Stack direction="row">
          {/* <Text style={styles.name}>@{username}</Text> */}
          <Stack direction="row">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: open ? success : "#ddd",
                marginRight: 10,
              }}
            />
            <Text style={styles.name}>
              {open ? "Închide la 18:00" : "Închis acum"}
            </Text>
            <Icon name="keyboard-arrow-down" style={{ marginLeft: 5 }} />
          </Stack>
          {/* {checkmark && <Checkmark sx={{ marginLeft: 5 }} />} */}
        </Stack>
        <Stack direction="row">
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
