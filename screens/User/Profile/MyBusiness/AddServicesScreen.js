import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  Stack,
  InputSelect,
  Header,
  Feedback,
  Button,
  IconButtonDelete,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useHttpGet } from "../../../../hooks";
import { ConfirmModal } from "../../../../components/customized/Modals/ConfirmModal";

const AddServicesScreen = () => {
  const { user, setUser } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [visible, setVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState(user?.services);
  const [service, setService] = useState(null);
  const { t } = useTranslation();

  const { data: services } = useHttpGet(`/services`);

  const closeModal = () => {
    setVisible(false);
    setService(null);
  };

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
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/services/add-service`,
        { serviceId: service },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        const newService = res.data.filter((serv) => serv._id === service);
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
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/services/remove-service`,
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
        closeModal();

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
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            {services && (
              <InputSelect
                value={service}
                placeholder={t("selectService")}
                onValueChange={(value) => setService(value)}
                items={services}
              />
            )}
          </View>
          <Button
            sx={!service ? styles.disabledBtn : styles.addIcon}
            onPress={addServiceHandler}
            disabled={!service}
          >
            <Icon
              name="add-outline"
              type="ionicon"
              size={25}
              color={service && "white"}
            />
          </Button>
        </Stack>
      </Stack>
      <ScrollView
        style={{ marginHorizontal: 15 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {selectedServices?.map((service, i) => (
          <Stack direction="row" sx={styles.service} key={i}>
            <Text style={styles.name}>{service?.name}</Text>
            <IconButtonDelete
              onPress={() => {
                setVisible(true);
                setService(service);
              }}
            />
          </Stack>
        ))}
      </ScrollView>
      <ConfirmModal
        onDelete={() => removeServiceHandler(service?._id)}
        visible={visible}
        onCloseModal={closeModal}
        title={t("deleteService")}
        description={t("deleteServiceDescription")}
      />
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
