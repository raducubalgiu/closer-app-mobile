import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  Stack,
  Header,
  IconButtonDelete,
  FormInputSelect,
} from "../../../../components/core";
import {
  ConfirmModal,
  NoFoundMessage,
} from "../../../../components/customized";
import theme from "../../../../../assets/styles/theme";
import { useAuth, usePatch, useGet } from "../../../../hooks";
import { Service } from "../../../../ts";
import { FormProvider, useForm } from "react-hook-form";
import { showToast } from "../../../../utils";

const { primary, error } = theme.lightColors || {};

export const AddServicesScreen = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("common");
  const methods = useForm({ defaultValues: { serviceId: "" } });
  const { handleSubmit, watch, setValue } = methods;
  const serviceId = watch("serviceId");

  const { data: allServices } = useGet<any>({
    model: "allServices",
    uri: "/services",
  });

  const { isLoading: isLoadingServices } = useGet<Service[]>({
    model: "services",
    uri: `/users/${user?.id}/locations/${user?.locationId}/services`,
    options: {
      onSuccess: (res) => res.data && setServices(res.data),
    },
  });

  const { mutate: addService, isLoading: isLoadingAdd } = usePatch({
    uri: `/locations/${user?.locationId}/add-service`,
    onSuccess: (res) => setServices((services) => services.concat(res.data)),
    onError: (err) =>
      showToast({ message: t(`${err.response.data.message}`), bgColor: error }),
  });

  const { mutate: removeService, isLoading: isLoadingRemove } = usePatch({
    uri: `/locations/${user?.locationId}/remove-service`,
    onSuccess: (res) => {
      setServices((services) =>
        services.filter((serv: Service) => serv.id !== res.data.id)
      );
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const closeModal = () => setVisible(false);

  const handleCreate = (data: any) => {
    addService({ serviceId: data.serviceId });
    setValue("serviceId", "");
  };

  const handleDelete = () => {
    removeService({ serviceId });
    setValue("serviceId", "");
    closeModal();
  };

  const renderService = useCallback(
    ({ item }: ListRenderItemInfo<Service>) => (
      <Stack direction="row" sx={styles.service}>
        <Text style={styles.name}>{item?.name}</Text>
        <IconButtonDelete
          disabled={isLoadingRemove}
          isLoading={isLoadingRemove}
          onPress={() => {
            setVisible(true);
            setValue("serviceId", item.id);
          }}
        />
      </Stack>
    ),
    [isLoadingRemove]
  );

  const keyExtractor = useCallback((item: Service) => item.id, []);

  let footer;
  if (isLoadingAdd || isLoadingServices) {
    footer = <ActivityIndicator style={{ marginTop: 15 }} />;
  }

  let header;
  if (services.length === 0 && !isLoadingAdd && !isLoadingRemove) {
    header = (
      <NoFoundMessage
        title={t("noFoundServices")}
        description={t("noFoundServicesDescription")}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myServices")} divider={true} />
      <Stack align="start" sx={{ marginHorizontal: 15, marginTop: 15 }}>
        <FormProvider {...methods}>
          <Stack direction="row" sx={{ width: "100%" }}>
            <View style={{ flex: 1 }}>
              <FormInputSelect
                name="serviceId"
                placeholder={t("selectService")}
                items={allServices}
              />
            </View>
            <Pressable
              style={!serviceId ? styles.disabledBtn : styles.addIcon}
              onPress={handleSubmit(handleCreate)}
              disabled={!serviceId}
            >
              <Icon
                name="add-outline"
                type="ionicon"
                size={25}
                color={serviceId ? "white" : ""}
              />
            </Pressable>
          </Stack>
        </FormProvider>
      </Stack>
      <FlatList
        ListHeaderComponent={header}
        data={services}
        renderItem={renderService}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer}
      />
      <ConfirmModal
        title={t("deleteService")}
        description={t("deleteServiceDescription")}
        visible={visible}
        onClose={() => setVisible(false)}
        onAction={handleDelete}
        action={t("delete")}
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
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  addIcon: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: primary,
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: primary,
    marginBottom: 10,
  },
  disabledBtn: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  name: { fontWeight: "500" },
});
