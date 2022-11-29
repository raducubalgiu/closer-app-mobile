import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import InputCheck from "../../../components/core/Inputs/InputCheck";
import { useTranslation } from "react-i18next";

const { grey0 } = theme.lightColors || {};

export const UsernameScreen = ({ route }: any) => {
  const { idTokenResult, role } = route.params;
  const { displayName, photoURL } = idTokenResult;
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);

      const userResult = await axios.post(
        `${process.env.BASE_ENDPOINT}/users/register`,
        {
          username: data.username,
          name: displayName ? displayName : data.username,
          avatar: photoURL ? photoURL : [],
          role,
        },
        {
          headers: {
            Authorization: "Bearer " + idTokenResult?.token,
          },
        }
      );

      setUser({
        ...userResult.data,
        token: idTokenResult?.token,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("createAUsername")}</Text>
        <Text style={styles.description}>{t("pickAUsername")}</Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <InputCheck
          endpoint={`${process.env.BASE_ENDPOINT}/users/check-username`}
          inputName="username"
          onSubmit={handleSubmit}
          loadingBtn={loading}
        />
      </View>
    </SafeAreaView>
  );
};

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
    fontSize: 23,
    textAlign: "center",
    marginHorizontal: 30,
  },
  description: {
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    color: grey0,
    fontSize: 15,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
});
