import { Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback } from "react";

const { black, grey0 } = theme.lightColors || {};
type MessageInfo = { id: string; title: string; message: string };

export const DashboardInfoSheet = () => {
  const { t } = useTranslation();

  const MESSAGES = [
    {
      id: "1",
      title: t("schedules"),
      message: t("schedulesMessage"),
    },
    {
      id: "2",
      title: t("sales"),
      message: t("salesMessage"),
    },
    {
      id: "3",
      title: t("salesWithCloser"),
      message: t("salesCloserMessage"),
    },
    {
      id: "4",
      title: t("salesWithOwn"),
      message: t("newClientsMessage"),
    },
    {
      id: "5",
      title: t("newClients"),
      message: t("salesOwnMessage"),
    },
    {
      id: "6",
      title: t("closerCommission"),
      message: t("closerCommissionMessage"),
    },
  ];

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MessageInfo>) => (
      <Stack align="start" sx={{ marginBottom: 30 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.message}</Text>
      </Stack>
    ),
    []
  );

  const keyExtractor = useCallback((item: MessageInfo) => item.id, []);

  const header = (
    <>
      <Stack align="start">
        <Text style={styles.title}>{t("summary")}</Text>
        <Text style={styles.description}>{t("dashboardNotes")}</Text>
      </Stack>
      <Divider style={{ marginVertical: 15 }} />
    </>
  );

  return (
    <BottomSheetFlatList
      data={MESSAGES}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 15 }}
      ListHeaderComponent={header}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: black,
    fontSize: 15,
    fontWeight: "500",
  },
  description: { marginTop: 2.5, color: grey0 },
});
