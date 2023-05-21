import { StyleSheet, Text, Pressable } from "react-native";
import { memo, useCallback } from "react";
import dayjs from "dayjs";
import { AvailableSlot } from "../../../../ts/interfaces/location";
import theme from "../../../../../assets/styles/theme";

type IProps = { availableSlot: AvailableSlot };
const { black } = theme.lightColors || {};

const AvailableSlotListItem = ({ availableSlot }: IProps) => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>
        Ora{" "}
        {dayjs(availableSlot.start)
          .startOf("day")
          .add(availableSlot.startMinutes, "minutes")
          .format("HH:mm")}
      </Text>
    </Pressable>
  );
};

export default memo(AvailableSlotListItem);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 7.5,
    paddingHorizontal: 25,
    borderRadius: 2.5,
    marginRight: 10,
  },
  text: { color: black, fontWeight: "600", fontSize: 13.5 },
});
