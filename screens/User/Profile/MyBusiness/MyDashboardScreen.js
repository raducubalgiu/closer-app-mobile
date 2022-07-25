import { SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { Divider, Icon } from "@rneui/themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import moment from "moment";
import { Header, Stack, Button } from "../../../../components/core";
import {
  DashboardInfoSheet,
  TopTabContainer,
  DashboardScheduleTab,
  DashboardPostsTab,
  DashboardJobsTab,
} from "../../../../components/customized";
import { useSheet } from "../../../../hooks";
import { useTranslation } from "react-i18next";

const { primary, black } = theme.lightColors;

const MyDashboardScreen = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState({
    _id: "1",
    title: t("last7Days"),
    days: 7,
  });
  const Tab = createMaterialTopTabNavigator();

  const closeSheetInfo = useCallback(() => CLOSE_BS_INFO(), []);
  const dashboardInfo = <DashboardInfoSheet />;
  const {
    BOTTOM_SHEET: BS_INFO,
    SHOW_BS: SHOW_BS_INFO,
    CLOSE_BS: CLOSE_BS_INFO,
  } = useSheet(["1%", "90%"], dashboardInfo, closeSheetInfo);

  const startPeriod = moment.utc().format();
  const lastPeriod = moment(startPeriod)
    .clone()
    .utc()
    .subtract(period.days, "days")
    .format();

  const DashboardSchedule = useCallback(
    () => (
      <DashboardScheduleTab startPeriod={startPeriod} lastPeriod={lastPeriod} />
    ),
    [startPeriod, lastPeriod]
  );
  const DashboardPosts = useCallback(
    () => (
      <DashboardPostsTab startPeriod={startPeriod} lastPeriod={lastPeriod} />
    ),
    [startPeriod, lastPeriod]
  );
  const DashboardJobs = useCallback(
    () => (
      <DashboardJobsTab startPeriod={startPeriod} lastPeriod={lastPeriod} />
    ),
    [startPeriod, lastPeriod]
  );

  const buttons = [
    { _id: "1", title: t("last7Days"), days: 7 },
    { _id: "2", title: t("last15Days"), days: 15 },
    { _id: "3", title: t("last30Days"), days: 30 },
    { _id: "4", title: t("last3Months"), days: 120 },
    { _id: "5", title: t("last6Months"), days: 240 },
    { _id: "6", title: t("lastYear"), days: 365 },
  ];

  const btnActive = { ...styles.btn, ...styles.btnActive };
  const btnTxtActive = { ...styles.btnTxt, ...styles.btnTxtActive };

  const renderButton = useCallback(
    ({ item }) => (
      <Button
        onPress={() => setPeriod(item)}
        sx={item._id === period._id ? btnActive : styles.btn}
      >
        <Text style={item._id === period._id ? btnTxtActive : styles.btnTxt}>
          {item.title}
        </Text>
      </Button>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Dashboard"
        divider
        actionBtn={
          <Button onPress={() => SHOW_BS_INFO()}>
            <Icon name="alert-circle" type="feather" />
          </Button>
        }
      />
      <Stack direction="row" sx={{ paddingVertical: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={buttons}
          keyExtractor={(item) => item._id}
          renderItem={renderButton}
        />
      </Stack>
      <Divider />
      <TopTabContainer initialRouteName="DashboardSchedule">
        <Tab.Screen
          name="DashboardSchedule"
          component={DashboardSchedule}
          options={{ tabBarLabel: t("schedules") }}
        />
        <Tab.Screen
          name="DashboardPosts"
          component={DashboardPosts}
          options={{ tabBarLabel: t("posts") }}
        />
        <Tab.Screen
          name="DashboardJobs"
          component={DashboardJobs}
          options={{ tabBarLabel: t("jobs") }}
        />
      </TopTabContainer>
      {BS_INFO}
    </SafeAreaView>
  );
};

export default MyDashboardScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  btn: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginLeft: 15,
  },
  btnActive: { backgroundColor: primary },
  btnTxt: {
    fontFamily: "Exo-SemiBold",
    color: black,
  },
  btnTxtActive: { color: "white" },
});
