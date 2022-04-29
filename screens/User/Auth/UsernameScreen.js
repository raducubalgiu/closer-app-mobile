import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../context/auth";
import InputCheck from "../../../components/core/Inputs/InputCheck";

const UsernameScreen = (props) => {
  const { idTokenResult } = props.route.params;
  const { setUser } = useAuth();

  const handleSubmit = async (data) => {
    try {
      const userResult = await axios.post(
        `${process.env.BASE_ENDPOINT}/users/create-or-update-user`,
        {
          username: data.username,
          name: data.username,
          role: props.route.params.role,
          business: props.route.params.business,
        },
        {
          headers: {
            Authorization: "Bearer " + idTokenResult?.token,
          },
        }
      );

      const {
        _id,
        name,
        business,
        username,
        email,
        avatar,
        images,
        role,
        description,
        website,
        job,
        location,
        employees,
        services,
      } = userResult.data;

      setUser({
        _id,
        name,
        business: business?.name,
        username,
        email,
        avatar: avatar[0]?.url,
        images,
        role,
        description,
        website,
        job,
        location,
        employees,
        services,
        ratingsAverage: 4.5,
        ratingsQuantity: 0,
        followersCount: 0,
        followingCount: 0,
        token: idTokenResult?.token,
      });
    } catch (err) {
      console.log(err);
    }
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
        endpoint={`${process.env.BASE_ENDPOINT}/users/check-username`}
        inputName="username"
        onSubmit={handleSubmit}
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
    color: theme.lightColors.grey0,
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
