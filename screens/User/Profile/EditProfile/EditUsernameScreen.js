import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { HeaderEdit } from "../../../../components/customized";
import { useTranslation } from "react-i18next";
import { InputEdit } from "../../../../components/core";
import { useAuth } from "../../../../hooks";

const EditUsernameScreen = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username);
  const { t } = useTranslation();

  const updateUsername = () => {};

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("username")} onSave={updateUsername} />
      <InputEdit
        placeholder={t("addUsername")}
        value={username}
        updateValue={(username) => setUsername(username)}
        fieldLength={28}
      />
    </SafeAreaView>
  );
};

export default EditUsernameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
