import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useForm } from "react-hook-form";
import { FormTextField, Header, Stack } from "../../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../../navigation/rootStackParams";

const { grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AccountInfo">;

export const AccountInfoScreen = ({ route }: IProps) => {
  const { email, phone, gender } = route.params || {};
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: { email, phone, gender: t(`${gender}`) },
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToAccountEmail = () => navigation.navigate("AccountInfoEmail");
  const goToAccountGender = () =>
    navigation.navigate("AccountInfoGender", {
      gender,
    });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("userInfo")} />
      <Stack align="start" sx={{ marginHorizontal: 15, marginVertical: 15 }}>
        <Text style={{ marginBottom: 30, color: grey0 }}>
          {t("accountInfoDescription")}
        </Text>
        <FormProvider {...methods}>
          <FormTextField
            label="Email"
            placeholder="Email"
            name="email"
            onPressIn={goToAccountEmail}
          />
          <FormTextField
            label={t("phone")}
            placeholder={t("phone")}
            name="phone"
          />
          <FormTextField
            label={t("gender")}
            placeholder={t("gender")}
            name="gender"
            onPressIn={goToAccountGender}
          />
        </FormProvider>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
