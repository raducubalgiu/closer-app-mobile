import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../../../components/core";

export const ClearCacheScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <Text>ClearCacheScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
