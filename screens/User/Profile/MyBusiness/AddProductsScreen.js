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
import { useAuth, useHttpGet, useHttpPost, usePost } from "../../../../hooks";
import { required, maxField, minField } from "../../../../constants/validation";
import { MainButton, FormInput, Stack } from "../../../../components/core";
import { Header, Feedback, FormInputSelect } from "../../../../components/core";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
  duration: "",
};

const AddProductsScreen = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();
  const methods = useForm({ defaultValues: { ...defaultValues, service: "" } });
  const { handleSubmit, watch } = methods;
  const selectedService = watch("service");
  const isRequired = required(t);

  const { data: services, loading } = useHttpGet(
    `/locations/${user?.location}/services`
  );

  const { data: filters } = useHttpGet(
    `/services/${selectedService?._id}/filters`
  );

  const filter = filters[0];

  const goBack = (data) =>
    navigation.navigate({
      name: "MyProducts",
      params: { product: data },
      merge: true,
    });

  const { mutate: makePost, isLoading: loadingSubmit } = usePost({
    uri: `/products`,
    onSuccess: () => goBack(),
  });

  const handleCreate = (data) => {
    makePost({
      ...data,
      user: user._id,
      location: user.location,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addProduct")} divider />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      {!loading && (
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
                  items={services}
                  rules={{ ...isRequired }}
                />
                {filter?.options && (
                  <FormInputSelect
                    label={filter.name}
                    name="option"
                    placeholder={filter.name}
                    items={filter.options}
                    rules={{ ...isRequired }}
                  />
                )}
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
              loading={loadingSubmit}
            />
          </Stack>
        </KeyboardAvoidingView>
      )}
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
