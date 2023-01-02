import { StyleSheet, SafeAreaView } from "react-native";
import { Divider } from "@rneui/themed";
import { HeaderFeed } from "../../components/customized";

export const FeedBookablesScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={2} />
      <Divider color="#ddd" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
