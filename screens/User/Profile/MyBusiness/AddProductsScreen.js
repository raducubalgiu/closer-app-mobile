import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
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
import { BASE_ENDPOINT } from "@env";
import {
  required,
  maxField,
  minField,
} from "../../../../constants/validation-rules";

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
  const isRequired = required(t);

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
        navigation.navigate({
          name: "MyProducts",
          params: { product: res.data },
          merge: true,
        });
      })
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

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
                label="Serviciu"
                name="service"
                placeholder={t("selectProductService")}
                items={user?.services}
                rules={{ ...isRequired }}
              />
              <FormInputSelect
                label="Categorie"
                name="option"
                placeholder={t("selectProductCategory")}
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
                label={t("duration")}
                name="duration"
                placeholder={t("duration")}
                keyboardType="numeric"
                rules={{ ...isRequired }}
              />
              <FormInput
                label={t("price")}
                name="price"
                placeholder={t("price")}
                keyboardType="numeric"
                rules={{ ...isRequired }}
              />
              <FormInput
                label={t("discount")}
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
            onPress={handleSubmit(onSubmit)}
            //disabled={disabled}
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
