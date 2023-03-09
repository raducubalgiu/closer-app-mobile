import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import axios from "axios";
import { AuthService } from "../../../services/AuthService";
import { IconBackButton } from "../../../components/core";
import Stack from "../../../components/core/Stack/Stack";
import { useAuth } from "../../../hooks/auth";
import { LoginRegisterForm } from "../../../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

export const LoginScreen = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { user, err } = await AuthService.loginWithPassword(
        data.email,
        data.password
      );
      if (err) {
        setLoading(false);
        return;
      } else {
        const idTokenResult = await user?.getIdTokenResult();
        const userResult = await axios.post(
          `${process.env.BASE_ENDPOINT}/users/login`,
          {},
          {
            headers: {
              Authorization: "Bearer " + idTokenResult?.token,
            },
          }
        );

        setLoading(false);
        setUser({ ...userResult.data, token: idTokenResult?.token });
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
        heading={t("login")}
        statusText={t("dontHaveAccount")}
        statusBtn={t("register")}
        statusAction={() => navigation.replace("Register")}
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
