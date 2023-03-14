import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FixedPeriodListItem } from "../ListItems/FixedPeriodListItem";

type ItemInterval = { _id: string; title: string; description: string };
type IProps = { onSwitch: (checked: boolean) => void };

export const FixedPeriodList = ({ onSwitch }: IProps) => {
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation("common");

  const fixedPeriods = [
    { _id: "1", title: t("now"), description: t("nowDescription") },
    { _id: "2", title: t("anytime"), description: t("anytimeDescription") },
    {
      _id: "3",
      title: t("after18"),
      description: t("after18Description"),
    },
    { _id: "4", title: t("weekend"), description: t("weekendDescription") },
  ];

  const renderFixedPeriod = useCallback(
    ({ item, index }: ListRenderItemInfo<ItemInterval>) => (
      <FixedPeriodListItem
        checked={checked}
        onSwitch={onSwitch}
        title={item.title}
        description={item.description}
      />
    ),
    []
  );

  return (
    <FlatList
      data={fixedPeriods}
      keyExtractor={(item: ItemInterval) => item._id}
      renderItem={renderFixedPeriod}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginHorizontal: 25, marginVertical: 15 }}
    />
  );
};
