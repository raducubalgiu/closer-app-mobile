import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, Button } from "../../core";
import { useTranslation } from "react-i18next";

type IProps = { date: string; hour: string };

export const CardAvailableHour = ({ date, hour }: IProps) => {
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
      <Button variant="outlined" title={t("book")} onPress={() => {}} />
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
    fontSize: 15,
    marginRight: 7.5,
  },
  description: {},
});
