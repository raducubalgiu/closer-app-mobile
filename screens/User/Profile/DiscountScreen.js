import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../../../components/core";
import { NoFoundMessage } from "../../../components/customized";
import { useTranslation } from "react-i18next";

const DiscountsScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Discounturi" divider={true} />
      <View style={styles.container}>
        <NoFoundMessage
          title={t("discounts")}
          description={t("noDiscountsFound")}
          iconName="gift"
          iconType="feather"
          iconSize={55}
        />
      </View>
    </SafeAreaView>
  );
};

export default DiscountsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
    flex: 1,
  },
});
