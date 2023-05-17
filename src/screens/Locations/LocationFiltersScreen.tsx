import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import HeaderSheet from "../../components/customized/Layout/Headers/HeaderSheet";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export const LocationFiltersScreen = () => {
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderSheet title={t("filter")} onClose={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
