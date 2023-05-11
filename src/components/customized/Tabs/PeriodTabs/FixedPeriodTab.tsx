import { FlatList, ListRenderItemInfo } from "react-native";
import { memo, useCallback } from "react";
import { SettingsSwitchListItem } from "../../ListItems/SettingsSwitchListItem";
import { Period } from "../../../../ts";
import { useTranslation } from "react-i18next";

type IProps = { period: Period; onHandlePeriod: (period: Period) => void };

const FixedPeriodTab = ({ period, onHandlePeriod }: IProps) => {
  const { t } = useTranslation("common");

  const fixedPeriods = [
    {
      title: t("now"),
      description: t("nowDescription"),
      startDate: null,
      endDate: null,
      startMinutes: null,
      endMinutes: null,
      monthIndex: 0,
      key: "now",
    },
    {
      title: t("anytime"),
      description: t("anytimeDescription"),
      startDate: null,
      endDate: null,
      monthIndex: 0,
      key: "anytime",
    },
    {
      title: t("after18"),
      description: t("after18Description"),
      startDate: null,
      endDate: null,
      startMinutes: null,
      endMinutes: null,
      monthIndex: 0,
      key: "after18",
    },
    {
      title: t("weekend"),
      description: t("weekendDescription"),
      startDate: null,
      endDate: null,
      monthIndex: 0,
      key: "weekend",
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
      contentContainerStyle={{ marginHorizontal: 25, marginVertical: 10 }}
    />
  );
};

export default memo(FixedPeriodTab);
