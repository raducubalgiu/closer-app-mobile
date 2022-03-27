import { StyleSheet, Text, View } from "react-native";
import React from "react";
import axios from "axios";
import MainButton from "../Buttons/MainButton";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../context/auth";

const LoginForm = () => {
  const { user, setUser } = useAuth();

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
  const onSubmit = async (data) => {
    try {
      const { user, error } = await AuthService.loginWithPassword(
        data.email,
        data.password
      );

      console.log("USER FROM FIREBASE!!!!!!!", user);

      if (!error) {
        const idTokenResult = await user?.getIdTokenResult();

        const userResult = await axios.post(
          `http://192.168.100.2:8000/api/v1/users/create-or-update-user`,
          {},
          {
            headers: {
              Authorization: "Bearer " + idTokenResult?.token,
            },
          }
        );

        console.log("USER FROM OUR BACKEND!!!!", userResult);

        const { name, role, _id, business, location, email } =
          userResult.data.user;

        setUser({
          name,
          role,
          _id,
          business,
          email,
          location,
          token: idTokenResult?.token,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ marginVertical: 30 }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Parola"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <MainButton title="Logare" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: "Exo-Regular",
  },
});
