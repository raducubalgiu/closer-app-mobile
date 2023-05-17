import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, SafeAreaView, StyleSheet } from "react-native";
import {
  Button,
  FormTextField,
  Header,
  IconButton,
  Stack,
} from "../../../../components/core";
import { useForm } from "react-hook-form";
import { useAuth, usePost } from "../../../../hooks";
import { showToast } from "../../../../utils";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const ReportAProblemScreen = () => {
  const { user } = useAuth();
  const methods = useForm({ defaultValues: { text: "" } });
  const { handleSubmit, watch, setValue } = methods;
  const problem = watch("text");
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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

  const actionBtn = (
    <IconButton
      name="checklist"
      type="octicon"
      onPress={() => navigation.navigate("ReportsList")}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("reportAProblem")} actionBtn={actionBtn} />
      <Stack align="start" justify="start" sx={{ margin: 15 }}>
        <FormProvider {...methods}>
          <FormTextField
            placeholder={t("forYourSafetyDontIncludePersonalData")}
            label={`${t("whichIsTheProblem")}?`}
            name="text"
            multiline={true}
            sx={{ height: 150 }}
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
