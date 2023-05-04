import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Input, Spinner } from "../../../../components/core";
import { usePatch, useAuth } from "../../../../hooks";

export const EditNameScreen = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const navigation = useNavigation();
  const { t } = useTranslation("common");

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
      <HeaderEdit
        title={t("name")}
        onSave={updateName}
        disabledSave={isLoading}
        disabledBack={isLoading}
      />
      <Input
        placeholder={t("addName")}
        value={name ? name : ""}
        maxLength={30}
        onChangeText={(text: string) => setName(text)}
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
