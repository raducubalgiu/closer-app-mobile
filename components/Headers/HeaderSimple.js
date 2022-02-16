import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";

const HeaderSimple = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={25}
          style={{ padding: 10 }}
          color={Colors.textDark}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderSimple;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
});
