import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  ListRenderItemInfo,
  SafeAreaView,
} from "react-native";
import { useCallback, useState, memo, useRef } from "react";
import dayjs from "dayjs";
import { Divider, ListItem } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import { useCalendarList } from "../../../src/hooks";
import theme from "../../../assets/styles/theme";
import { SHORT_DATE } from "../../../src/utils/date-utils";
import { Month } from "../../../models/month";
import { Day } from "../../../models/day";

const { primary, black, grey0 } = theme.lightColors || {};
const { width } = Dimensions.get("window");
const DAY_SIZE = width / 7 - 5;
const DAY_PADDING = DAY_SIZE - 5;

const MONTH_MT = 20;
const MONTH_HEIGHT = DAY_SIZE * 6 + MONTH_MT;

type IProps = {
  children: any;
  selectedDay: string;
  onSelectedDay: (item: any, monthIndex: number) => void;
  initialIndex?: number;
};

const CalendarAgenda = ({
  children,
  selectedDay,
  onSelectedDay,
  initialIndex,
}: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { MONTHS, DAYS_HEADER, DAYS_NAMES } = useCalendarList();
  const flatlistRef = useRef<FlatList>(null);

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.cell}>
        <Text style={{ color: grey0 }}>{item}</Text>
      </View>
    ),
    []
  );

  const getBgColor = useCallback(
    (item: Day) => {
      if (SHORT_DATE(item.date) === selectedDay && !item.prevDates) {
        return primary;
      } else {
        return "white";
      }
    },
    [selectedDay]
  );

  const getColorTxt = useCallback(
    (item: Day) => {
      if (item.disabled) {
        return "#ccc";
      } else if (SHORT_DATE(item.date) === selectedDay) {
        return "white";
      } else {
        return black;
      }
    },
    [selectedDay]
  );

  const handleDayPress = useCallback((item: Day, monthIndex: number) => {
    if (item.disabled || item.prevDates) {
      return;
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsVisible((isVisible) => !isVisible);
      onSelectedDay(item, monthIndex);
    }
  }, []);

  const handleChangeDate = useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [isVisible]
  );

  const renderMonth = useCallback(
    ({ item, index }: ListRenderItemInfo<Month>) => (
      <FlatList
        ref={flatlistRef}
        ListHeaderComponent={
          <View style={styles.monthContainer}>
            <Text style={styles.month}>{item.month}</Text>
          </View>
        }
        numColumns={7}
        data={item.data}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Pressable
            style={styles.cell}
            onPress={() => handleDayPress(item, index)}
          >
            <View style={{ backgroundColor: getBgColor(item), ...styles.day }}>
              <Text style={{ fontWeight: "600", color: getColorTxt(item) }}>
                {item.prevDates ? "" : item.date.format("D")}
              </Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ height: MONTH_HEIGHT }}
      />
    ),
    [selectedDay]
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: MONTH_HEIGHT,
      offset: MONTH_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ListItem.Accordion
        isExpanded={isVisible}
        onPress={handleChangeDate}
        content={
          <Text style={styles.date}>
            {`${DAYS_NAMES[dayjs(selectedDay).day()]}, ${dayjs(
              selectedDay
            ).format("D MMMM YYYY")}`}
          </Text>
        }
        containerStyle={styles.accordion}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={DAYS_HEADER}
          renderItem={renderDayLabel}
        />
        <Divider color="#ddd" />
        <FlatList
          data={MONTHS}
          renderItem={renderMonth}
          keyExtractor={(item) => item.month}
          getItemLayout={getItemLayout}
          initialScrollIndex={initialIndex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ListItem.Accordion>
      <View style={{ width: "100%", flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default memo(CalendarAgenda);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  accordion: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 7.5,
    marginVertical: 10,
  },
  cell: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  day: {
    borderRadius: 50,
    width: DAY_PADDING,
    height: DAY_PADDING,
    alignItems: "center",
    justifyContent: "center",
  },
  monthTitle: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "lowercase",
    marginTop: 20,
    marginBottom: 15,
  },
  date: { color: "black", fontWeight: "600", fontSize: 15 },
  changeDate: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "black",
  },
  children: { width: "100%", flex: 1 },
  monthContainer: {
    height: 50,
    justifyContent: "center",
    marginTop: MONTH_MT,
  },
  month: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "lowercase",
    color: black,
  },
});
