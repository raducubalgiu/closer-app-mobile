import { FlatList, ListRenderItemInfo } from "react-native";
import { memo, useCallback } from "react";
import { SettingsSwitchListItem } from "../../ListItems/SettingsSwitchListItem";
import { Period } from "../../../../ts";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

type IProps = { period: Period; onHandlePeriod: (period: Period) => void };

const FixedPeriodTab = ({ period, onHandlePeriod }: IProps) => {
  const { t } = useTranslation("common");

  const startOfDay = dayjs().utc(true).startOf("day");
  const endOfDay = dayjs().utc(true).endOf("day");

  const tommorowStart = startOfDay.add(1, "day");
  const tommorowEnd = endOfDay.add(1, "day");

  const threeMonths = endOfDay.add(3, "months");

  const fixedPeriods = [
    {
      title: t("today"),
      description: t("todayDescription"),
      startDate: startOfDay.format("YYYY-MM-DD"),
      endDate: endOfDay.format("YYYY-MM-DD"),
      startMinutes: null,
      endMinutes: null,
      monthIndex: 0,
      key: "today",
    },
    {
      title: t("tommorow"),
      description: t("tommorowDescription"),
      startDate: tommorowStart.format("YYYY-MM-DD"),
      endDate: tommorowEnd.format("YYYY-MM-DD"),
      startMinutes: null,
      endMinutes: null,
      monthIndex: 0,
      key: "tommorow",
    },
    {
      title: t("anytime"),
      description: t("anytimeDescription"),
      startDate: startOfDay.format("YYYY-MM-DD"),
      endDate: threeMonths.format("YYYY-MM-DD"),
      startMinutes: null,
      endMinutes: null,
      monthIndex: 0,
      key: "anytime",
    },
    {
      title: t("after18"),
      description: t("after18Description"),
      startDate: startOfDay.format("YYYY-MM-DD"),
      endDate: threeMonths.format("YYYY-MM-DD"),
      startMinutes: 1080,
      endMinutes: 1410,
      monthIndex: 0,
      key: "after18",
    },
  ];

  const renderFixedPeriod = useCallback(
    ({ item }: ListRenderItemInfo<Period>) => (
      <SettingsSwitchListItem
        title={item?.title}
        description={item?.description}
        value={period.key === item.key}
        onValueChange={() => onHandlePeriod(item)}
      />
    ),
    [period]
  );

  const keyExtractor = useCallback(
    (_: Period, index: number) => index.toString(),
    []
  );

  return (
    <FlatList
      data={fixedPeriods}
      keyExtractor={keyExtractor}
      renderItem={renderFixedPeriod}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 20,
      }}
    />
  );
};

export default memo(FixedPeriodTab);
