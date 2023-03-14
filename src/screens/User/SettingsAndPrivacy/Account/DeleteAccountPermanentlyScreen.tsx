import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Header } from "../../../../components/core";

export const DeleteAccountPermanentlyScreen = () => {
  const { t } = useTranslation("common");

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("deleteAccount")} />
      <Text>DeleteAccountPermanentlyScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
