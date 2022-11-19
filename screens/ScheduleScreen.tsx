import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/core";
import { Footer } from "../components/customized";
import { useTranslation } from "react-i18next";

export const ScheduleScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header title={t("scheduleSummary")} />
        <Footer btnTitle={t("book")}>
          <Text>Hello World</Text>
        </Footer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
