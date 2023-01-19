import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { NoFoundMessage, DatePicker } from "../../../../components/customized";
import { Header, Stack } from "../../../../components/core";
import { useSheet } from "../../../../hooks";

const { black, grey0 } = theme.lightColors || {};

export const MyCalendarScreen = () => {
  const { t } = useTranslation();

  const sheetContent = <Text>Hello World</Text>;
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(["25%", "60%"], sheetContent);

  const noFoundData = (
    <NoFoundMessage
      title="Nu mai sunt locuri"
      description="Se pare ca nu mai sunt locuri pentru ziua selectata"
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        divider
        title={
          <Stack align="center" justify="center">
            <Text
              style={{
                fontSize: 16.5,
                color: black,
                fontWeight: "700",
              }}
            >
              {t("myCalendar")}
            </Text>
            <Text
              style={{
                marginTop: 2.5,
                fontWeight: "500",
                color: grey0,
                fontSize: 15,
              }}
            >
              14 noiembrie 22
            </Text>
          </Stack>
        }
        actionBtn={
          <Pressable onPress={SHOW_BS} style={{ padding: 5 }}>
            <Icon name="info" type="feather" color={black} size={25} />
          </Pressable>
        }
      />
      <DatePicker />
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
  },
});
