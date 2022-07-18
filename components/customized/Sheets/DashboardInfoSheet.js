import { Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const DashboardInfoSheet = () => {
  const { t } = useTranslation();

  const MESSAGES = [
    {
      _id: "1",
      title: t("schedules"),
      message: t("schedulesMessage"),
    },
    {
      _id: "2",
      title: t("sales"),
      message: t("salesMessage"),
    },
    {
      _id: "3",
      title: t("salesWithCloser"),
      message: t("salesCloserMessage"),
    },
    {
      _id: "4",
      title: t("salesWithOwn"),
      message: t("newClientsMessage"),
    },
    {
      _id: "5",
      title: t("newClients"),
      message: t("salesOwnMessage"),
    },
    {
      _id: "6",
      title: t("closerCommission"),
      message: t("closerCommissionMessage"),
    },
  ];

  const renderItem = ({ item }) => (
    <Stack align="start" sx={{ marginBottom: 30 }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.message}</Text>
    </Stack>
  );

  return (
    <Stack sx={{ padding: 15 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={MESSAGES}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Stack align="start">
              <Text
                style={{
                  ...styles.title,
                  fontSize: 18,
                  marginBottom: 5,
                  fontFamily: "Exo-Bold",
                }}
              >
                {t("summary")}
              </Text>
              <Text style={styles.description}>{t("dashboardNotes")}</Text>
            </Stack>
            <Divider style={{ marginVertical: 15 }} />
          </>
        }
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15,
  },
  description: { marginTop: 2.5, color: grey0 },
});
