import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { FormTextField, Spinner, Stack } from "../../../../components/core";
import { HeaderEdit } from "../../../../components/customized";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import { showToast } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";

const defaultValues = {
  currentPass: "",
  newPass: "",
  confirmNewPass: "",
};
const { black, error: errorStyle } = theme.lightColors || {};

export const AccountPasswordScreen = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const { user } = useAuth();
  const firebaseUser: any = auth.currentUser;
  const navigation = useNavigation();
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmNewPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const newPassword = watch("newPass");
  const confirmNewPass = watch("confirmNewPass");

  const handleUpdatePassword = (data: any) => {
    setIsLoading(true);

    if (data.newPass !== data.confirmNewPass) {
      setIsLoading(false);
      return showToast({
        message: "Parolele nu corespund",
        bgColor: errorStyle,
      });
    }

    if (!user?.email || !firebaseUser) {
      setIsLoading(false);
      return showToast({ message: t("somethingWentWrong") });
    }

    const credentials = EmailAuthProvider.credential(
      user.email,
      data.currentPass
    );

    reauthenticateWithCredential(firebaseUser, credentials)
      .then(() => {
        updatePassword(firebaseUser, data.newPass)
          .then(() => {
            showToast({ message: t("updatePasswordSuccess") });
            Keyboard.dismiss();
            setIsLoading(false);
            navigation.goBack();
          })
          .catch((error) => {
            setIsLoading(false);
            showToast({
              message: t("somethingWentWrong"),
              bgColor: errorStyle,
            });
          });
      })
      .catch((error) => {
        setIsLoading(false);

        switch (error.code) {
          case "auth/wrong-password":
            return showToast({
              message: t("wrongPassword"),
              bgColor: errorStyle,
            });
          case "auth/too-many-requests":
            return showToast({
              message: t("tooManyAttempsToChangePassword"),
              bgColor: errorStyle,
            });
          default:
            return showToast({
              message: t("somethingWentWrong"),
              bgColor: errorStyle,
            });
        }
      });
  };

  const returnBoolean = (condition: any) => {
    if (condition) {
      return true;
    }
    return false;
  };

  const handleShowNewPass = () => setShowNewPass((showNewPass) => !showNewPass);
  const handleShowConfirmPass = () =>
    setShowConfirmNewPass((showConfirmPass) => !showConfirmPass);

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("changePassword")}
        onSave={handleSubmit(handleUpdatePassword)}
        disabled={isLoading}
        divider
      />
      {!isLoading && (
        <Stack align="start" sx={{ marginHorizontal: 15, marginTop: 30 }}>
          <FormProvider {...methods}>
            <FormTextField
              label={t("currentPassword")}
              name="currentPass"
              placeholder=""
              secureTextEntry
            />
            <FormTextField
              label={t("newPassword")}
              name="newPass"
              placeholder=""
              secureTextEntry={returnBoolean(!showNewPass)}
              rightIconProps={{
                name: showNewPass ? "eye" : "eye-off",
                type: "feather",
                size: 22.5,
                color: newPassword ? black : "#ddd",
              }}
              disableRightIcon={returnBoolean(!newPassword)}
              onRightIconPress={handleShowNewPass}
            />
            <FormTextField
              label={t("confirmNewPassword")}
              name="confirmNewPass"
              placeholder=""
              secureTextEntry={returnBoolean(!showConfirmPass)}
              rightIconProps={{
                name: showConfirmPass ? "eye" : "eye-off",
                type: "feather",
                size: 22.5,
                color: confirmNewPass ? black : "#ddd",
              }}
              disableRightIcon={returnBoolean(!confirmNewPass)}
              onRightIconPress={handleShowConfirmPass}
            />
          </FormProvider>
        </Stack>
      )}
      {isLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
