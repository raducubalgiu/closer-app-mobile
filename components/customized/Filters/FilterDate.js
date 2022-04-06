import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { Stack } from "../../core";

const FilterDate = () => {
  const [calendar, setCalendar] = useState(true);

  return (
    <>
      <Stack direction="row" justify="center" sx={styles.container}>
        <Stack direction="row" justify="start" sx={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCalendar((calendar) => !calendar)}
            style={
              calendar ? { ...styles.button, ...styles.active } : styles.button
            }
          >
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCalendar((calendar) => !calendar)}
            style={
              !calendar ? { ...styles.button, ...styles.active } : styles.button
            }
          >
            <Text style={styles.buttonText}>Oricand dupa 18:00</Text>
          </TouchableOpacity>
        </Stack>
      </Stack>
      {calendar && <Text>Calendar</Text>}
      {!calendar && <Text>Dupa ora 18:00</Text>}
    </>
  );
};

export default FilterDate;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonsContainer: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 20,
  },
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    fontSize: 13.5,
  },
  active: { backgroundColor: "white" },
});
