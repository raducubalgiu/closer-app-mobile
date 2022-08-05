import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, MainButton } from "../../core";
import { useTranslation } from "react-i18next";

export const CardAvailableHour = ({ date, hour }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.container} align="start">
      <Stack align="start">
        <Stack direction="row" align="center">
          <Text style={styles.heading}>{t("date")}:</Text>
          <Text style={styles.description}>{date}</Text>
        </Stack>
        <Stack direction="row" align="center" sx={{ marginTop: 10 }}>
          <Text style={styles.heading}>{t("hour")}:</Text>
          <Text style={styles.description}>{hour}</Text>
        </Stack>
      </Stack>
      <MainButton variant="outlined" title={t("book")} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  heading: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginRight: 7.5,
  },
  description: {
    fontFamily: "Exo-Medium",
  },
});
