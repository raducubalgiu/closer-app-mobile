import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAuth, useHttpGet, useHttpPost } from "../../../../hooks";
import { required, maxField, minField } from "../../../../constants/validation";
import { MainButton, FormInput, Stack } from "../../../../components/core";
import { Header, Feedback, FormInputSelect } from "../../../../components/core";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: 0,
  duration: "",
};

const AddProductsScreen = () => {
  const { user } = useAuth();
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: { ...defaultValues, service: user?.services[0]?._id },
  });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("service");
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
  const { makePost, loading } = useHttpPost(
    `/users/${user?._id}/products`,
    goBack
  );
  const handleCreate = (data) => makePost(data);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addProduct")} divider />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={true}>
          <Stack align="start" sx={{ margin: 15 }}>
            <FormProvider {...methods}>
              <FormInputSelect
                label={t("service")}
                name="service"
                placeholder={t("selectProductService")}
                items={user?.services}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                label={t("category")}
                name="option"
                placeholder={t("selectProductCategory")}
                items={options}
                rules={{ ...isRequired }}
              />
              <FormInput
                label={t("name")}
                name="name"
                placeholder={t("nameOfProduct")}
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
            title={t("add")}
            onPress={handleSubmit(handleCreate)}
            loading={loading}
          />
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  btnContainer: {
    marginHorizontal: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
