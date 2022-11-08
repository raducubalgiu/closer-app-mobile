import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../../../services/AuthService";
import { Header, Feedback } from "../../../components/core";
import { LoginRegisterForm } from "../../../components/customized";
import { MAIN_ROLE } from "@env";
import { useTranslation } from "react-i18next";

export const RegisterBusinessScreen = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const { user, error } = await AuthService.registerWithPassword(
        email,
        password
      );

      if (error && error.code === "auth/email-already-in-use") {
        setLoading(false);
        setFeedback({ visible: true, message: t("emailAlreadyInUse") });
        return;
      }

      if (user && !error) {
        const idTokenResult = await user.getIdTokenResult();
        setLoading(false);

        navigation.navigate("Username", {
          role: MAIN_ROLE,
          idTokenResult,
        });
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
