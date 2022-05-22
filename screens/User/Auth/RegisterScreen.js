import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AuthService } from "../../../services/AuthService";
import { useNavigation } from "@react-navigation/native";
import { Feedback, Header } from "../../../components/core";
import { LoginRegisterForm } from "../../../components/customized";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const { user, err } = await AuthService.registerWithPassword(
        email,
        password
      );

      if (err && err.code === "auth/email-already-in-use") {
        setFeedback({ visible: true, message: t("emailAlreadyInUse") });
        setLoading(false);
        return;
      }
      if (!err) {
        const idTokenResult = await user.getIdTokenResult();
        navigation.navigate("Username", {
          role: "subscriber",
          business: undefined,
          idTokenResult,
        });
        setLoading(false);
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

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
