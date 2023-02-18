import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header, IconBackButton } from "../components/core";

export const StoryScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <IconBackButton color="white" />
      <Text>StoryScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
});
