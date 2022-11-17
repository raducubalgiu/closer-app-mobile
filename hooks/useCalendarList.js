import React, { useState, useMemo, useCallback, useEffect } from "react";
import { CalendarList } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import theme from "../assets/styles/theme";

LocaleConfig.locales["ro"] = {
  monthNames: [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ],
  monthNamesShort: [
    "Ian.",
    "Feb.",
    "Mar",
    "Apr",
    "Mai",
    "Iun",
    "Iul.",
    "Aug",
    "Sept.",
    "Oct.",
    "Noi.",
    "Dec.",
  ],
  dayNames: [
    "Duminica",
    "Luni",
    "Marti",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sambata",
  ],
  dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
  today: "Azi",
};
LocaleConfig.defaultLocale = "ro";

const { primary, black } = theme.lightColors;

export const useCalendarList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const marked = useMemo(() => {
    return {
      [startDate]: {
        startingDay: true,
        color: primary,
        textColor: "white",
      },
      "2022-11-2": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-03": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-04": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-05": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-06": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-07": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-08": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-09": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-10": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-11": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-12": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-13": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-14": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-15": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-16": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-17": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-18": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-19": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-20": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-21": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-11-22": {
        color: "#f1f1f1",
        textColor: black,
      },
      [endDate]: {
        endingDay: true,
        color: primary,
        textColor: "white",
      },
    };
  }, [startDate, endDate]);

  const handleDate = useCallback(
    (day) => {
      if (startDate === "" && endDate === "") {
        setStartDate(day.dateString);
      } else if (startDate !== "" && endDate === "") {
        setEndDate(day.dateString);
      } else if (startDate !== "" && day < startDate) {
        setStartDate(day.dateString);
        setEndDate("");
      } else {
        setStartDate(day.dateString);
        setEndDate("");
      }
    },
    [startDate, endDate]
  );

  return {
    calendar: (
      <CalendarList
        onDayPress={(day) => handleDate(day)}
        hideExtraDays={true}
        disableAllTouchEventsForDisabledDays
        firstDay={1}
        minDate="17-11-2022"
        maxDate="17-11-2022"
        pastScrollRange={0}
        futureScrollRange={3}
        markingType={"period"}
        theme={{
          textDayFontSize: 14,
          textDayFontWeight: "500",
          arrowColor: primary,
          disabledArrowColor: "#f1f1f1",
          textMonthFontWeight: "600",
        }}
        markedDates={marked}
        automaticallyAdjustContentInsets={true}
      />
    ),
    startDate,
    endDate,
  };
};
