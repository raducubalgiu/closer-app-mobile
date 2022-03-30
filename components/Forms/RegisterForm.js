import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import axios from "axios";
import MainButton from "../Buttons/MainButton";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../context/auth";
import { Divider, Icon } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";
import ButtonProvider from "../Buttons/ButtonProvider";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = (props) => {
  const { setUser } = useAuth();
  const navigation = useNavigation();
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
  const onSubmit = async (data) => {};

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
              borderRadius: 10,
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

      <View style={{ marginTop: 10 }}>
        <MainButton title="Inregistreaza-te" onPress={handleSubmit(onSubmit)} />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.actionRegister}>
          <Text style={{ fontFamily: "Exo-Regular", marginRight: 5 }}>
            Ai deja cont?
          </Text>
          <TouchableOpacity onPress={() => props.onGoToLogin()}>
            <Text style={{ fontFamily: "Exo-SemiBold" }}>Login</Text>
          </TouchableOpacity>
        </View>
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
      <Divider style={{ marginTop: 10 }} />
      <View style={{ ...styles.actionsContainer, marginTop: 20 }}>
        <View style={styles.actionRegister}>
          <Text style={{ fontFamily: "Exo-Regular", marginRight: 5 }}>
            Ai un business?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterBusiness")}
          >
            <Text style={{ fontFamily: "Exo-SemiBold" }}>Inregistreaza</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;

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
