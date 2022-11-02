import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { AuthService } from "../../../services/AuthService";
import { Header, Feedback } from "../../../components/core";
import { useAuth } from "../../../hooks/auth";
import { LoginRegisterForm } from "../../../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { setUser } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
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
        setUser(userResult.data);
      }
    } catch (err) {
      setLoading(false);
      setFeedback({ visible: true, message: t("somethingWentWrong") });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <Header />
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

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
