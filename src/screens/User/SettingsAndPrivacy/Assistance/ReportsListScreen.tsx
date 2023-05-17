import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";

export const ReportsListScreen = () => {
  const { t } = useTranslation("common");

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("reports")} />
      <Text>ReportsListScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
