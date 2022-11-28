import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAuth, useGet, usePost } from "../../../../hooks";
import { required, maxField, minField } from "../../../../constants/validation";
import { Button, FormInput, Stack } from "../../../../components/core";
import { FormInputSelect } from "../../../../components/core";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const defaultValues = {
  service: "",
  option: "",
  name: "",
  description: "",
  price: "",
  discount: "",
  duration: "",
};

export const AddProductsScreen = () => {
  const { user } = useAuth();
  const { location } = user;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const service = watch("service");
  const isRequired = required(t);
  const headerHeight = useHeaderHeight();

  const { data: services, isLoading: loading } = useGet({
    model: "services",
    uri: `/locations/${location}/services`,
    enabled: !!location,
    enableId: location,
  });

  const { data: filters } = useGet({
    model: "filters",
    uri: `/services/${service?._id}/filters`,
    enabled: !!service,
    enableId: service?._id,
  });

  const filtersArr = (filters && filters[0]) || [];

  const goBack = (data) =>
    navigation.navigate({
      name: "MyProducts",
      params: { product: data },
      merge: true,
    });

  const { mutate: makePost, isLoading: loadingSubmit } = usePost({
    uri: `/products`,
    onSuccess: () => navigation.goBack(),
  });

  const handleCreate = (data) => {
    makePost({
      ...data,
      service: service?._id,
      user: user._id,
      location: user.location,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {!loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={headerHeight}
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
                <FormInputSelect
                  label={t("category")}
                  name="option"
                  placeholder={t("category")}
                  items={filtersArr?.options}
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
          <Button
            size="lg"
            radius={10}
            title={t("add")}
            onPress={handleSubmit(handleCreate)}
            loading={loadingSubmit}
            sxBtn={{ margin: 15 }}
          />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
