import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BoxTitleAuth from "../../components/BoxTitleAuth/BoxTitleAuth";
import { useForm, Controller } from "react-hook-form";
import MainButton from "../../components/Buttons/MainButton";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.screen}>
      <BoxTitleAuth title="Inregistreaza-te" />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            label="Nume"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            labelStyle={styles.label}
            inputStyle={styles.inputStyle}
            label="Prenume"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
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
          required: true,
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
      <MainButton title="Inregistreaza-te" onPress={handleSubmit(onSubmit)} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontFamily: "Exo-Medium", color: "#fe9934" }}>
            Ai deja cont? Logheaza-te
          </Text>
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
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: "Exo-Medium",
  },
  inputStyle: {
    fontFamily: "Exo-Regular",
  },
});
