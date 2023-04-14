import { StyleSheet, Text } from "react-native";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import dayjs from "dayjs";

const { grey0 } = theme.lightColors || {};

export const MessDateItem = ({ date }: { date: string }) => {
  return (
    <Stack align="center" justify="center" sx={styles.dateCont}>
      <Text style={styles.date}>
        {dayjs(date).format("DD MMMM YYYY HH:MM")}
      </Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  dateCont: { width: "100%", marginVertical: 20 },
  date: { color: grey0, fontSize: 13 },
});
