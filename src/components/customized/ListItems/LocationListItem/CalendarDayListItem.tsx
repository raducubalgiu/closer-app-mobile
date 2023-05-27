import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { memo, useCallback } from "react";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { shortFormat } from "../../../../utils/date-utils";
import theme from "../../../../../assets/styles/theme";

const { primary, black, success } = theme.lightColors || {};

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

type IProps = { onPress: () => void; day: Day; selectedDay: string };

const { width } = Dimensions.get("window");

const DAY_SIZE = width / 7 - 5;
const DAY_PADDING = DAY_SIZE - 10;

const CalendarDayListItem = ({ onPress, day, selectedDay }: IProps) => {
  const getColorTxt: any = useCallback(
    (day: Day) => {
      switch (true) {
        case day.isPrevDay:
          return { color: "white" };
        case selectedDay === shortFormat(day.day) && isEmpty(day.slots):
          return {
            color: "white",
            textDecorationStyle: "solid",
            textDecorationLine: "line-through",
          };
        case day.disabled || isEmpty(day.slots):
          return {
            color: "#ccc",
            textDecorationStyle: "solid",
            textDecorationLine: "line-through",
          };
        case selectedDay === shortFormat(day.day):
          return { color: "white" };
        default:
          return { color: black };
      }
    },
    [selectedDay]
  );

  const getBgColor = useCallback(
    (day: Day) => {
      switch (true) {
        case shortFormat(day.day) === selectedDay && !day.isPrevDay:
          return { backgroundColor: primary };
        default:
          return {};
      }
    },
    [selectedDay]
  );

  const getBulletColor = useCallback(
    (day: Day) => {
      switch (true) {
        case day.disabled || day.isPrevDay || isEmpty(day.slots):
          return "white";
        default:
          return success;
      }
    },
    [selectedDay]
  );

  return (
    <Pressable
      onPress={onPress}
      style={[styles.dayContainer]}
      disabled={day.isPrevDay || day.disabled || isEmpty(day.slots)}
    >
      <View style={[styles.day, getBgColor(day)]}>
        <Text style={[styles.dayText, getColorTxt(day)]}>
          {dayjs(day.day).format("D")}
        </Text>
        <View
          style={[styles.bullet, { backgroundColor: getBulletColor(day) }]}
        />
      </View>
    </Pressable>
  );
};

export default memo(CalendarDayListItem);

const styles = StyleSheet.create({
  dayContainer: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    width: DAY_PADDING,
    height: DAY_PADDING,
    borderRadius: DAY_PADDING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    color: black,
    fontWeight: "600",
  },
  bullet: { width: 4.25, height: 4.25, borderRadius: 50 },
});
