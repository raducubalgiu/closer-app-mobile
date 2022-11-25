import { StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { InputEdit, Spinner } from "../../../../components/core";
import { useAuth, usePatch } from "../../../../hooks";

export const EditUsernameScreen = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?._id}/update`,
    onSuccess: (res) => {
      setUser({ ...user, username: res.data.username });
      navigation.goBack();
    },
  });
  const updateUsername = () => {
    Keyboard.dismiss();
    mutate({ username });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("username")} onSave={updateUsername} />
      <InputEdit
        placeholder={t("addUsername")}
        value={username}
        updateValue={(username: string) => setUsername(username)}
        fieldLength={28}
      />
      {isLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
