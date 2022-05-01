import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  MainButton,
  Stack,
  InputSelect,
  Header,
} from "../../../../components/core";
import { Icon } from "@rneui/themed";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import axios from "axios";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const AddServicesScreen = () => {
  const { user, setUser } = useAuth();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(user?.services);
  const [service, setService] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services`)
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
      .then((res) => {
        const servicesBackend = res.data.user.services;
        const newService = servicesBackend.filter(
          (services) => services._id === service
        );
        setSelectedServices((selectedServices) =>
          selectedServices.concat(newService)
        );
        setUser({ ...user, services: user.services.concat(newService) });
        setService(null);
      })
      .catch((err) => console.log(err));
  };

  const removeServiceHandler = (serviceId) => {
    axios
      .patch(
        `http://192.168.100.2:8000/api/v1/users/${user?._id}/remove-service`,
        { serviceId },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then(() => {
        setSelectedServices((selectedServices) =>
          selectedServices.filter((service) => service._id !== serviceId)
        );
        setUser({
          ...user,
          services: user.services.filter(
            (services) => services._id !== serviceId
          ),
        });
        setService(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedServices.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedServices]);

  const saveServicesHandler = () => navigation.navigate("Profile");

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga serviciile"
        withTooltip={true}
        tooltipText="Serviciile de mai jos disponibile vor fi afisate in functie de domeniul tau de activitate"
        tooltipContainer={{ width: 230, height: 80 }}
        divider={true}
      />
      <Stack align="start" sx={{ margin: 15 }}>
        <TooltipTitle
          title="Servicii"
          sx={{ marginBottom: 25 }}
          tooltipText="Selecteaza din lista de mai jos serviicile pe care le desfasori la locatie"
          tooltipDimensions={{ width: 220, height: 80 }}
        />
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            <InputSelect
              value={service}
              placeholder="Selecteaza un serviciu"
              onValueChange={(value) => setService(value)}
              items={services}
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
              <Icon
                name="minuscircleo"
                type="antdesign"
                size={22.5}
                color={theme.lightColors.black}
              />
            </TouchableOpacity>
          </Stack>
        ))}
        <MainButton
          title="Salveaza"
          onPress={saveServicesHandler}
          disabled={disabled}
        />
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
    borderColor: theme.lightColors.primary,
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: theme.lightColors.primary,
  },
  name: { fontFamily: "Exo-Medium" },
});
