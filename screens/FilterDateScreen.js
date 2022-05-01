import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import theme from "../assets/styles/theme";
import BottomSheetFilter from "../components/customized/BottomSheets/BottomSheetFilter";
import FilterDate from "../components/customized/Filters/FilterDate";

const FiltersDateScreen = (props) => {
  const { serviceId, serviceName } = props.route.params;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(true);
  const navigation = useNavigation();

  const handleDate = (day) => {
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
  };

  const goNext = () => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}/filters`)
      .then((res) => {
        if (res.data.filters.length === 0) {
          navigation.navigate("Services", { serviceId, serviceName });
        } else {
          navigation.navigate("FiltersService", {
            serviceId,
            serviceName,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <BottomSheetFilter
      screenFirstTitle="Selecteaza"
      screenSecondTitle="perioada"
      sheetFirstTitle={serviceName}
      sheetSecondTitle="23 mai - 30 iunie"
      bottomSheetBody={
        <FilterDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleDate={handleDate}
        />
      }
      mainButtonText="Inainte"
      disabled={disabled}
      onGoBack={() => navigation.goBack()}
      onGoNext={goNext}
      footerButtons={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={
              active
                ? { ...styles.button, ...styles.buttonActive }
                : styles.button
            }
          >
            <Text style={styles.buttonText}>Orice ora</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              active
                ? { ...styles.button, ...styles.buttonActive }
                : styles.button
            }
          >
            <Text style={styles.buttonText}>Alege ora</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default FiltersDateScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 12.5,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: 20,
    borderRadius: 20,
  },
  buttonActive: {
    borderColor: theme.lightColors.primary,
  },
  buttonText: { color: theme.lightColors.black, fontFamily: "Exo-Medium" },
});
