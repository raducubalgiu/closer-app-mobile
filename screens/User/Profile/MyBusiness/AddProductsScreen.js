import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks";
import {
  MainButton,
  FormInput,
  Stack,
  Header,
  Feedback,
  FormInputSelect,
} from "../../../../components/core";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { BASE_ENDPOINT } from "@env";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
  duration: "",
};

const AddProductsScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [disabled, setDisabled] = useState(true);
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("service");

  useEffect(() => {
    if (selectedService) {
      axios
        .get(`${BASE_ENDPOINT}/services/${selectedService}`)
        .then((res) => {
          const { options } = res.data.service.filters[0];
          setOptions(options);
        })
        .catch(() =>
          setFeedback({ visible: true, message: t("somethingWentWrong") })
        );
    }
  }, [selectedService]);

  const onSubmit = (data) => {
    const { description, price, discount, name, duration, service, option } =
      data;

    axios
      .post(
        `${BASE_ENDPOINT}/users/${user?._id}/products`,
        { name, description, price, discount, service, option, duration },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        const { product } = res.data;
        navigation.navigate({
          name: "MyProducts",
          params: { product },
          merge: true,
        });
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addProduct")} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
        <Stack align="start" sx={{ margin: 15 }}>
          <TooltipTitle title={t("products")} sx={{ marginBottom: 15 }} />
          <FormProvider {...methods}>
            <FormInputSelect
              name="service"
              placeholder={t("selectProductService")}
              items={user?.services}
            />
            <FormInputSelect
              name="option"
              placeholder={t("selectProductCategory")}
              items={options}
            />
            <FormInput name="name" placeholder={t("name")} />
            <FormInput name="description" placeholder={t("description")} />
            <FormInput
              name="duration"
              placeholder={t("duration")}
              keyboardType="numeric"
            />
            <FormInput
              name="price"
              placeholder={t("price")}
              keyboardType="numeric"
            />
            <FormInput
              name="discount"
              placeholder={t("discount")}
              keyboardType="numeric"
            />
            <MainButton
              size="lg"
              radius={10}
              fullWidth
              title={t("add")}
              onPress={handleSubmit(onSubmit)}
              //disabled={disabled}
            />
          </FormProvider>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
