import { SafeAreaView, StyleSheet } from "react-native";
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
