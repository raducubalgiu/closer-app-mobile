import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, FormTextField, Header } from "../../components/core";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { useAuth, usePatch } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupName">;

export const ChatGroupNameScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { name, chatId } = route.params;
  const { t } = useTranslation();
  const methods = useForm({ defaultValues: { name } });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/chats/${chatId}/groups/rename`,
    onSuccess: () => {
      showToast({ message: t("youChangedSuccessfullyNameOfGroup") });
      navigation.goBack();
    },
  });

  const handleChangeName = (data: any) => {
    const { name } = data;
    mutate({ chatId, name });
  };

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
            disabled={!isDirty || isLoading}
            onPress={handleSubmit(handleChangeName)}
            loading={isLoading}
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
