import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Stack,
  InputSelect,
  Header,
  Feedback,
  Button,
} from "../../../../components/core";
import { Icon } from "@rneui/themed";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import axios from "axios";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import { useTranslation } from "react-i18next";

const AddServicesScreen = () => {
  const { user, setUser } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(user?.services);
  const [service, setService] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setServices(res.data.services))
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrongLater") })
      );
  }, []);

  const addServiceHandler = () => {
    if (selectedServices.filter((el) => el._id === service).length > 0) {
      setFeedback({
        visible: true,
        message: t("alreadyServiceAdded"),
      });
      return;
    }

    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/add-service`,
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
        setFeedback({
          visible: true,
          message: t("serviceAddedMessage"),
        });
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  const removeServiceHandler = (serviceId) => {
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/remove-service`,
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
        setFeedback({
          visible: true,
          message: t("serviceRemovedMessage"),
        });
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myServices")} divider={true} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <Stack align="start" sx={{ margin: 15 }}>
        <TooltipTitle
          title={t("services")}
          sx={{ marginBottom: 25 }}
          tooltipText="Selecteaza din lista de mai jos serviicile pe care le desfasori la locatie"
          tooltipDimensions={{ width: 220, height: 80 }}
        />
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            <InputSelect
              value={service}
              placeholder={t("selectService")}
              onValueChange={(value) => setService(value)}
              items={services}
            />
          </View>
          <Button
            sx={!service ? styles.disabledBtn : styles.addIcon}
            onPress={addServiceHandler}
            disabled={!service}
          >
            <Icon name="add-outline" type="ionicon" size={25} />
          </Button>
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
            <Button onPress={() => removeServiceHandler(service?._id)}>
              <Icon
                name="minuscircleo"
                type="antdesign"
                size={22.5}
                color={theme.lightColors.black}
              />
            </Button>
          </Stack>
        ))}
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
  disabledBtn: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  name: { fontFamily: "Exo-Medium" },
});
