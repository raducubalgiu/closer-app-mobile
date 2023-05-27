import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { black } = theme.lightColors || {};
type IProps = { hour: string; onPress: () => void };

const SlotListItem = ({ hour, onPress }: IProps) => {
  return (
    <Pressable onPress={onPress}>
      <Stack direction="row" justify="start" sx={styles.slot}>
        <Text style={styles.slotText}>{hour}</Text>
      </Stack>
    </Pressable>
  );
};

export default memo(SlotListItem);

const styles = StyleSheet.create({
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  slotText: {
    fontSize: 13,
    fontWeight: "600",
    color: black,
  },
});
