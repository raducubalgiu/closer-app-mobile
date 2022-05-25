import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../components/core";
import { Footer } from "../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header title="Calendar" />
        <Footer
          btnTitle={t("continue")}
          onPress={() => navigation.navigate("Schedule")}
        >
          <Text>Hello World</Text>
        </Footer>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

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