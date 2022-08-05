import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Feedback, InputEdit, Spinner } from "../../../../components/core";
import { HeaderEdit } from "../../../../components/customized";
import { useHttpPatch, useAuth } from "../../../../hooks";

const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [website, setWebsite] = useState(user?.website);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateUser = (data) => {
    setUser({ ...user, website: data.user.website });
    navigation.goBack();
  };
  const { makePatch, loading, feedback, setFeedback } = useHttpPatch(
    `/users/${user?._id}/update`,
    updateUser
  );
  const updateWebsite = () => {
    Keyboard.dismiss();
    makePatch({ website });
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
        withDetails
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
