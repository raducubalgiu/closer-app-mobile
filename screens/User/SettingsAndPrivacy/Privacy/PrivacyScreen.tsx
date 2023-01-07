import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";

export const PrivacyScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("privacy")} />
      <Text>PrivacyScreen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
