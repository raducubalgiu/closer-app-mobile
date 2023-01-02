import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderFeed } from "../../components/customized";
import { Divider } from "@rneui/themed";

export const FeedLastMinuteScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <HeaderFeed indexLabel={3} />
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
