import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
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
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useAuth, useCalendarList, useGet, usePost } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { Product } from "../../../../models/product";
import { showToast } from "../../../../utils";
import { required, minField, maxField } from "../../../../constants/validation";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AddSchedule">;
type Options = { id: string; name: string; options: any };

const defaultValues = {
  customer: "",
  serviceId: "",
  option: "",
  product: "",
  price: "",
  discount: "0",
};

export const AddScheduleScreen = ({ route }: IProps) => {
  const { start, end } = route.params;
  const { user } = useAuth();
  const [priceWithDiscount, setPriceWithDiscount] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { DAYS_NAMES } = useCalendarList();
  const isRequired = required(t);

  const methods = useForm({ defaultValues });
  const { handleSubmit, watch, setValue } = methods;
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
    onSuccess: () => navigation.goBack(),
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
        priceWithDiscount,
        discount: data?.discount,
        option: product?.option,
        duration: product?.duration,
      },
      channel: "owner",
    });
  };

  const setPrice = useCallback(
    (event: string) => {
      setValue("product", event);
      products?.results?.map((prod: Product) => {
        if (prod.id === event) {
          setValue("price", prod.price.toString());
          setPriceWithDiscount(prod.price.toString());
        }
      });
    },
    [products]
  );

  const handlePriceWithDiscount = useCallback(
    (event: string) => {
      const newPrice =
        parseInt(priceWithDiscount) -
        (parseInt(event) / 100) * parseInt(priceWithDiscount);
      return newPrice.toString();
    },
    [priceWithDiscount]
  );

  const discountRightIcon = {
    name: "percent",
    type: "feather",
    size: 17.5,
    color: black,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ justifyContent: "space-between", flex: 1 }}
        keyboardVerticalOffset={-5}
      >
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          <Stack>
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
              {t("hour")} {dayjs(start).utc().format("HH:mm")}
            </Text>
          </Stack>
          <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
          <Stack align="start" sx={{ margin: 15 }}>
            <FormProvider {...methods}>
              <FormInput
                name="name"
                placeholder={t("clientName")}
                label={t("client")}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                name="serviceId"
                placeholder={t("chooseService")}
                label={t("service")}
                items={services}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                name="option"
                placeholder={t("chooseCategory")}
                label={t("option")}
                items={options}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                name="product"
                placeholder={t("chooseProduct")}
                label={t("product")}
                items={products?.results}
                onValueChange={(event: string) => setPrice(event)}
                rules={{ ...isRequired }}
              />
              <FormInput
                name="price"
                placeholder={t("productPrice")}
                label={t("price")}
                editable={false}
                rightText="lei"
                rules={{ ...isRequired }}
              />
              <FormInput
                name="discount"
                placeholder={t("discount")}
                label={t("discount")}
                keyboardType="numeric"
                rightIconProps={discountRightIcon}
                maxLength={90}
                onChangeInput={(event: string) => {
                  setValue("discount", event);
                  setValue("price", handlePriceWithDiscount(event));
                }}
                rules={{ ...isRequired }}
              />
            </FormProvider>
          </Stack>
        </ScrollView>
        <Button
          title={t("add")}
          onPress={handleSubmit(handleSchedule)}
          loading={isLoading}
          disabled={isLoading}
          sxBtn={{ marginHorizontal: 15 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    zIndex: 10000,
    height: 50,
    paddingHorizontal: 15,
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
