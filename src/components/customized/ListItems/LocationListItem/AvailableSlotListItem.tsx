import { StyleSheet, Text, Pressable } from "react-native";
import { memo, useCallback } from "react";
import dayjs from "dayjs";
import { AvailableSlot } from "../../../../ts/interfaces/location";
import theme from "../../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { dayMonthFormat } from "../../../../utils/date-utils";

type IProps = { availableSlot: AvailableSlot };
const { black } = theme.lightColors || {};

const AvailableSlotListItem = ({ availableSlot }: IProps) => {
  const { t } = useTranslation("common");

  const isToday = dayjs(availableSlot.start)
    .utc(true)
    .startOf("day")
    .isSame(dayjs().utc(true).startOf("day"));
  const isTommorow = dayjs(availableSlot.start)
    .utc(true)
    .startOf("day")
    .isSame(dayjs().utc(true).startOf("day").add(1, "day"));

  const displaySlot = useCallback(() => {
    switch (true) {
      case isToday:
        return `${t("today")} ${dayjs(availableSlot.start)
          .startOf("day")
          .add(availableSlot.startMinutes, "minutes")
          .format("HH:mm")}`;
      case isTommorow:
        return `${t("tommorow")} ${dayjs(availableSlot.start)
          .startOf("day")
          .add(availableSlot.startMinutes, "minutes")
          .format("HH:mm")}`;
      default:
        return `${dayMonthFormat(availableSlot.start)} ${dayjs(
          availableSlot.start
        )
          .startOf("day")
          .add(availableSlot.startMinutes, "minutes")
          .format("HH:mm")}`;
    }
  }, []);

  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{displaySlot()}</Text>
    </Pressable>
  );
};

export default memo(AvailableSlotListItem);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f1f1f1",
    width: 150,
    height: 32.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2.5,
  },
  text: { color: black, fontWeight: "600", fontSize: 13.5 },
});
