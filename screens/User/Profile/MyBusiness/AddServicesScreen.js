import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
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
import { useAuth, useHttpGet, useHttpPatch } from "../../../../hooks";
import { ConfirmModal } from "../../../../components/customized/Modals/ConfirmModal";

const AddServicesScreen = () => {
  const { user, setUser } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [visible, setVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState(user?.services);
  const [service, setService] = useState(null);
  const { t } = useTranslation();
  const ENDPOINT = `/users/${user?._id}/services`;

  const { data: services } = useHttpGet(`/services`);

  const closeModal = () => {
    setVisible(false);
    setService(null);
  };

  const handleUpdateAfterAdd = (data) => {
    const newService = data.filter((serv) => serv._id === service);
    setSelectedServices((selectedServices) =>
      selectedServices.concat(newService)
    );
    setUser({ ...user, services: user.services.concat(newService) });
    setService(null);
    setFeedback({
      visible: true,
      message: t("serviceAddedMessage"),
    });
  };
  const { makePatch: makePatchAdd } = useHttpPatch(
    `${ENDPOINT}/add-service`,
    handleUpdateAfterAdd
  );

  const addServiceHandler = () => {
    if (selectedServices.filter((el) => el._id === service).length > 0) {
      setFeedback({
        visible: true,
        message: t("alreadyServiceAdded"),
      });
      return;
    }

    makePatchAdd({ serviceId: service });
  };

  const handleUpdateAfterRemove = () => {
    setSelectedServices((selServ) =>
      selServ.filter((serv) => serv._id !== service._id)
    );
    setUser({
      ...user,
      services: user.services.filter((serv) => serv._id !== service._id),
    });
    setService(null);
    closeModal();

    setFeedback({
      visible: true,
      message: t("serviceRemovedMessage"),
    });
  };
  const { makePatch: makePatchRemove } = useHttpPatch(
    `${ENDPOINT}/remove-service`,
    handleUpdateAfterRemove
  );

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
        onDelete={() => makePatchRemove({ serviceId: service?._id })}
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
