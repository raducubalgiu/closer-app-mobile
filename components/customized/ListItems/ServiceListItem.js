import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { Button, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const ServiceListItem = ({ name, postsCount, onPress, sx }) => {
  const { t } = useTranslation();

  return (
    <Button onPress={onPress} sx={sx}>
      <Stack direction="row" sx={{ marginBottom: 20 }}>
        <Stack direction="row">
          <Stack sx={styles.icon}>
            <Icon name="tag" type="feather" size={17.5} />
          </Stack>
          <Stack align="start">
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.posts}>
              {postsCount} {t("posts")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 12.5,
    paddingHorizontal: 12.5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    marginRight: 10,
  },
  name: { color: black, fontWeight: "500", fontSize: 15, marginBottom: 2.5 },
  posts: {
    color: grey0,
    textTransform: "lowercase",
    fontSize: 13,
  },
});
