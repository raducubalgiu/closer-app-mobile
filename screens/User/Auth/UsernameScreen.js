import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import InputCheck from "../../../components/core/Inputs/InputCheck";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../../context/auth";

const UsernameScreen = () => {
  const { setUser } = useAuth();

  const handleSubmit = (data) => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        const userResult = await axios.post(
          `http://192.168.100.2:8000/api/v1/users/create-or-update-user`,
          {
            username: data.username,
            role: "subscriber",
          },
          {
            headers: {
              Authorization: "Bearer " + idTokenResult?.token,
            },
          }
        );

        console.log("USER FROM BACKEND", userResult.data);

        const { _id, email, name, username, role, job } = userResult.data;

        if (userResult) {
          setUser({
            _id,
            email,
            name,
            username,
            role,
            token: idTokenResult?.token,
            job,
          });
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Creeaza un nume de utilizator</Text>
        <Text style={styles.description}>
          Alege un nume de utilizator pentru contul tau. Il poti schimba oricand
        </Text>
      </View>
      <InputCheck
        onSubmit={handleSubmit}
        endpoint="http://192.168.100.2:8000/api/v1/users/check-username"
        inputName="username"
      />
    </SafeAreaView>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 50,
  },
  title: {
    fontFamily: "Exo-Medium",
    fontSize: 23,
    textAlign: "center",
    marginHorizontal: 30,
  },
  description: {
    fontFamily: "Exo-Regular",
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    color: Colors.textLight,
    fontSize: 15,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
});
