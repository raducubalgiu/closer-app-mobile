import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { FormInputRadio, Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";

export const LanguageAppScreen = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState({ id: "1", name: "Romana", key: "ro" });

  const LANG = [
    { id: "1", name: "Romana", key: "ro" },
    { id: "2", name: "English", key: "en" },
    { id: "3", name: "Italian", key: "it" },
    { id: "4", name: "Espanol", key: "es" },
    { id: "5", name: "Deutsch", key: "de" },
  ];

  const renderLanguage = useCallback(({ item }: any) => {
    return (
      <FormInputRadio
        title={item.name}
        onPress={() => {}}
        checked={lang.key === item.key}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("languageApp")} />
      <FlatList
        data={LANG}
        keyExtractor={keyExtractor}
        renderItem={renderLanguage}
        contentContainerStyle={{ paddingHorizontal: 15 }}
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
