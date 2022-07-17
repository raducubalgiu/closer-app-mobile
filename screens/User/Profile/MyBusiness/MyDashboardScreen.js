import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useCallback } from "react";
import { Divider, Icon } from "@rneui/themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import {
  Header,
  ButtonFilter,
  Stack,
  Button,
} from "../../../../components/core";
import {
  DashboardInfoSheet,
  DashboardCalendarSheet,
  TopTabContainer,
  DashboardScheduleTab,
  DashboardPostsTab,
  DashboardJobsTab,
} from "../../../../components/customized";
import { useSheet } from "../../../../hooks";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors;

const MyDashboardScreen = () => {
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();

  const closeSheetCalendar = useCallback(() => CLOSE_BS(), []);
  const dashboardCalendar = <DashboardCalendarSheet />;
  const { BOTTOM_SHEET, SHOW_BS, CLOSE_BS } = useSheet(
    ["1%", "80%"],
    dashboardCalendar,
    closeSheetCalendar
  );

  const dashboardInfo = <DashboardInfoSheet />;
  const { BOTTOM_SHEET: BS_INFO, SHOW_BS: SHOW_BS_INFO } = useSheet(
    ["1%", "80%"],
    dashboardInfo
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
      <Stack
        direction="row"
        sx={{ paddingHorizontal: 15, paddingVertical: 10 }}
      >
        <ButtonFilter
          title={t("last30Days")}
          sx={{ backgroundColor: "#f1f1f1" }}
          sxText={styles.dateBtnTxt}
          onPress={() => SHOW_BS()}
        />
        <Text style={styles.periodDate}>14 Iun. - 31 Iun.</Text>
      </Stack>
      <Divider />
      <TopTabContainer initialRouteName="DashboardSchedule">
        <Tab.Screen
          name="DashboardSchedule"
          component={DashboardScheduleTab}
          options={{ tabBarLabel: t("schedules") }}
        />
        <Tab.Screen
          name="DashboardPosts"
          component={DashboardPostsTab}
          options={{ tabBarLabel: t("posts") }}
        />
        <Tab.Screen
          name="DashboardJobs"
          component={DashboardJobsTab}
          options={{ tabBarLabel: t("jobs") }}
        />
      </TopTabContainer>
      {BOTTOM_SHEET}
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
  dateBtnTxt: {
    fontFamily: "Exo-SemiBold",
    fontSize: 14,
    paddingVertical: 5,
  },
  periodDate: { fontFamily: "Exo-SemiBold", color: black },
});
