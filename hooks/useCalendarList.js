import moment from "moment";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { CalendarList } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import theme from "../assets/styles/theme";
import { useDates } from "./useDates";

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
  const { _minDate, _maxDate } = useDates();

  const marked = useMemo(() => {
    return {
      [startDate]: {
        startingDay: true,
        color: primary,
        textColor: "white",
      },
      "2022-08-2": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-03": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-04": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-05": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-06": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-07": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-08": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-09": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-10": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-11": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-12": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-13": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-14": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-15": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-16": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-17": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-18": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-19": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-20": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-21": {
        color: "#f1f1f1",
        textColor: black,
      },
      "2022-08-22": {
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
        minDate={_minDate}
        maxDate={_maxDate}
        pastScrollRange={0}
        futureScrollRange={3}
        markingType={"period"}
        theme={{
          textDayHeaderFontFamily: "Exo-Medium",
          textMonthFontFamily: "Exo-SemiBold",
          textDayFontFamily: "Exo-SemiBold",
          textDayFontSize: 14,
          arrowColor: primary,
          disabledArrowColor: "#f1f1f1",
        }}
        markedDates={marked}
        automaticallyAdjustContentInsets={true}
      />
    ),
    startDate,
    endDate,
  };
};
