import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  View,
  Text,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { useAuth, useGet, useRefreshOnFocus, useRefreshByUser } from "../hooks";
import { CardScheduleOverview, NoFoundMessage } from "../components/customized";
import theme from "../assets/styles/theme";
import { yearMonthFormat } from "../utils/date-utils";
import { Divider } from "@rneui/themed";

const { black } = theme.lightColors || {};

export const SchedulesScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const {
    data: schedules,
    refetch,
    isLoading,
    isFetching,
  } = useGet({
    model: "schedules",
    uri: `/users/${user?.id}/schedules`,
  });

  useRefreshOnFocus(refetch);

  const renderHeader = useCallback(({ section }: { section: any }) => {
    const { year, month } = section?._id || {};

    return (
      <Text style={styles.headerList}>{yearMonthFormat(year, month)}</Text>
    );
  }, []);

  const renderSchedules = useCallback(({ item }: ListRenderItemInfo<any>) => {
    return <CardScheduleOverview schedule={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: any, index: number) => item + index,
    []
  );

  const noFoundMessage = (
    <NoFoundMessage title={t("bookings")} description={t("dontHaveBookings")} />
  );

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myOrders")} hideBtnLeft divider />
      <View style={styles.container}>
        {!isFetching && !isLoading && !schedules.length && noFoundMessage}
        <SectionList
          refreshControl={refreshControl}
          sections={schedules ? schedules : []}
          keyExtractor={keyExtractor}
          stickySectionHeadersEnabled={false}
          renderItem={renderSchedules}
          renderSectionHeader={renderHeader}
          contentContainerStyle={{ padding: 15 }}
          ItemSeparatorComponent={() => <Divider color="#ddd" />}
          renderSectionFooter={() => <View style={{ marginBottom: 20 }} />}
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
    color: black,
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  headerList: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 17,
    color: black,
    fontWeight: "700",
  },
});
