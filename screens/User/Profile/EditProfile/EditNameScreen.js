import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Feedback, InputEdit, Spinner } from "../../../../components/core";

const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateName = () => {
    Keyboard.dismiss();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/update`,
        {
          name,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setUser({ ...user, name: res.data.user.name });
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setFeedback({ visible: true, message: t("somethingWentWrong") });
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("name")} onSave={updateName} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <InputEdit
        placeholder={t("addName")}
        value={name}
        fieldLength={30}
        updateValue={(name) => setName(name)}
      />
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditNameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
