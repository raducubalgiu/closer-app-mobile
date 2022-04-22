import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import Header from "../../../../components/customized/Headers/Header";
import { MainButton, Stack } from "../../../../components/core";
import { FlatList } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { Divider } from "react-native-elements/dist/divider/Divider";

const DUMMY_SERVICES = [
  {
    _id: "1",
    name: "Tuns",
  },
  {
    _id: "2",
    name: "Pensat",
  },
  {
    _id: "3",
    name: "Unghii",
  },
];

const AddServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);

  const placeholder = {
    label: "Selecteaza un serviciu",
    value: null,
    color: "#9EA0A4",
  };

  const addServiceHandler = () => {
    setServices((services) => services.concat(service));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga serviciile"
        withTooltip={true}
        tooltipText="Serviciile de mai jos disponibile vor fi afisate in functie de domeniul tau de activitate"
        tooltipContainer={{ width: 230, height: 80 }}
      />
      <Divider color="#ddd" />
      <Stack align="start" sx={{ margin: 15 }}>
        <TooltipTitle
          title="Servicii"
          sx={{ marginBottom: 25 }}
          tooltipText="Selecteaza din lista de mai jos serviicile pe care le desfasori la locatie"
          tooltipDimensions={{ width: 220, height: 80 }}
        />
        <RNPickerSelect
          placeholder={placeholder}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => setService(value)}
          style={pickerSelectStyles}
          items={DUMMY_SERVICES.map((service) => {
            return {
              label: service?.name,
              value: service?._id,
            };
          })}
        />
        <MainButton
          title="Adauga"
          sx={{ marginTop: 15 }}
          onPress={addServiceHandler}
        />
        <FlatList
          bounces={false}
          data={services}
          keyExtractor={(item) => item._id}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <Stack
              direction="row"
              sx={{
                marginTop: 15,
                backgroundColor: "#f1f1f1",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: "Exo-Medium" }}>{item?.name}</Text>
              <TouchableOpacity>
                <Icon name="closecircleo" type="antdesign" size={22.5} />
              </TouchableOpacity>
            </Stack>
          )}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default AddServicesScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    fontFamily: "Exo-Medium",
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: "Exo-Medium",
  },
});
