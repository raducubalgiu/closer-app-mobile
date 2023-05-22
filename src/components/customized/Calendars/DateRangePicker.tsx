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
import theme from "../../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { Month, Day, Period } from "../../../ts";
import * as Animatable from "react-native-animatable";
import dayjs from "dayjs";

const { width } = Dimensions.get("window");
const { black, primary, grey0 } = theme.lightColors || {};
const MONTH_MT = 20;
const DAY_SIZE = width / 7 - 5;
const MONTH_HEIGHT = DAY_SIZE * 6 + 25;

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

  const startDate = dayjs(period.startDate, "YYYY-MM-DD").utc(true);
  const endDate = dayjs(period.endDate, "YYYY-MM-DD").utc(true);

  const getBackgroundColor = useCallback(
    (item: Day) => {
      switch (true) {
        case (item.date.isSame(startDate) || item.date.isSame(endDate)) &&
          !item.prevDates:
          return { backgroundColor: primary, borderRadius: 50 };
        default:
          return null;
      }
    },
    [startDate, endDate]
  );

  const getBgMarked = useCallback(
    (item: Day) => {
      switch (true) {
        case item.date.isSameOrAfter(startDate) &&
          item.date.isSame(startDate) &&
          !item.prevDates:
          return {
            backgroundColor: "#f1f1f1",
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
          };
        case item.date.isSameOrBefore(endDate) &&
          item.date.isSame(endDate) &&
          !item.prevDates:
          return {
            backgroundColor: "#f1f1f1",
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
          };
        case item.date.isSameOrAfter(startDate) &&
          item.date.isSameOrBefore(endDate) &&
          !item.prevDates:
          return { backgroundColor: "#f1f1f1" };
        default:
          return null;
      }
    },
    [startDate, endDate]
  );

  const getColorTxt: any = useCallback(
    (item: Day) => {
      switch (true) {
        case (item.date.isSame(startDate) || item.date.isSame(endDate)) &&
          !item.prevDates:
          return { color: "white" };
        case item.disabled:
          return {
            color: "#ccc",
            textDecorationStyle: "solid",
            textDecorationLine: "line-through",
          };
        default:
          return { color: black };
      }
    },
    [startDate, endDate]
  );

  const handleDayPress = useCallback(
    (obj: any) => {
      const { item, monthIndex } = obj;

      if (item.disabled) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (!startDate.isValid() && !endDate.isValid() && !item.prevDates) {
        onSetPeriod({
          ...period,
          startDate: dayjs(item.date).format("YYYY-MM-DD"),
          endDate: null,
          monthIndex,
        });
        return;
      }
      if (item.date.isBefore(startDate) && !item.prevDates) {
        onSetPeriod({
          ...period,
          startDate: dayjs(item.date).format("YYYY-MM-DD"),
          monthIndex,
        });
        return;
      }
      if (startDate.isValid() && endDate.isValid() && !item.prevDates) {
        onSetPeriod({
          ...period,
          startDate: dayjs(item.date).format("YYYY-MM-DD"),
          endDate: null,
          monthIndex,
        });
        return;
      }
      if (startDate.isValid() && !item.prevDates) {
        onSetPeriod({
          ...period,
          endDate: dayjs(item.date).format("YYYY-MM-DD"),
          monthIndex,
        });
        return;
      }
    },
    [startDate, endDate]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
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
        <View style={[styles.dayContainer, getBgMarked(item)]}>
          <Pressable
            style={[styles.dayContainer, getBackgroundColor(item)]}
            disabled={item.prevDates}
            onPress={() => handleDayPress({ item, monthIndex: 0 })}
          >
            <Animatable.Text style={[styles.dayText, getColorTxt(item)]}>
              {item.prevDates ? "" : item.date.format("D")}
            </Animatable.Text>
          </Pressable>
        </View>
      );
    },
    [startDate, endDate]
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
    [startDate, endDate]
  );

  const keyDay = useCallback((item: Day) => item.date.toString(), []);
  const keyMonth = useCallback((item: Month) => item.monthIndex.toString(), []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
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
  header: { alignItems: "center", justifyContent: "center" },
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
    fontWeight: "600",
    fontSize: 14,
  },
});
