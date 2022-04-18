import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../assets/styles/Colors";
import BottomSheetFilter from "../components/customized/BottomSheets/BottomSheetFilter";
import FilterDate from "../components/customized/Filters/FilterDate";

const FiltersDateScreen = (props) => {
  const { serviceId, serviceName } = props.route.params;
  const [disabled, setDisabled] = useState(false);
  const [active, setActive] = useState(true);
  const navigation = useNavigation();

  const goNext = () => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/services/${serviceId}/filters`)
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
      sheetSecondTitle="Acum - 23 apr"
      bottomSheetBody={<FilterDate />}
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
    borderColor: Colors.primary,
  },
  buttonText: { color: Colors.textDark, fontFamily: "Exo-Medium" },
});
