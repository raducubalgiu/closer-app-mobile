import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  ListRenderItemInfo,
} from "react-native";
import { memo, useCallback } from "react";
import { Divider, ListItem } from "@rneui/themed";
import dayjs from "dayjs";
import theme from "../../../../assets/styles/theme";
import CalendarDayListItem from "../ListItems/LocationListItem/CalendarDayListItem";
import { Spinner } from "../../core";

const { black, grey0 } = theme.lightColors || {};
const { width } = Dimensions.get("window");

type Slot = {
  start: string;
  dayOfWeeK: number;
  hour: string;
};

type Day = {
  day: string;
  disabled: boolean;
  isPrevDay: boolean;
  monthIndex: number;
  slots: Slot[];
};

type Month = {
  month: string;
  days: Day[];
};

const DAYS_HEADER = [
  "Duminică",
  "Luni",
  "Marţi",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
];
const DAY_SIZE = width / 7 - 5;

type IProps = {
  months: Month[] | undefined;
  selectedDay: string;
  monthIndex: number;
  onDayPress: (item: Day) => void;
  isVisible: boolean;
  handleVisible: () => void;
  isLoading: boolean;
  children: any;
};

const Agenda = ({
  months,
  selectedDay,
  monthIndex,
  isVisible,
  handleVisible,
  onDayPress,
  isLoading,
  children,
}: IProps) => {
  const renderDay = useCallback(
    ({ item }: ListRenderItemInfo<Day>) => (
      <CalendarDayListItem
        onPress={() => onDayPress(item)}
        day={item}
        selectedDay={selectedDay}
      />
    ),
    [selectedDay]
  );

  const renderMonth = useCallback(
    ({ item }: ListRenderItemInfo<Month>) => (
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.month}>
            <Text style={styles.monthTxt}>
              {dayjs(item.month).format("MMMM YYYY")}
            </Text>
          </View>
        )}
        numColumns={7}
        data={item.days}
        keyExtractor={dayKey}
        renderItem={renderDay}
        getItemLayout={getDayLayout}
      />
    ),
    [selectedDay]
  );

  const monthKey = useCallback((item: Month) => item.month, []);
  const dayKey = useCallback((item: Day) => item.day, []);

  const getDayLayout = useCallback(
    (_: any, index: number) => ({
      length: DAY_SIZE,
      offset: DAY_SIZE * index,
      index,
    }),
    []
  );

  const getMonthLayout = useCallback(
    (_: any, index: number) => ({
      length: DAY_SIZE * 6,
      offset: DAY_SIZE * 6 * index,
      index,
    }),
    []
  );

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.dayLabel}>
        <Text style={{ color: grey0 }}>{item.split("")[0]}</Text>
      </View>
    ),
    []
  );

  const dateTitle = (
    <Text style={styles.date}>{dayjs(selectedDay).format("DD MMMM YYYY")}</Text>
  );

  return (
    <View style={styles.container}>
      <ListItem.Accordion
        isExpanded={isVisible}
        onPress={handleVisible}
        content={dateTitle}
        containerStyle={styles.accordion}
      >
        {!isLoading && (
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              data={DAYS_HEADER}
              renderItem={renderDayLabel}
            />
            <Divider color="#ddd" />
            <FlatList
              data={months}
              keyExtractor={monthKey}
              renderItem={renderMonth}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              getItemLayout={getMonthLayout}
              initialScrollIndex={monthIndex}
            />
          </View>
        )}
        {isLoading && <Spinner />}
      </ListItem.Accordion>
      <View style={{ width: "100%", flex: 1 }}>{children}</View>
    </View>
  );
};

export default memo(Agenda);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  accordion: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 7.5,
    marginVertical: 10,
  },
  date: { color: "black", fontWeight: "600", fontSize: 15 },
  dayLabel: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  month: { marginTop: 40, marginBottom: 10 },
  monthTxt: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "lowercase",
    color: black,
  },
});
