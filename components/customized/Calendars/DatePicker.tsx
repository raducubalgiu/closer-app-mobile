import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  SectionList,
} from "react-native";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { Divider, ListItem } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import { useCalendarList } from "../../../hooks";
import theme from "../../../assets/styles/theme";
import { SHORT_DATE } from "../../../utils/date-utils";

const { primary, black, grey0 } = theme.lightColors || {};
const { width } = Dimensions.get("window");
const CELL_SIZE = width / 7 - 5;
const CELL_WITH_PADDING = CELL_SIZE - 5;

type IProps = {
  children: any;
  selectedDay: string;
  onSelectedDay: (item: any) => void;
};

export const DatePicker = ({
  children,
  selectedDay,
  onSelectedDay,
}: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { MONTHS, DAYS_HEADER, DAYS_NAMES } = useCalendarList();

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.cell}>
        <Text style={{ color: grey0 }}>{item}</Text>
      </View>
    ),
    []
  );

  const getBgColor = useCallback(
    (item: any) => {
      if (SHORT_DATE(item.date) === selectedDay && !item.prevDates) {
        return primary;
      } else {
        return "white";
      }
    },
    [selectedDay]
  );

  const getColorTxt = useCallback(
    (item: any) => {
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

  const handleDayPress = useCallback((item: any) => {
    if (item.disabled || item.prevDates) {
      return;
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsVisible((isVisible) => !isVisible);
      onSelectedDay(item);
    }
  }, []);

  const renderDay = useCallback(
    ({ item }: { item: any }) => {
      return (
        <Pressable style={styles.cell} onPress={() => handleDayPress(item)}>
          <View style={{ backgroundColor: getBgColor(item), ...styles.day }}>
            <Text style={{ fontWeight: "600", color: getColorTxt(item) }}>
              {item.prevDates ? "" : item.date.format("D")}
            </Text>
          </View>
        </Pressable>
      );
    },
    [selectedDay]
  );

  const sectionHeader = useCallback(
    ({ section: { month } }: { section: any }) => (
      <Text style={styles.monthTitle}>{month}</Text>
    ),
    []
  );

  const handleChangeDate = useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [isVisible]
  );

  return (
    <View style={styles.container}>
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
        containerStyle={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 5,
          paddingVertical: 7.5,
          marginVertical: 10,
        }}
      >
        <>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            data={DAYS_HEADER}
            renderItem={renderDayLabel}
          />
          <Divider color="#ddd" />
          <SectionList
            sections={MONTHS}
            keyExtractor={(item: any, index: number) => item + index}
            renderItem={({ item }) => (
              <FlatList
                numColumns={7}
                data={item.list}
                renderItem={renderDay}
              />
            )}
            renderSectionHeader={sectionHeader}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </>
      </ListItem.Accordion>
      <ListItem.Content style={styles.children}>
        <View style={{ width: "100%" }}>{children}</View>
      </ListItem.Content>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  day: {
    borderRadius: 50,
    width: CELL_WITH_PADDING,
    height: CELL_WITH_PADDING,
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
  children: { flex: 1, width: "100%" },
});
