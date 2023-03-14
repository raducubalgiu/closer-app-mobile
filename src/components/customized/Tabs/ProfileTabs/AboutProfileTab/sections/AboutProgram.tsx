import { StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { Stack } from "../../../../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../../../../../assets/styles/theme";
import { ListItem } from "../../../../../core";
import dayjs from "dayjs";

type IProps = { hours: any };
const { black, grey0 } = theme.lightColors || {};

const AboutProgram = ({ hours }: IProps) => {
  const { t } = useTranslation("common");

  const dateFormat = (minutes: number) => {
    if (minutes === -1) return t("closed");
    return dayjs().utc().startOf("day").add(minutes, "minutes").format("HH:mm");
  };

  return (
    <Stack align="start" sx={styles.section}>
      <Text style={styles.heading}>Program</Text>
      {hours &&
        Object.entries(hours)?.map((el: any, i) => {
          return (
            <ListItem between key={i}>
              <Text style={styles.text}>{t(el[0])}</Text>
              <Text style={styles.heading}>
                {dateFormat(el[1].start)} - {dateFormat(el[1].end)}
              </Text>
            </ListItem>
          );
        })}
    </Stack>
  );
};

export default memo(AboutProgram);

const styles = StyleSheet.create({
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    color: black,
    fontWeight: "600",
  },
  text: {
    marginTop: 10,
    color: grey0,
  },
});
