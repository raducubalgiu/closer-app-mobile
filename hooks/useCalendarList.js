import React, { useState, useMemo, useCallback } from "react";
import moment from "moment";
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

export const useCalendarList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");

  // const periods = ["2022-05-11", "2022-05-12", "2023-05-13", "2024-05-14"];
  // const range = periods.map((period, i) => {
  //   return {
  //     period: {
  //       color: "#f1f1f1",
  //       textColor: theme.lightColors.grey0,
  //     },
  //   };
  // })

  const periods = ["2022-05-11", "2022-05-12", "2022-05-13", "2022-05-14"];

  const marked = useMemo(() => {
    return {
      [startDate]: {
        startingDay: true,
        color: theme.lightColors.primary,
        textColor: "white",
      },
      // [period]: {
      //   color: "#f1f1f1",
      //   textColor: theme.lightColors.grey0,
      // },
      [endDate]: {
        endingDay: true,
        color: theme.lightColors.primary,
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
        minDate={minDate}
        maxDate={maxDate}
        pastScrollRange={0}
        futureScrollRange={5}
        markingType={"period"}
        theme={{
          textDayHeaderFontFamily: "Exo-Medium",
          textMonthFontFamily: "Exo-SemiBold",
          textDayFontFamily: "Exo-SemiBold",
          textDayFontSize: 14,
          arrowColor: theme.lightColors.primary,
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
