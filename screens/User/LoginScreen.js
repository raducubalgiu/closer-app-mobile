import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BoxTitleAuth from "../../components/BoxTitleAuth/BoxTitleAuth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.screen}>
      <BoxTitleAuth title="Bine ai venit" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  label: {
    fontFamily: "Exo-Medium",
    fontSize: 14,
    marginBottom: 5,
  },
  inputStyle: {
    fontFamily: "Exo-Regular",
    backgroundColor: "#f1f1f1",
  },
});
