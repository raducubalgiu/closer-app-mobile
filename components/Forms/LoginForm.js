import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../context/auth";
import { Divider } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";
import ButtonProvider from "../core/Buttons/ButtonProvider";
import MainButton from "../core/Buttons/MainButton";

const LoginForm = (props) => {
  const { setUser } = useAuth();

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

        const {
          _id,
          email,
          role,
          name,
          job,
          logo,
          selectedLocation,
          ratingsAverage,
          ratingsQuantity,
        } = userResult.data.user;

        if (selectedLocation === null) {
          setUser({
            _id,
            email,
            role,
            token: idTokenResult?.token,
            name,
            job,
            avatar: logo[0]?.url,
            ratingsAverage,
            ratingsQuantity,
          });
        } else {
          setUser({
            _id,
            email,
            role,
            token: idTokenResult?.token,
            locationId: selectedLocation?._id,
            name: selectedLocation?.name,
            job: selectedLocation?.job,
            avatar: selectedLocation?.logo[0]?.url,
            ratingsAverage: selectedLocation?.ratingsAverage,
            ratingsQuantity: selectedLocation?.ratingsQuantity,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text style={styles.mainHeading}>Bine ai venit</Text>
      <Divider style={{ marginVertical: 20 }} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              ...styles.input,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            placeholderTextColor={Colors.textLight}
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
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              ...styles.input,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Parola"
            secureTextEntry={true}
            placeholderTextColor={Colors.textLight}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <View style={{ marginTop: 10 }}>
        <MainButton title="Logheaza-te" onPress={handleSubmit(onSubmit)} />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.actionRegister}>
          <Text style={{ fontFamily: "Exo-Regular", marginRight: 5 }}>
            Ai deja cont?
          </Text>
          <TouchableOpacity onPress={() => props.onGoToRegister()}>
            <Text style={{ fontFamily: "Exo-SemiBold" }}>Inregistrare</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{ fontFamily: "Exo-Medium", color: Colors.primary }}>
            Ai uitat parola?
          </Text>
        </TouchableOpacity>
      </View>

      <Divider style={{ marginTop: 20, marginBottom: 35 }} />

      <ButtonProvider
        onPress={() => {}}
        iconName="googleplus"
        iconType="antdesign"
        color="#DB4437"
        text="Continua cu Google"
      />
      <ButtonProvider
        onPress={() => {}}
        iconName="apple1"
        iconType="antdesign"
        color={Colors.textDark}
        text="Continua cu Apple"
      />
      <ButtonProvider
        onPress={() => {}}
        iconName="facebook"
        iconType="material"
        color="#4267B2"
        text="Continua cu Facebook"
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  mainHeading: {
    textAlign: "center",
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
  },
  input: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionRegister: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
