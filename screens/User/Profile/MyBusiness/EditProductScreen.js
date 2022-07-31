import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth, useHttpGet, useHttpPatch } from "../../../../hooks";
import { required, minField, maxField } from "../../../../constants/validation";
import {
  Feedback,
  Header,
  Stack,
  FormInput,
  FormInputSelect,
  MainButton,
} from "../../../../components/core";

const EditProductScreen = ({ route }) => {
  const { user } = useAuth();
  const { product } = route.params;
  const { option, duration, price, priceDiscount, service } = product;
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [options, setOptions] = useState([option]);
  const methods = useForm({
    defaultValues: {
      ...product,
      duration: duration.toString(),
      price: price.toString(),
      discount: priceDiscount.toString(),
      option: option?._id,
      service: service?._id,
    },
  });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("service");
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isRequired = required(t);

  useHttpGet(`/services/${selectedService}`, (data) =>
    setOptions(data.service.filters[0].options)
  );

  const goBack = (data) =>
    navigation.navigate({
      name: "MyProducts",
      params: { product: data },
      merge: true,
    });
  const { makePatch, loading } = useHttpPatch(
    `/products/${product?._id}`,
    goBack
  );

  const handleEdit = (data) => makePatch(data);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={product.name} divider={true} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack align="start" sx={styles.container}>
            <FormProvider {...methods}>
              <FormInputSelect
                label={t("service")}
                placeholder={t("selectProductService")}
                name="service"
                items={user?.services}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                label={t("category")}
                placeholder={t("selectProductCategory")}
                name="option"
                items={options}
                rules={{ ...isRequired }}
              />
              <FormInput
                label={t("name")}
                name="name"
                placeholder={t("name")}
                rules={{ ...isRequired, ...maxField(30), ...minField(3) }}
                maxLength={30}
              />
              <FormInput
                label={t("description")}
                name="description"
                placeholder={t("description")}
                rules={{ ...isRequired, ...maxField(300), ...minField(10) }}
                maxLength={300}
              />
              <FormInput
                label={`${t("duration")} (${t("minutes")})`}
                name="duration"
                placeholder={t("duration")}
                keyboardType="numeric"
                rules={{ ...isRequired }}
              />
              <FormInput
                label={`${t("price")} (RON)`}
                name="price"
                placeholder={t("price")}
                keyboardType="numeric"
                rules={{ ...isRequired }}
              />
              <FormInput
                label={`${t("discount")} (%)`}
                name="discount"
                placeholder={t("discount")}
                keyboardType="numeric"
                rules={{ ...isRequired }}
              />
            </FormProvider>
          </Stack>
        </ScrollView>
        <Stack sx={styles.btnContainer}>
          <MainButton
            size="lg"
            radius={10}
            fullWidth
            title={t("save")}
            onPress={handleSubmit(handleEdit)}
            loading={loading}
          />
        </Stack>
      </KeyboardAvoidingView>
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
  btnContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
