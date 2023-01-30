import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  View,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import { Divider, Icon, ListItem } from "@rneui/themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import theme from "../../../../assets/styles/theme";
import dayjs from "dayjs";
import { Button, Header, Stack } from "../../../../components/core";
import {
  DashboardInfoSheet,
  TopTabContainer,
  DashboardScheduleTab,
} from "../../../../components/customized";
import { useCalendarList, useSheet } from "../../../../hooks";
import { useTranslation } from "react-i18next";
import DateRangePicker from "../../../../components/customized/Calendars/DateRangePicker";

const { primary, black } = theme.lightColors || {};
type Period = {
  id: string;
  title?: string;
  startDate: any;
  endDate: any;
  monthIndex: number;
};

export const MyDashboardScreen = () => {
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  const ref = useRef<FlatList>(null);
  const [expanded, setExpanded] = useState(false);
  const now = dayjs().utc(true).startOf("day");
  const { MONTHS, DAYS_HEADER } = useCalendarList({
    disablePastDays: false,
    pastMonths: 6,
    noMonths: 12,
  });

  const [period, setPeriod] = useState<Period>({
    id: "1",
    startDate: now,
    endDate: now.add(1, "day").startOf("day"),
    monthIndex: 0,
  });

  const dashboardInfo = <DashboardInfoSheet />;
  const { BOTTOM_SHEET: BS_INFO, SHOW_BS: SHOW_BS_INFO } = useSheet(
    ["1%", "90%"],
    dashboardInfo
  );

  const buttons = [
    {
      id: "1",
      title: t("today"),
      startDate: now,
      endDate: now.add(1, "day").startOf("day"),
      monthIndex: 0,
    },
    {
      id: "2",
      title: t("last7Days"),
      startDate: now.subtract(7, "days"),
      endDate: now,
      monthIndex: 0,
    },
    {
      id: "3",
      title: t("last30Days"),
      startDate: now.subtract(30, "days"),
      endDate: now,
      monthIndex: 0,
    },
    {
      id: "4",
      title: t("last6Months"),
      startDate: now.subtract(6, "months"),
      endDate: now,
      monthIndex: 0,
    },
  ];

  const DashboardSchedule = useCallback(
    () => (
      <DashboardScheduleTab
        start={period?.startDate?.format("YYYY-MM-DD")}
        end={period?.endDate?.format("YYYY-MM-DD")}
      />
    ),
    [period]
  );

  const btnActive = { ...styles.btn, ...styles.btnActive };
  const btnTxtActive = { ...styles.btnTxt, ...styles.btnTxtActive };

  const handleLabel = (item: Period, index: number) => {
    setPeriod(item);
    ref.current?.scrollToIndex({
      animated: true,
      index,
    });
  };

  const renderButton = useCallback(
    ({ item, index }: ListRenderItemInfo<Period>) => (
      <Pressable
        onPress={() => handleLabel(item, index)}
        style={item.id === period.id ? btnActive : styles.btn}
      >
        <Text style={item.id === period.id ? btnTxtActive : styles.btnTxt}>
          {item.title}
        </Text>
      </Pressable>
    ),
    [period]
  );

  const keyExtractor = useCallback((item: Period) => item.id, []);
  const handlePeriod = (per: Period) => {
    console.log("PER!!", per);
    setPeriod(per);
  };

  const actionButton = (
    <Pressable onPress={() => SHOW_BS_INFO()}>
      <Icon name="alert-circle" type="feather" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Dashboard" divider actionBtn={actionButton} />
      <Stack direction="row" sx={{ paddingVertical: 10 }}>
        <ListItem.Accordion
          animation={{ duration: 200 }}
          containerStyle={{ padding: 0, marginLeft: 15 }}
          content={<Icon name="calendar" type="antdesign" size={25} />}
          isExpanded={expanded}
          onPress={() => setExpanded((expanded) => !expanded)}
        />
        <Divider orientation="vertical" style={{ marginLeft: 10 }} />
        <FlatList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={buttons}
          keyExtractor={keyExtractor}
          renderItem={renderButton}
          contentContainerStyle={{ paddingRight: 15 }}
        />
      </Stack>
      <Divider />
      {!expanded && (
        <TopTabContainer initialRouteName="DashboardSchedule">
          <Tab.Screen
            name="DashboardSchedule"
            component={DashboardSchedule}
            options={{ tabBarLabel: t("schedules") }}
          />
        </TopTabContainer>
      )}
      {expanded && (
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <DateRangePicker
            period={period}
            onSetPeriod={handlePeriod}
            initialIndex={period?.monthIndex}
            months={MONTHS}
            daysHeader={DAYS_HEADER}
          />
          <View style={styles.selectBtn}>
            <Button
              disabled={!period.startDate || !period.endDate}
              title={t("select")}
              onPress={() => setExpanded(false)}
            />
          </View>
        </View>
      )}
      {BS_INFO}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  btn: {
    width: 130,
    height: 32.5,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnActive: { backgroundColor: primary },
  btnTxt: {
    color: black,
    fontWeight: "500",
    fontSize: 13.5,
  },
  btnTxtActive: { color: "white", fontWeight: "600" },
  selectBtn: { padding: 15, borderTopWidth: 1, borderTopColor: "#ddd" },
});
