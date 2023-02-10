import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  Button,
  FormInput,
  FormTextField,
  Header,
  Stack,
} from "../../../../components/core";
import { useForm } from "react-hook-form";

export const ReportAProblemScreen = () => {
  const methods = useForm({ defaultValues: { problem: "" } });
  const { handleSubmit, watch } = methods;
  const problem = watch("problem");
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("reportAProblem")} />
      <Stack align="start" sx={{ margin: 15 }}>
        <FormProvider {...methods}>
          <FormTextField
            placeholder="Pentru siguranta ta nu include date personale"
            label="Care este problema?"
            name="problem"
          />
          <Button
            title={t("send")}
            sxBtn={{ width: "100%" }}
            disabled={problem?.length === 0}
            onPress={() => {}}
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
