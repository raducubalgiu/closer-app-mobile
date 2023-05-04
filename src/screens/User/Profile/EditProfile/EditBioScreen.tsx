import { SafeAreaView, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderEdit } from "../../../../components/customized";
import { Input } from "../../../../components/core";
import { useAuth, usePatch } from "../../../../hooks";

export const EditBioScreen = () => {
  const { user, setUser } = useAuth();
  const { description } = user || {};
  const [bio, setBio] = useState(description ? description : "");
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({ ...user, description: res.data.description });
      navigation.goBack();
    },
  });

  const updateBio = () => {
    Keyboard.dismiss();
    mutate({ description: bio });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        title={t("name")}
        onSave={updateBio}
        disabledBack={isLoading}
        disabledSave={isLoading}
      />
      <Input
        value={bio}
        withDetails
        onChangeText={(text) => setBio(text)}
        maxLength={200}
        multiline={true}
        height={150}
        placeholder={t("addBiography")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
