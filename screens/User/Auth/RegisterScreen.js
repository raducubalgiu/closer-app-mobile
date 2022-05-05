import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthService } from "../../../services/AuthService";
import { Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Header, MainButton, ButtonProvider } from "../../../components/core";

const RegisterScreen = () => {
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
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const { user, error } = await AuthService.registerWithPassword(
        email,
        password
      );

      if (error) return;

      if (user && !error) {
        const idTokenResult = await user.getIdTokenResult();
        navigation.navigate("Username", {
          role: "subscriber",
          business: undefined,
          idTokenResult,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerWithGoogle = async () => {
    try {
      const { user, error } = await AuthService.loginWithGoogle();

      if (error) {
        console.log(error);
        return;
      }

      if (user && !error) {
        const idTokenResult = await user.getIdTokenResult();
        navigation.navigate("Username", {
          role: "subscriber",
          business: undefined,
          idTokenResult,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <View style={styles.loginContainer}>
        <Text style={styles.mainHeading}>Inregistrare</Text>
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
              placeholderTextColor={theme.lightColors.grey0}
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
              placeholderTextColor={theme.lightColors.grey0}
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}

        <View style={{ marginTop: 10 }}>
          <MainButton
            title="Inregistreaza-te"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.actionRegister}>
            <Text style={{ fontFamily: "Exo-Regular", marginRight: 5 }}>
              Ai deja cont?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontFamily: "Exo-SemiBold" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Divider style={{ marginTop: 20, marginBottom: 35 }} />

        <ButtonProvider
          onPress={registerWithGoogle}
          iconName="googleplus"
          iconType="antdesign"
          color="#DB4437"
          text="Continua cu Google"
        />
        <ButtonProvider
          onPress={() => {}}
          iconName="apple1"
          iconType="antdesign"
          color={theme.lightColors.black}
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
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  loginContainer: {
    paddingHorizontal: 20,
  },
  mainHeading: {
    fontFamily: "Exo-SemiBold",
    fontSize: 25,
    color: theme.lightColors.black,
    marginTop: 30,
    marginBottom: 25,
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
