import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { FAB, Icon } from "@rneui/themed";
import { Agenda } from "react-native-calendars";
import moment from "moment";

const MyCalendarScreen = () => {
  const { t } = useTranslation();
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState();
  const [knob, setKnob] = useState(false);

  const showKnob = (
    <>
      {knob && (
        <Icon
          name="keyboard-arrow-up"
          color={theme.lightColors.grey0}
          size={30}
        />
      )}
      {!knob && (
        <Icon
          name="keyboard-arrow-down"
          color={theme.lightColors.grey0}
          size={30}
        />
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myCalendar")} />
      <Agenda
        items={{
          "2012-05-22": [{ name: "item 1 - any js object" }],
          "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
          "2012-05-24": [],
          "2012-05-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        onDayPress={(day) => {}}
        onDayChange={(day) => setSelectedDay(day)}
        renderDay={() => <View />}
        firstDay={1}
        onCalendarToggled={(calendarOpened) => setKnob(calendarOpened)}
        selected={minDate}
        minDate={minDate}
        maxDate={maxDate}
        pastScrollRange={1}
        futureScrollRange={5}
        renderEmptyDate={() => <View />}
        renderKnob={() => showKnob}
        rowHasChanged={(r1, r2) => r1.text !== r2.text}
        showClosingKnob={true}
        disabledByDefault={false}
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue",
          selectedDayBackgroundColor: theme.lightColors.primary,
          textDayFontFamily: "Exo-SemiBold",
          textDayFontSize: 13,
          agendaKnobColor: "red",
          agendaTodayColor: "red",
          backgroundColor: "white",
          nowIndicatorKnob: "red",
          todayTextColor: theme.lightColors.primary,
        }}
        style={{}}
      />
      <FAB
        icon={{ name: "calendar", type: "feather", color: "white" }}
        color={theme.lightColors.primary}
        placement="right"
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default MyCalendarScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
