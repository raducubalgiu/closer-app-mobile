import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Header } from "../../../../components/core";

export const AssistanceScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <Text>AssistanceScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
