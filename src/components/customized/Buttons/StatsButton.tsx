import { StyleSheet, Text, Pressable } from "react-native";
import theme from "../../../../assets/styles/theme";

const { grey3 } = theme.lightColors || {};

type IProps = {
  onPress: any;
  statsNo: number | string;
  label: string;
};

export const StatsButton = ({ onPress, statsNo, label }: IProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.statsNumber}>{statsNo}</Text>
      <Text style={styles.statsText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", minWidth: 75 },
  statsText: {
    color: grey3,
    fontSize: 13,
    marginTop: 5,
    fontWeight: "500",
  },
  statsNumber: { fontSize: 16, fontWeight: "700" },
});
