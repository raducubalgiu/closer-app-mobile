import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../../../../services/AuthService";
import { IconBackButton } from "../../../components/core";
import Stack from "../../../components/core/Stack/Stack";
import { LoginRegisterForm } from "../../../components/customized";
import { MAIN_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

export const RegisterBusinessScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");

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

      if (user && !err) {
        const idTokenResult = await user.getIdTokenResult();
        setLoading(false);

        navigation.navigate("Username", {
          role: MAIN_ROLE,
          idTokenResult,
        });
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
        statusAction={() => navigation.push("Login")}
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
