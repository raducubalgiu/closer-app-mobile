import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Input label="Nume" />
      <Input label="Prenume" />
      <Input label="Email" />
      <Input label="Parola" />
      <Input label="Confirma Parola" />
      <Button
        disabled
        title={"Inregistreaza-te"}
        containerStyle={{ width: "100%" }}
      />
      <View>
        <Text>Ai deja cont?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
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
  },
});
