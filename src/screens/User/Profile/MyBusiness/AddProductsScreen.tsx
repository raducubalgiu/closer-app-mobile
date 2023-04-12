import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useAuth, useGet, usePost } from "../../../../hooks";
import { required, maxField, minField } from "../../../../utils/validation";
import { Button, FormInput, Header, Stack } from "../../../../components/core";
import { FormInputSelect } from "../../../../components/core";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultValues = {
  serviceId: "",
  optionId: "",
  name: "",
  description: "",
  price: "",
  discount: "",
  duration: "",
};

export const AddProductsScreen = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const serviceId: any = watch("serviceId");
  const isRequired = required(t);
  const insets = useSafeAreaInsets();

  const { data: services, isLoading } = useGet({
    model: "services",
    uri: `/locations/${user?.locationId}/services`,
    enableId: user?.locationId,
    options: {
      enabled: !!user?.locationId,
    },
  });

  const { data: filters } = useGet({
    model: "filters",
    uri: `/services/${serviceId}/filters`,
    enableId: serviceId,
    options: {
      enabled: !!serviceId,
    },
  });

  const filtersArr = (filters && filters[0]) || [];

  const goBack = (data: any) =>
    navigation.navigate({
      name: "MyProducts",
      params: { product: data },
      merge: true,
    });

  const { mutate: makePost, isLoading: loadingSubmit } = usePost({
    uri: `/products`,
    onSuccess: () => navigation.goBack(),
  });

  const handlePriceDiscount = (discount: any, price: any) => {
    if (discount > 0) {
      return price - (discount / 100) * price;
    } else {
      return 0;
    }
  };

  const handleCreate = (data: any) => {
    const { price, discount, optionId } = data;
    const option = filtersArr.options.find((el: any) => el.id === optionId);

    makePost({
      ...data,
      serviceId,
      ownerId: user?.id,
      locationId: user?.locationId,
      discount,
      price,
      priceWithDiscount: handlePriceDiscount(discount, price),
      option,
    });
  };

  return (
    <View style={styles.screen}>
      <Header title={t("addProduct")} sx={{ paddingTop: insets.top }} divider />
      {!isLoading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={insets.top}
        >
          <ScrollView>
            <Stack align="start" sx={{ margin: 15 }}>
              <FormProvider {...methods}>
                <FormInputSelect
                  label={t("service")}
                  name="serviceId"
                  placeholder={t("selectProductService")}
                  items={services}
                  rules={{ ...isRequired }}
                />
                <FormInputSelect
                  label={t("category")}
                  name="optionId"
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
            radius={5}
            title={t("add")}
            onPress={handleSubmit(handleCreate)}
            loading={loadingSubmit}
            sxBtn={{ margin: 15 }}
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
