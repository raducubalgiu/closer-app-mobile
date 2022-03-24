import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BoxTitleAuth from "../../components/BoxTitleAuth/BoxTitleAuth";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <BoxTitleAuth title="Inregistreaza-te" />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: "Exo-Medium",
  },
  inputStyle: {
    fontFamily: "Exo-Regular",
  },
});
