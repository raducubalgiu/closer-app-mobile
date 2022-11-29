import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../../core";
import { useTranslation } from "react-i18next";
import { trimFunc } from "../../../../utils";

const { black, primary, grey0 } = theme.lightColors || {};

export const AboutProfileTab = ({ biography }: { biography: string }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("biography")}</Text>
        <Text style={styles.bio}>
          {biography ? trimFunc(biography, 115) : t("notAdded")}
        </Text>
      </Stack>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("contact")}</Text>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    color: black,
    fontWeight: "600",
  },
  seeMoreBtn: {
    color: primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    marginTop: 10,
    color: grey0,
  },
  label: {
    color: black,
    marginLeft: 10,
  },
  actionBtn: {
    color: black,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13.5,
    color: black,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13.5,
    color: primary,
  },
  stack: { marginTop: 10 },
  schedule: { marginTop: 10 },
});
