import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import theme from "../../assets/styles/theme";

export const useCalendar = (onHide, { ...props }) => {
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(minDate);
  const { primary } = theme.lightColors;

  const formatMonth = (date) => moment(date).format("MMMM YYYY");

  const handleDayChange = (day) => {
    setSelectedDate(moment(day).format("YYYY-MM-DD"));
    onHide();
  };

  const calendarJSX = (
    <Calendar
      {...props}
      initialDate={selectedDate}
      minDate={minDate}
      maxDate={maxDate}
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
