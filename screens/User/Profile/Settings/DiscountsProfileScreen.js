import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../components/customized/Headers/Header";

const DiscountsProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Discounturi" />
      <Divider />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default DiscountsProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
});
