import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Feedback, InputEdit, Spinner } from "../../../../components/core";
import { useHttpPatch, useAuth } from "../../../../hooks";

const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const updateUser = (data) => {
    setUser({ ...user, name: data.name });
    navigation.goBack();
  };
  const { makePatch, loading, feedback, setFeedback } = useHttpPatch(
    `/users/update`,
    updateUser
  );

  const updateName = () => {
    Keyboard.dismiss();
    makePatch({ name });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("name")} onSave={updateName} disabled={loading} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <InputEdit
        placeholder={t("addName")}
        value={name}
        fieldLength={30}
        updateValue={(name) => setName(name)}
        withDetails
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
