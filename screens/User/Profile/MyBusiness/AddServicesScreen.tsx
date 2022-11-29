import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  Stack,
  InputSelect,
  Header,
  IconButtonDelete,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, usePatch, useGet } from "../../../../hooks";
import { ConfirmModal } from "../../../../components/customized/Modals/ConfirmModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Service } from "../../../../models/service";

const { primary } = theme.lightColors || {};

export const AddServicesScreen = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState<Service | null>(null);
  const { t } = useTranslation();

  const { data: allServices } = useQuery(["allServices"], async () => {
    const { data } = await axios.get(`${process.env.BASE_ENDPOINT}/services`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return data;
  });

  let servicesEndpoint = `/users/${user?._id}/locations/${user?.location}/services`;

  useGet({
    model: "services",
    uri: servicesEndpoint,
    onSuccess: (res) => setServices(res.data),
  });

  const closeModal = () => {
    setVisible(false);
    setService(null);
  };

  const { mutate: addService } = usePatch({
    uri: `/locations/${user?.location}/add-service`,
    onSuccess: (res) => {
      setServices((services) => services.concat(res.data));
      setService(null);
    },
  });

  const { mutate: removeService } = usePatch({
    uri: `/locations/${user?.location}/remove-service`,
    onSuccess: (res) => {
      setServices((services) =>
        services.filter((serv) => serv._id !== res.data._id)
      );
      closeModal();
    },
  });

  const renderService = useCallback(
    ({ item }: ListRenderItemInfo<Service>) => (
      <Stack direction="row" sx={styles.service}>
        <Text style={styles.name}>{item?.name}</Text>
        <IconButtonDelete
          onPress={() => {
            setVisible(true);
            setService(item);
          }}
        />
      </Stack>
    ),
    []
  );
  const keyExtractor = useCallback((item: Service) => item._id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myServices")} divider={true} />
      <Stack align="start" sx={{ margin: 15 }}>
        <Stack direction="row" sx={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            <InputSelect
              value={service}
              placeholder={t("selectService")}
              onValueChange={(value) => setService(value)}
              items={allServices}
            />
          </View>
          <Pressable
            style={!service ? styles.disabledBtn : styles.addIcon}
            onPress={() => addService({ serviceId: service })}
            disabled={!service}
          >
            <Icon
              name="add-outline"
              type="ionicon"
              size={25}
              color={service && "white"}
            />
          </Pressable>
        </Stack>
      </Stack>
      <FlashList
        data={services}
        renderItem={renderService}
        keyExtractor={keyExtractor}
        bounces={false}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={59}
      />
      <ConfirmModal
        onDelete={() => removeService({ serviceId: service?._id })}
        visible={visible}
        onCloseModal={closeModal}
        title={t("deleteService")}
        description={t("deleteServiceDescription")}
      />
    </SafeAreaView>
  );
};

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
