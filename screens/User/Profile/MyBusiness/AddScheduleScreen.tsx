import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import { first } from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  FormInput,
  FormInputSelect,
  IconButton,
  Stack,
} from "../../../../components/core";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";
import { useAuth, useCalendarList, useGet, usePost } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { Product } from "../../../../models/product";
import { showToast } from "../../../../utils";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AddSchedule">;
type Options = { id: string; name: string; options: any };

export const AddScheduleScreen = ({ route }: IProps) => {
  const { start, end, index } = route.params;
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { DAYS_NAMES } = useCalendarList();

  const methods = useForm({
    defaultValues: {
      customer: "",
      serviceId: "",
      option: "",
      product: "",
      price: 130,
      discount: 0,
    },
  });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("serviceId");
  const selectedOption = watch("option");

  const { data: services } = useGet({
    model: "services",
    uri: `/locations/${user?.locationId}/services`,
    others: { staleTime: 600000 },
  });

  const { data: filters } = useGet({
    model: "filters",
    uri: `/services/${selectedService}/filters`,
    enabled: !!selectedService,
    enableId: selectedService,
    others: { staleTime: 600000 },
  });

  const { data: products } = useGet({
    model: "products",
    uri: `/users/${user?.id}/services/${selectedService}/products?option=${selectedOption}`,
    enabled: !!selectedOption,
    enableId: selectedOption,
  });

  const { mutate, isLoading } = usePost({
    uri: `/schedules`,
    onSuccess: () =>
      navigation.navigate({
        name: "MyCalendar",
        params: { initialIndex: index },
        merge: true,
      }),
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const options = first<Options>(filters)?.options;

  const handleSchedule = (data: any) => {
    const product = products?.results?.find(
      (pr: Product) => pr.id === data.product
    );

    mutate({
      start,
      end,
      ownerId: user?.id,
      customerId: {
        name: data.name,
      },
      serviceId: selectedService,
      locationId: user?.locationId,
      product: {
        id: product?.id,
        name: product?.name,
        description: product?.description,
        price: product?.price,
        option: product?.option,
        duration: product?.duration,
      },
      channel: "owner",
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={styles.header}>
        <IconButton name="close" type="antdesign" color="white" />
        <Text style={styles.title}>{t("addSchedule")}</Text>
        <IconButton
          name="close"
          type="antdesign"
          onPress={() => navigation.goBack()}
        />
      </Stack>
      <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
      <ScrollView>
        <Stack sx={{ margin: 25 }}>
          <Icon
            name="calendar-clock-outline"
            type="material-community"
            size={60}
            color="#ddd"
          />
          <Text style={styles.date}>
            {DAYS_NAMES[dayjs(start).utc().day()]},{" "}
            {dayjs(start).utc().format("D MMMM YY")}
          </Text>
          <Text style={styles.hour}>
            Ora {dayjs(start).utc().format("HH:mm")}
          </Text>
        </Stack>
        <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
        <Stack align="start" sx={{ margin: 15 }}>
          <FormProvider {...methods}>
            <FormInput
              name="name"
              placeholder="Numele clientului"
              label="Client"
            />
            <FormInputSelect
              name="serviceId"
              placeholder="Alege serviciul"
              label="Serviciu"
              items={services}
            />
            <FormInputSelect
              name="option"
              placeholder="Alege categoria"
              label={t("option")}
              items={options}
            />
            <FormInputSelect
              name="product"
              placeholder="Alege produsul"
              label="Produs"
              items={products?.results}
            />
            <FormInput
              name="price"
              placeholder="Pretul produsului"
              label={t("price")}
              editable={false}
            />
            <FormInput
              name="discount"
              placeholder={t("discount")}
              label={t("discount")}
              keyboardType="numeric"
            />
          </FormProvider>
        </Stack>
      </ScrollView>
      <Stack sx={styles.buttonContainer}>
        <Button
          title={t("add")}
          sxBtn={{ width: "100%" }}
          onPress={handleSubmit(handleSchedule)}
          loading={isLoading}
          disabled={isLoading}
        />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    zIndex: 10000,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: black,
  },
  date: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 2.5,
    color: black,
  },
  hour: { color: grey0, fontSize: 15 },
  buttonContainer: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
