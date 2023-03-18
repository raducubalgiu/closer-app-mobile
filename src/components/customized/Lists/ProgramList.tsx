import { StyleSheet, Text } from "react-native";
import { Stack, ListItem } from "../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import dayjs from "dayjs";

type IProps = { hours: any };
const { black, grey0 } = theme.lightColors || {};

const ProgramList = ({ hours }: IProps) => {
  const { t } = useTranslation("common");

  const displayHour = (minutes: number) => {
    return dayjs().utc().startOf("day").add(minutes, "minutes").format("HH:mm");
  };

  const dateFormat = (start: number, end: number) => {
    if (start === -1 || end === -1) {
      return t("closed");
    } else {
      return `${displayHour(start)} - ${displayHour(end)}`;
    }
  };

  const arr = Object.entries(hours);
  const element = arr.splice(0, 1)[0];
  arr.splice(arr.length, 0, element);

  return (
    <Stack align="start" sx={styles.section}>
      {hours &&
        arr?.map((el: any, i) => {
          return (
            <ListItem between align="center" key={i} sx={{ marginBottom: 15 }}>
              <Text style={styles.heading}>{t(el[0])}</Text>
              <Text style={styles.text}>
                {dateFormat(el[1].start, el[1].end)}
              </Text>
            </ListItem>
          );
        })}
    </Stack>
  );
};

export default ProgramList;

const styles = StyleSheet.create({
  section: { marginHorizontal: 20 },
  heading: {
    color: black,
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    color: grey0,
    fontSize: 13.5,
  },
});
