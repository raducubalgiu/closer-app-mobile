import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Header } from "../../../components/core";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../../components/customized";

const SchedulesScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("schedules")} divider={true} />
      <View style={styles.container}>
        <NoFoundMessage
          title={t("schedules")}
          description={t("noSchedulesFound")}
          iconName="event"
        />
      </View>
    </SafeAreaView>
  );
};

export default SchedulesScreen;

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
