import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  FormTextField,
  Header,
  Stack,
} from "../../../../components/core";
import { useForm } from "react-hook-form";
import { useAuth, usePost } from "../../../../hooks";
import { showToast } from "../../../../utils";

export const ReportAProblemScreen = () => {
  const { user } = useAuth();
  const methods = useForm({ defaultValues: { text: "" } });
  const { handleSubmit, watch, setValue } = methods;
  const problem = watch("text");
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePost({
    uri: `/problems`,
    onSuccess: () => {
      showToast({ message: t("youSentReportSuccesfully") });
      setValue("text", "");
      Keyboard.dismiss();
    },
  });

  const handleReport = (data: { text: string }) => {
    const { text } = data;
    mutate({ text, userId: user?.id });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("reportAProblem")} />
      <Stack align="start" sx={{ margin: 15 }}>
        <FormProvider {...methods}>
          <FormTextField
            placeholder={t("forYourSafetyDontIncludePersonalData")}
            label={`${t("whichIsTheProblem")}?`}
            name="text"
            sx={{ height: 150, textAlignVertical: "top" }}
          />
          <Button
            title={t("send")}
            sxBtn={{ width: "100%" }}
            disabled={problem?.length === 0 || isLoading}
            loading={isLoading}
            onPress={handleSubmit(handleReport)}
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
