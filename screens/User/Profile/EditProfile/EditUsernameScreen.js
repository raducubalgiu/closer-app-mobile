import { StyleSheet, SafeAreaView, Keyboard } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Feedback, InputEdit, Spinner } from "../../../../components/core";
import { useAuth, useHttpPatch } from "../../../../hooks";

export const EditUsernameScreen = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const updateUser = (data) => {
    setUser({ ...user, username: data.username });
    navigation.goBack();
  };
  const { makePatch, feedback, setFeedback, loading } = useHttpPatch(
    `/users/${user?._id}/update`,
    updateUser
  );
  const updateUsername = () => {
    Keyboard.dismiss();
    makePatch({ username });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("username")} onSave={updateUsername} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <InputEdit
        placeholder={t("addUsername")}
        value={username}
        updateValue={(username) => setUsername(username)}
        fieldLength={28}
      />
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
