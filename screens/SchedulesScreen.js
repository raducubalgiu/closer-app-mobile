import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
} from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { useAuth, useGet } from "../hooks";
import { CardScheduleOverview, NoFoundMessage } from "../components/customized";
import theme from "../assets/styles/theme";
import { dayMonthTime, yearMonthFormat } from "../utils/date-utils";

const { black } = theme.lightColors;

export const SchedulesScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: schedules } = useGet({
    model: "schedules",
    uri: `/users/${user?._id}/schedules`,
  });

  const renderHeader = useCallback(({ section }) => {
    const { year, month } = section?._id || {};

    return (
      <Text style={styles.headerList}>{yearMonthFormat(year, month)}</Text>
    );
  }, []);

  const renderSchedules = useCallback(
    ({ item }) => (
      <CardScheduleOverview schedule={item} start={dayMonthTime(item.start)} />
    ),
    []
  );

  const keyExtractor = useCallback((item, index) => item + index, []);

  const noFoundMessage = (
    <NoFoundMessage title={t("bookings")} description={t("dontHaveBookings")} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myOrders")} hideBtnLeft divider />
      <View style={styles.container}>
        <SectionList
          sections={schedules ? schedules : []}
          keyExtractor={keyExtractor}
          stickySectionHeadersEnabled={false}
          renderItem={renderSchedules}
          renderSectionHeader={renderHeader}
          contentContainerStyle={{ padding: 15 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: { paddingHorizontal: 15, paddingVertical: 10 },
  title: {
    fontSize: 17,
    color: theme.lightColors.black,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  headerList: {
    padding: 10,
    textTransform: "capitalize",
    fontSize: 16.5,
    color: black,
    marginBottom: 15,
    fontWeight: "700",
  },
});
