import { SafeAreaView, StyleSheet, Text } from "react-native";

export const SoundScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>SoundScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
