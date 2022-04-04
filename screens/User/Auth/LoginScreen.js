import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import { AuthService } from "../../../services/AuthService";
import ButtonProvider from "../../../components/core/Buttons/ButtonProvider";
import MainButton from "../../../components/core/Buttons/MainButton";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";
import IconBackButton from "../../../components/core/IconButton/IconBackButton";
import { useAuth } from "../../../context/auth";

const LoginScreen = () => {
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

        console.log(userResult.data.user);

        const {
          _id,
          email,
          username,
          role,
          name,
          job,
          avatar,
          ratingsAverage,
          ratingsQuantity,
        } = userResult.data.user;

        setUser({
          _id,
          email,
          username,
          role,
          token: idTokenResult?.token,
          name,
          job,
          avatar: avatar[0]?.url,
          ratingsAverage,
          ratingsQuantity,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.loginContainer}>
        <HeaderReusable
          firstBox={<IconBackButton />}
          secondBox={null}
          thirdBox={null}
        />
        <Text style={styles.mainHeading}>Autentificare</Text>
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
          <MainButton title="Conecteaza-te" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.actionRegister}>
            <Text style={{ fontFamily: "Exo-Regular", marginRight: 5 }}>
              Ai deja cont?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontFamily: "Exo-SemiBold" }}>
                Inregistreaza-te
              </Text>
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
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    color: Colors.textDark,
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
