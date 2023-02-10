import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Stack } from "../../../../../components/core";
import { HeaderEdit } from "../../../../../components/customized";

export const AccountInfoEmailScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit title="Editeaza email" onSave={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
