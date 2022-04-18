import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
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

const FilterDate = () => {
  const [calendar, setCalendar] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDate = (day) => {
    if (startDate !== "") {
      setEndDate(day.dateString);
    } else {
      setStartDate(day.dateString);
    }
  };

  let date;
  date = new Date();
  console.log("NEW DATE", date);

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
          onDayPress={(day) => handleDate(day)}
          disableArrowLeft={true}
          hideExtraDays={true}
          pastScrollRange={0}
          futureScrollRange={2}
          scrollEnabled={true}
          firstDay={1}
          minDate={"2022-04-17"}
          maxDate={"2022-06-30"}
          markingType={"period"}
          theme={{
            textDayHeaderFontFamily: "Exo-Medium",
            textMonthFontFamily: "Exo-SemiBold",
            textDayFontFamily: "Exo-Medium",
            textDayFontSize: 14,
            arrowColor: Colors.primary,
            disabledArrowColor: "#f1f1f1",
          }}
          markedDates={{
            "2022-04-17": {
              startingDay: true,
              color: Colors.primary,
              textColor: "white",
            },
            "2022-04-18": { color: "#f1f1f1", textColor: Colors.textDark },
            "2022-04-19": {
              color: "#f1f1f1",
              textColor: Colors.textDark,
            },
            "2022-04-20": {
              endingDay: true,
              color: Colors.primary,
              textColor: "white",
            },
          }}
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
    color: Colors.textDark,
    fontSize: 13,
  },
  buttonTextActive: { fontFamily: "Exo-SemiBold", fontSize: 13.5 },
});
