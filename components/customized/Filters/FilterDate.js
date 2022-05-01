import { useState, useMemo } from "react";
import moment from "moment";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

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

const FilterDate = (props) => {
  const [calendar, setCalendar] = useState(true);
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(90, "days").format("YYYY-MM-DD");

  const marked = useMemo(() => {
    return {
      [props.startDate]: {
        startingDay: true,
        color: theme.lightColors.primary,
        textColor: "white",
      },
      [props.endDate]: {
        endingDay: true,
        color: theme.lightColors.primary,
        textColor: "white",
      },
    };
  }, [props.startDate, props.endDate]);

  return (
    <View style={{ flex: 1 }}>
      <Stack direction="row" justify="center" sx={styles.container}>
        <Stack direction="row" justify="start" sx={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCalendar((calendar) => !calendar)}
            style={
              calendar ? { ...styles.button, ...styles.active } : styles.button
            }
          >
            <Text
              style={
                calendar
                  ? { ...styles.buttonText, ...styles.buttonTextActive }
                  : styles.buttonText
              }
            >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCalendar((calendar) => !calendar)}
            style={
              !calendar ? { ...styles.button, ...styles.active } : styles.button
            }
          >
            <Text
              style={
                !calendar
                  ? { ...styles.buttonText, ...styles.buttonTextActive }
                  : styles.buttonText
              }
            >
              Oricand dupa 18:00
            </Text>
          </TouchableOpacity>
        </Stack>
      </Stack>

      {calendar && (
        <Calendar
          onDayPress={(day) => props.handleDate(day)}
          disableArrowLeft={false}
          disableArrowRight={false}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          minDate={minDate}
          maxDate={maxDate}
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
        />
      )}
      {!calendar && <Text>Dupa ora 18:00</Text>}
    </View>
  );
};

export default FilterDate;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonsContainer: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 20,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  active: { backgroundColor: "white" },
  buttonText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 13,
  },
  buttonTextActive: { fontFamily: "Exo-SemiBold", fontSize: 13.5 },
});
