import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { InputEdit, Spinner } from "../../../../components/core";
import { usePatch, useAuth } from "../../../../hooks";

export const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({ ...user, name: res.data.name });
      navigation.goBack();
    },
  });

  const updateName = () => {
    Keyboard.dismiss();
    mutate({ name });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title={t("name")} onSave={updateName} disabled={isLoading} />
      <InputEdit
        placeholder={t("addName")}
        value={name ? name : ""}
        fieldLength={30}
        updateValue={(name: string) => setName(name)}
        withDetails
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
