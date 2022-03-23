import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import MainButton from "../../components/Buttons/MainButton";
import GoogleButton from "../../components/Buttons/GoogleButton";
import BoxTitleAuth from "../../components/BoxTitleAuth/BoxTitleAuth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginHandler = (data) => {};

  return (
    <View style={styles.screen}>
      <BoxTitleAuth title="Bine ai venit" />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            label="Parola"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity>
          <Text style={{ fontFamily: "Exo-Medium", color: "#fe9934" }}>
            Resetare parola
          </Text>
        </TouchableOpacity>
      </View>
      <MainButton
        title="Conectare"
        onPress={handleSubmit(loginHandler)}
        loading={loading}
      />
      <Text style={{ marginVertical: 5, fontFamily: "Exo-Medium" }}>sau</Text>
      <GoogleButton title="Conectare cu Google" />
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ fontFamily: "Exo-Medium", color: "#fe9934" }}>
          Nu ai cont? Inregistreaza-te
        </Text>
      </TouchableOpacity>
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
