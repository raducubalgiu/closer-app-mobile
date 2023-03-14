import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { AuthService } from "../../../../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import { IconBackButton } from "../../../components/core";
import Stack from "../../../components/core/Stack/Stack";
import { LoginRegisterForm } from "../../../components/customized";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

export const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const { user, err } = await AuthService.registerWithPassword(
        email,
        password
      );

      if (err && err.code === "auth/email-already-in-use") {
        setLoading(false);
        return;
      }
      if (!err) {
        const idTokenResult = await user.getIdTokenResult();
        navigation.navigate("Username", {
          role: "subscriber",
          idTokenResult,
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={{ marginLeft: 15 }}>
        <IconBackButton />
      </Stack>
      <LoginRegisterForm
        loading={loading}
        onSubmit={onSubmit}
        heading={t("register")}
        statusText={t("haveAccount")}
        statusBtn={t("login")}
        statusAction={() => navigation.replace("Login")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
