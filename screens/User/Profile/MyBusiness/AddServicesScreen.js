import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  Stack,
  InputSelect,
  Header,
  Button,
  IconButtonDelete,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useHttpGet, useHttpPatch } from "../../../../hooks";
import { ConfirmModal } from "../../../../components/customized/Modals/ConfirmModal";

const { primary } = theme.lightColors;

const AddServicesScreen = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const { t } = useTranslation();

  const { data: allServices } = useHttpGet(`/services`);

  useHttpGet(
    `/users/${user?._id}/locations/${user?.location}/services`,
    (res) => setServices(res)
  );

  const closeModal = () => {
    setVisible(false);
    setService(null);
  };

  const handleAfterAdd = (res) => {
    setServices((services) => services.concat(res));
    setService(null);
  };

  const handleAfterRemove = (res) => {
    setServices((services) => services.filter((serv) => serv._id !== res._id));
    closeModal();
  };

  const { makePatch: makePatchAdd } = useHttpPatch(
    `/locations/${user?.location}/add-service`,
    handleAfterAdd
  );

  const { makePatch: makePatchRemove } = useHttpPatch(
    `/locations/${user?.location}/remove-service`,
    handleAfterRemove
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myServices")} divider={true} />
      <Stack align="start" sx={{ margin: 15 }}>
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            {allServices && (
              <InputSelect
                value={service}
                placeholder={t("selectService")}
                onValueChange={(value) => setService(value)}
                items={allServices}
              />
            )}
          </View>
          <Button
            sx={!service ? styles.disabledBtn : styles.addIcon}
            onPress={() => makePatchAdd({ serviceId: service })}
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
        {services?.map((service, i) => (
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
    borderColor: primary,
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: primary,
  },
  disabledBtn: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  name: { fontWeight: "500" },
});
