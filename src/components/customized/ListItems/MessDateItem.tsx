import { StyleSheet, Text } from "react-native";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { grey0 } = theme.lightColors || {};

export const MessDateItem = ({ date }: { date: string }) => {
  return (
    <Stack align="center" justify="center" sx={styles.dateCont}>
      <Text style={styles.date}>{date}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  dateCont: { width: "100%", marginVertical: 20 },
  date: { color: grey0, fontSize: 13 },
});
