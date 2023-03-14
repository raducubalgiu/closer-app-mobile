import {
  StyleSheet,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
  View,
  Text,
  Pressable,
} from "react-native";
import { useCallback, memo, useRef } from "react";
import theme from "../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { Dayjs } from "dayjs";
import { Month } from "../../../models/month";
import { Day } from "../../../models/day";

const { width } = Dimensions.get("window");
const { black, primary, grey0 } = theme.lightColors || {};
const MONTH_MT = 20;
const DAY_SIZE = width / 7 - 5;
const MONTH_HEIGHT = DAY_SIZE * 6 + 25;

type Period = { startDate: Dayjs; endDate: Dayjs; monthIndex: number };

type IProps = {
  initialIndex?: number;
  period: Period;
  onSetPeriod: (period: any) => void;
  months: Month[];
  daysHeader: any;
};

const DateRangePicker = ({
  initialIndex = 0,
  period,
  onSetPeriod,
  months,
  daysHeader,
}: IProps) => {
  const flatlistRef = useRef<FlatList>(null);

  const getBackgroundColor = useCallback(
    (item: Day) => {
      if (
        (item.date.isSame(period?.startDate) ||
          item.date.isSame(period?.endDate)) &&
        !item.prevDates
      ) {
        return { backgroundColor: primary, borderRadius: 50 };
      }
    },
    [period]
  );

  const getBgMarked = useCallback(
    (item: Day) => {
      if (
        item.date.isSameOrAfter(period?.startDate) &&
        item.date.isSame(period?.startDate) &&
        !item.prevDates
      ) {
        return {
          backgroundColor: "#f1f1f1",
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
        };
      }
      if (
        item.date.isSameOrBefore(period?.endDate) &&
        item.date.isSame(period?.endDate) &&
        !item.prevDates
      ) {
        return {
          backgroundColor: "#f1f1f1",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        };
      }
      if (
        item.date.isSameOrAfter(period?.startDate) &&
        item.date.isSameOrBefore(period?.endDate) &&
        !item.prevDates
      ) {
        return { backgroundColor: "#f1f1f1" };
      }
    },
    [period]
  );

  const getColorTxt = useCallback(
    (item: Day) => {
      if (
        (item.date.isSame(period?.startDate) ||
          item.date.isSame(period?.endDate)) &&
        !item.prevDates
      ) {
        return "white";
      } else if (item.disabled) {
        return "#ccc";
      } else {
        return black;
      }
    },
    [period]
  );

  const handleDayPress = useCallback(
    (obj: any) => {
      const { item, monthIndex } = obj;

      if (item.disabled) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (!period?.startDate && !period?.endDate && !item.prevDates) {
        onSetPeriod({
          ...period,
          id: "0",
          startDate: item.date,
          endDate: null,
          monthIndex,
        });
        return;
      }
      if (item.date.isBefore(period?.startDate) && !item.prevDates) {
        onSetPeriod({
          id: "0",
          ...period,
          startDate: item.date,
          monthIndex,
        });
        return;
      }
      if (period?.startDate && period?.endDate && !item.prevDates) {
        onSetPeriod({
          ...period,
          id: "0",
          startDate: item.date,
          endDate: null,
          monthIndex,
        });
        return;
      }
      if (period?.startDate && !item.prevDates) {
        onSetPeriod({
          id: "0",
          ...period,
          endDate: item.date,
          monthIndex,
        });
        return;
      }
    },
    [period]
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: MONTH_HEIGHT,
      offset: MONTH_HEIGHT * index,
      index,
    }),
    []
  );

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.dayLabel}>
        <Text style={{ color: grey0 }}>{item}</Text>
      </View>
    ),
    []
  );

  const renderDay = useCallback(
    ({ item }: ListRenderItemInfo<Day>) => {
      return (
        <View style={{ ...styles.dayContainer, ...getBgMarked(item) }}>
          <Pressable
            style={{
              ...styles.dayContainer,
              ...getBackgroundColor(item),
            }}
            disabled={item.prevDates}
            onPress={() => handleDayPress({ item, monthIndex: 0 })}
          >
            <Text style={{ ...styles.dayText, color: getColorTxt(item) }}>
              {item.prevDates ? "" : item.date.format("D")}
            </Text>
          </Pressable>
        </View>
      );
    },
    [period]
  );

  const renderMonth = useCallback(
    ({ item }: ListRenderItemInfo<Month>) => {
      return (
        <FlatList
          ref={flatlistRef}
          ListHeaderComponent={
            <View style={styles.monthContainer}>
              <Text style={styles.month}>{item.month}</Text>
            </View>
          }
          numColumns={7}
          data={item.data}
          keyExtractor={keyDay}
          renderItem={renderDay}
          contentContainerStyle={{ height: MONTH_HEIGHT }}
        />
      );
    },
    [period]
  );

  const keyDay = useCallback((item: Day) => item.date.toString(), []);
  const keyMonth = useCallback((item: Month) => item.monthIndex.toString(), []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={daysHeader}
          renderItem={renderDayLabel}
        />
      </View>
      <FlatList
        data={months}
        renderItem={renderMonth}
        keyExtractor={keyMonth}
        contentContainerStyle={{ alignItems: "center", marginTop: -15 }}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(DateRangePicker);

const styles = StyleSheet.create({
  dayContainer: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  monthContainer: {
    height: 50,
    justifyContent: "center",
    marginTop: MONTH_MT,
  },
  dayLabel: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  month: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "lowercase",
    color: black,
  },
  dayText: {
    color: black,
    fontWeight: "500",
    fontSize: 15,
  },
});