import { StyleSheet, Text, Pressable } from "react-native";
import theme from "../../../../assets/styles/theme";

const { grey3 } = theme.lightColors || {};

type IProps = {
  onPress: any;
  statsNo: number | string;
  label: string;
  sx?: {};
};

export const StatsButton = ({ onPress, statsNo, label, sx }: IProps) => {
  return (
    <Pressable style={[styles.container, sx]} onPress={onPress}>
      <Text style={styles.statsNumber}>{statsNo}</Text>
      <Text style={styles.statsText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  statsNumber: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  statsText: {
    color: grey3,
    marginTop: 7.5,
    fontWeight: "500",
    minWidth: 100,
    textAlign: "center",
  },
});
