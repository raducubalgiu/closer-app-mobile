import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/core";

export const SavingDataScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <Text>SavingDataScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
