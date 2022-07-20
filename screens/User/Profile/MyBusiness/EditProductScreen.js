import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import React, { useState, useCallback, useEffect } from "react";
import { BASE_ENDPOINT } from "@env";
import {
  Feedback,
  Header,
  Stack,
  FormInput,
  FormInputSelect,
  MainButton,
} from "../../../../components/core";
import { useAuth } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";

const EditProductScreen = ({ route }) => {
  const { user } = useAuth();
  const { product } = route.params;
  const { option, duration, price, priceDiscount } = product;
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [options, setOptions] = useState([option]);
  const methods = useForm({
    defaultValues: {
      ...product,
      duration: duration.toString(),
      price: price.toString(),
      discount: priceDiscount.toString(),
      option: option?._id,
    },
  });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("service");
  const { t } = useTranslation();
  const navigation = useNavigation();

  const fetchFilters = useCallback(() => {
    axios
      .get(`${BASE_ENDPOINT}/services/${selectedService}/filters`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setOptions(res.data.filters[0].options))
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  }, [selectedService]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const onSubmit = (data) => {
    const { name, description, price, discount, service, option, duration } =
      data;

    axios
      .patch(
        `${BASE_ENDPOINT}/products/${product?._id}`,
        { name, description, price, discount, service, option, duration },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        navigation.navigate({
          name: "MyProducts",
          params: { product: res.data },
          merge: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={product.name} divider={true} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <Stack sx={styles.container}>
        <FormProvider {...methods}>
          <FormInputSelect
            placeholder={t("selectProductService")}
            name="service"
            items={user?.services}
          />
          <FormInputSelect
            placeholder={t("selectProductCategory")}
            name="option"
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
            title={t("save")}
            onPress={handleSubmit(onSubmit)}
          />
        </FormProvider>
      </Stack>
    </SafeAreaView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    padding: 15,
  },
});
