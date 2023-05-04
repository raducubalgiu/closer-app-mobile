import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Input, Spinner } from "../../../../components/core";
import { HeaderEdit } from "../../../../components/customized";
import { usePatch, useAuth } from "../../../../hooks";

export const EditWebsiteScreen = () => {
  const { user, setUser } = useAuth();
  const [website, setWebsite] = useState(user?.website);
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
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
        disabledBack={isLoading}
        disabledSave={isLoading}
      />
      <Input
        placeholder={t("addWebsite")}
        value={website}
        maxLength={40}
        onChangeText={(website: string) => setWebsite(website)}
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
