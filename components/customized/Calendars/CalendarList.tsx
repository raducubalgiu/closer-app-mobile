import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SectionList,
  FlatList,
  Pressable,
} from "react-native";
import theme from "../../../assets/styles/theme";
import { useCallback } from "react";
import { useCalendarList } from "../../../hooks";
import dayjs from "dayjs";

const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
const { width } = Dimensions.get("window");
const { primary, black, grey0 } = theme.lightColors || {};
const WIDTH_AND_HEIGHT = width / 7 - 10;

type IProps = { startDate: any; endDate: any; onDayPress: (day: any) => void };

export const CalendarList = ({ startDate, endDate, onDayPress }: IProps) => {
  const { MONTHS, DAYS_HEADER } = useCalendarList();

  const getBackgroundColor = useCallback(
    (item: any) => {
      if (
        (item.date.isSame(startDate) || item.date.isSame(endDate)) &&
        !item.disabled
      ) {
        return { backgroundColor: primary, borderRadius: 50 };
      }
    },
    [startDate, endDate]
  );

  const getBgMarked = useCallback(
    (item: any) => {
      if (
        item.date.isSameOrAfter(startDate) &&
        item.date.isSame(startDate) &&
        !item.disabled
      ) {
        return {
          backgroundColor: "#f1f1f1",
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
        };
      }
      if (
        item.date.isSameOrBefore(endDate) &&
        item.date.isSame(endDate) &&
        !item.disabled
      ) {
        return {
          backgroundColor: "#f1f1f1",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        };
      }
      if (
        item.date.isSameOrAfter(startDate) &&
        item.date.isSameOrBefore(endDate) &&
        !item.disabled
      ) {
        return { backgroundColor: "#f1f1f1" };
      }
    },
    [startDate, endDate]
  );

  const getColorTxt = useCallback(
    (item: any) => {
      if (
        (item.date.isSame(startDate) || item.date.isSame(endDate)) &&
        !item.disabled
      ) {
        return "white";
      } else if (item.disabled) {
        return "#ccc";
      } else {
        return black;
      }
    },
    [startDate, endDate]
  );

  const sectionHeader = useCallback(
    ({ section: { month } }: { section: any }) => (
      <Text style={styles.monthTitle}>{month}</Text>
    ),
    []
  );

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.cell}>
        <Text style={{ color: grey0 }}>{item}</Text>
      </View>
    ),
    []
  );

  const renderDay = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View
          style={{
            marginVertical: 2,
            ...styles.cell,
            ...getBgMarked(item),
          }}
        >
          <Pressable
            style={{
              width: WIDTH_AND_HEIGHT,
              height: WIDTH_AND_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
              ...getBackgroundColor(item),
            }}
            onPress={() => onDayPress(item)}
          >
            <Text style={{ fontWeight: "600", color: getColorTxt(item) }}>
              {item.prevDates ? "" : item.date.format("D")}
            </Text>
          </Pressable>
        </View>
      );
    },
    [startDate, endDate]
  );

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={DAYS_HEADER}
          renderItem={renderDayLabel}
        />
        <SectionList
          sections={MONTHS}
          keyExtractor={(item: any, index: number) => item + index}
          renderItem={({ item }) => (
            <FlatList numColumns={7} data={item.list} renderItem={renderDay} />
          )}
          renderSectionHeader={sectionHeader}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  cell: {
    width: WIDTH_AND_HEIGHT,
    height: WIDTH_AND_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  monthTitle: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "lowercase",
    marginTop: 20,
    marginBottom: 15,
  },
});
