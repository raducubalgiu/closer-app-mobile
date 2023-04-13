import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, FormTextField, Header, Stack } from "../../components/core";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupName">;

export const ChatGroupNameScreen = ({ route }: IProps) => {
  const { name } = route.params;
  const { t } = useTranslation();
  const methods = useForm({ defaultValues: { name } });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const handleChangeName = (data: any) => {};

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("nameOfGroup")} />
      <View style={{ margin: 15 }}>
        <FormProvider {...methods}>
          <FormTextField
            name="name"
            placeholder={t("nameOfGroup")}
            sx={{ marginBottom: 0 }}
          />
          <Button
            title={t("save")}
            disabled={!isDirty}
            onPress={handleSubmit(handleChangeName)}
          />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
