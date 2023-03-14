import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/core";

export const AddJobsScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Adauga un job" />
      <Text>AddJobsScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
