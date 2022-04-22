import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect } from "react";
import Header from "../../../../components/customized/Headers/Header";
import { MainButton, Stack } from "../../../../components/core";
import { Icon } from "react-native-elements";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { Divider } from "react-native-elements/dist/divider/Divider";
import axios from "axios";
import { Colors } from "../../../../assets/styles/Colors";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

const AddServicesScreen = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [service, setService] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const placeholder = {
    label: "Selecteaza un serviciu",
    value: null,
    color: "#9EA0A4",
  };

  useEffect(() => {
    axios
      .get(`http://192.168.100.2:8000/api/v1/services`)
      .then((res) => setServices(res.data.services))
      .catch((err) => console.log(err));
  }, []);

  const addServiceHandler = () => {
    axios
      .patch(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/add-service`,
        { serviceId: service },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then(() => {
        setSelectedServices((selectedServices) =>
          selectedServices.concat(service)
        );
        setService(null);
      })
      .catch(() => setVisible(true));
  };

  const removeServiceHandler = (serviceId) => {
    console.log(serviceId);
  };

  const saveServicesHandler = () => navigation.navigate("Profile");

  return (
    <SafeAreaView style={styles.screen}>
      <Toast visible={visible}>Ceva nu a mers cum trebuie..</Toast>
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
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={placeholder}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setService(value)}
              style={pickerSelectStyles}
              items={services.map((service) => {
                return {
                  label: service?.name,
                  value: service?._id,
                };
              })}
            />
          </View>
          <TouchableOpacity style={styles.addIcon} onPress={addServiceHandler}>
            <Icon name="add-outline" type="ionicon" size={25} color="white" />
          </TouchableOpacity>
        </Stack>
      </Stack>
      <ScrollView
        style={{ marginHorizontal: 15 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {selectedServices.map((service, i) => (
          <Stack direction="row" sx={styles.service} key={i}>
            <Text style={styles.name}>{service?.name}</Text>
            <TouchableOpacity
              onPress={() => removeServiceHandler(service?._id)}
            >
              <Icon name="minuscircleo" type="antdesign" size={22.5} />
            </TouchableOpacity>
          </Stack>
        ))}
        <MainButton title="Salveaza" onPress={saveServicesHandler} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddServicesScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  service: {
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
  },
  addIcon: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  name: { fontFamily: "Exo-Medium" },
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
