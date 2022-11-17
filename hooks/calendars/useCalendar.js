import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import theme from "../../assets/styles/theme";

export const useCalendar = (onHide, { ...props }) => {
  const [selectedDate, setSelectedDate] = useState(minDate);
  const { primary } = theme.lightColors;

  const handleDayChange = (day) => {
    setSelectedDate(moment(day).format("YYYY-MM-DD"));
    onHide();
  };

  const calendarJSX = (
    <Calendar
      {...props}
      initialDate={selectedDate}
      minDate="17-11-2022"
      maxDate="17-11-2022"
      onDayPress={(day) => handleDayChange(day.dateString)}
      onMonthChange={(month) => {}}
      hideExtraDays={true}
      firstDay={1}
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      disableAllTouchEventsForDisabledDays
      pastScrollRange={0}
      futureScrollRange={5}
      theme={{
        textDayHeaderFontFamily: "Exo-Medium",
        textMonthFontFamily: "Exo-SemiBold",
        textDayFontFamily: "Exo-SemiBold",
        textDayFontSize: 14,
        arrowColor: primary,
        disabledArrowColor: "#f1f1f1",
        backgroundColor: "red",
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          marked: true,
          selectedColor: primary,
        },
      }}
    />
  );

  return {
    calendar: {
      calendarJSX,
      selectedDate,
    },
  };
};

const styles = StyleSheet.create({
  month: { textTransform: "capitalize" },
});
