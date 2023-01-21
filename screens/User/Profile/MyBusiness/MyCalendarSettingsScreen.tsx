import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { Header, ListItem, Stack } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

export const MyCalendarSettingsScreen = () => {
  const { t } = useTranslation();
  const [slot, setSlot] = useState(29);

  const items = [
    { label: "15m", value: 14 },
    { label: "30m", value: 29 },
    { label: "1h", value: 59 },
    { label: "2h", value: 120 },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("settingsCalendar")} />
      <Stack align="start" sx={styles.container}>
        <ListItem between sx={styles.item}>
          <Stack align="start" sx={{ flex: 1, marginRight: 15 }}>
            <Text style={styles.title}>{t("schedulesInterval")}</Text>
            <Text style={styles.description}>
              {t("scheduleIntervalDescription")}
            </Text>
          </Stack>
          <RNPickerSelect
            value={slot}
            onValueChange={(value) => setSlot(value)}
            items={items}
            style={{ inputIOS: styles.input, inputAndroid: styles.input }}
            doneText={t("done")}
          />
        </ListItem>
        <ListItem between>
          <Stack align="start" sx={{ flex: 1, marginRight: 15 }}>
            <Text style={styles.title}>{t("takeABreak")}</Text>
            <Text style={styles.description}>{t("takeABreakDescription")}</Text>
          </Stack>
          <Switch value={false} onChange={() => {}} />
        </ListItem>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    padding: 15,
  },
  item: { marginBottom: 15 },
  title: {
    color: black,
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 3,
  },
  description: {
    color: grey0,
    fontSize: 14.5,
  },
  input: { fontWeight: "600", fontSize: 16 },
});
