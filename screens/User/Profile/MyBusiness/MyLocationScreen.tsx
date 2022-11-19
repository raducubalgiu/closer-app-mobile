import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../../../../components/core";
import { AddLocationScreen } from "./AddLocationScreen";

export const MyLocationScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Locatia mea" />
      <AddLocationScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
