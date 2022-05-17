import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Feedback, InputEdit, Spinner } from "../../../../components/core";
import { HeaderEdit } from "../../../../components/customized";

const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [website, setWebsite] = useState(user?.website);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateWebsite = () => {
    Keyboard.dismiss();
    setLoading(true);
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          website,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setUser({ ...user, website: res.data.user.website });
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setLoading(false);
        setFeedback({ visible: true, message: t("somethingWentWrong") });
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("website")} onSave={updateWebsite} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <InputEdit
        placeholder={t("addWebsite")}
        value={website}
        fieldLength={40}
        updateValue={(website) => setWebsite(website)}
      />
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditWebsiteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
