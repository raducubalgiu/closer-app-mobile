import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../assets/styles/Colors";

const FilterDate = () => {
  const [calendar, setCalendar] = useState(true);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
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
        </View>
      </View>
      {calendar && <Text>Calendar</Text>}
      {!calendar && <Text>Dupa ora 18:00</Text>}
    </>
  );
};

export default FilterDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
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
