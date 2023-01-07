import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Header } from "../../../../components/core";
import { useTranslation } from "react-i18next";

export const AccountScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("account")} />
      <Text>AccountScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
