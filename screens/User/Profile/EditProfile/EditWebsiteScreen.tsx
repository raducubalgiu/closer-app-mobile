import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { InputEdit, Spinner } from "../../../../components/core";
import { HeaderEdit } from "../../../../components/customized";
import { usePatch, useAuth } from "../../../../hooks";

export const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [website, setWebsite] = useState(user?.website);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?._id}/update`,
    onSuccess: (res) => {
      setUser({ ...user, website: res.data.website });
      navigation.goBack();
    },
  });
  const updateWebsite = () => {
    Keyboard.dismiss();
    mutate({ website });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("website")}
        onSave={updateWebsite}
        disabled={isLoading}
      />
      <InputEdit
        placeholder={t("addWebsite")}
        value={website}
        fieldLength={40}
        updateValue={(website: string) => setWebsite(website)}
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
