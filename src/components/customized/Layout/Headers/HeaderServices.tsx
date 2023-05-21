import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";
import { Stack } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { Option, Period, Service } from "../../../../ts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";
import { dayMonthFormat } from "../../../../utils/date-utils";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const { black } = theme.lightColors || {};

type IProps = {
  service: Service | undefined;
  option: Option | null | undefined;
  period: Period | undefined;
  headerHeight: number;
  sort: { title: string; query: string } | undefined;
  distance: { min: number; max: number } | undefined;
  price: { min: number; max: number } | undefined;
};

type FilterScreen = {
  title: string;
  key: string;
  isFiltered: boolean;
  params: {
    sort?: {
      title: string;
      query: string;
    };
    distance?: {
      min: number;
      max: number;
    };
    price?: {
      min: number;
      max: number;
    };
  };
};

export const HeaderServices = ({
  service,
  option,
  period,
  headerHeight,
  sort,
  distance,
  price,
}: IProps) => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { min: minDistance, max: maxDistance } = distance || {};
  const { min: minPrice, max: maxPrice } = price || {};
  const { startDate, endDate, key, startMinutes, endMinutes } = period || {};
  const { t } = useTranslation("common");

  const navigateToFilters = () => {
    if (service && period) {
      navigation.push("FiltersDate", {
        service,
        defaultPeriod: period,
        screen: "Calendar",
      });
    }
  };

  const filters = [
    {
      title: t("sort"),
      isFiltered: sort?.title !== t("distance"),
      key: "LocationSort",
      params: { sort },
    },
    {
      title: t("distance"),
      isFiltered:
        minDistance && maxDistance && minDistance >= 0 && maxDistance <= 50
          ? true
          : false,
      key: "LocationFilterDistance",
      params: { distance },
    },
    {
      title: t("price"),
      isFiltered:
        minPrice && maxPrice && minPrice >= 0 && maxPrice <= 50 ? true : false,
      key: "LocationFilterPrice",
      params: { price },
    },
  ];

  const navigateToSort = (item: FilterScreen) => {
    if (item.params) {
      navigation.navigate<any>({
        name: `${item.key}`,
        params: item.params,
        merge: true,
      });
    }
  };

  const renderFilterBtn = useCallback(
    ({ item }: ListRenderItemInfo<FilterScreen>) => {
      return (
        <Pressable
          onPress={() => navigateToSort(item)}
          style={{
            paddingVertical: 3.5,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginRight: 7.5,
            backgroundColor: "white",
            borderWidth: item.isFiltered ? 1.5 : 1.25,
            borderColor: item.isFiltered ? "#4d4d4d" : "#eee",
          }}
        >
          <Stack direction="row">
            <Text style={{ fontWeight: "500", fontSize: 13.5, color: black }}>
              {item.title}
            </Text>
            <Icon name="keyboard-arrow-down" />
          </Stack>
        </Pressable>
      );
    },
    [filters]
  );

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        height: headerHeight,
      }}
    >
      <Stack direction="row" sx={{ marginHorizontal: 15 }}>
        <Pressable onPress={() => navigation.popToTop()} style={styles.back}>
          <Icon name="arrow-back-ios" size={21} color={black} />
        </Pressable>
        <Pressable onPress={navigateToFilters} style={styles.search}>
          <Stack direction="row">
            <Stack direction="row">
              <Icon
                name="search"
                type="feather"
                size={21}
                color={black}
                style={{ padding: 7.5 }}
              />
              <Stack
                align="start"
                justify="center"
                sx={{ marginHorizontal: 5, height: 40 }}
              >
                <Stack direction="row" sx={{ marginBottom: 3.5 }}>
                  <Text style={styles.service}>{service?.name}</Text>
                  <Text style={styles.point}>{"\u2B24"}</Text>
                  <Text style={styles.service}>{option?.name}</Text>
                </Stack>
                <Stack direction="row">
                  <Text style={styles.period}>
                    {startDate && endDate
                      ? `${dayMonthFormat(startDate)} - ${dayMonthFormat(
                          endDate
                        )}`
                      : t(key ? key : "")}
                  </Text>
                  <Text style={styles.point}>{"\u2B24"}</Text>
                  <Text style={styles.period}>
                    {startMinutes && endMinutes
                      ? `${dayjs()
                          .utc(true)
                          .startOf("day")
                          .add(startMinutes, "minutes")
                          .format("HH:mm")} - ${dayjs()
                          .utc(true)
                          .startOf("day")
                          .add(endMinutes, "minutes")
                          .format("HH:mm")}`
                      : t("anyHour")}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Pressable>
      </Stack>
      <View style={{ marginTop: 10 }}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderFilterBtn}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    zIndex: 1000,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    marginTop: 5,
  },
  search: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 10,
    shadowColor: "#737373",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  service: {
    color: black,
    fontWeight: "600",
    fontSize: 16.5,
  },
  period: {
    color: "#9294a0",
    fontSize: 14.5,
  },
  item: {
    marginRight: 5,
  },
  filter: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "#eee",
  },
  point: { fontSize: 3, color: "#9294a0", marginHorizontal: 5 },
  back: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 13.5,
    paddingRight: 7.5,
    borderRadius: 50,
    shadowColor: "#737373",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginRight: 10,
  },
});
