import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Input label="Email" />
      <Input label="Parola" />
      <Button
        disabled
        title={"Logheaza-te"}
        containerStyle={{ width: "100%" }}
      />
      <View>
        <Text>Nu ai inca cont?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
