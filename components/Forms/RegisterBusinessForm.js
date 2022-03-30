import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ProgressStep } from "react-native-progress-steps";
import React from "react";
import ButtonProvider from "../Buttons/ButtonProvider";
import { Colors } from "../../assets/styles/Colors";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../context/auth";

const RegisterBusinessForm = (props) => {
  const { setUser } = useAuth();

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

  const registerAdmin = async (data) => {
    try {
      const { user, error } = await AuthService.registerWithPassword(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      if (!error) {
        const idTokenResult = await user?.getIdTokenResult();

        const userResult = await axios.post(
          `http://192.168.100.2:8000/api/v1/users/create-or-update-user`,
          {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          {
            headers: {
              Authorization: "Bearer " + idTokenResult?.token,
            },
          }
        );

        const { role, _id, email, name } = userResult.data;

        const res = await axios.post(
          `http://192.168.100.2:8000/api/v1/orders`,
          {
            user: _id,
          },
          {
            headers: { Authorization: `Bearer ${idTokenResult?.token}` },
          }
        );

        if (userResult) {
          setUser({
            role,
            _id,
            email,
            name,
            token: idTokenResult?.token,
            orderId: res.data.order._id,
          });
        }
      }

      props.onUpdateStep();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProgressStep
      nextBtnStyle={styles.nextBtnStyle}
      nextBtnTextStyle={styles.nextBtnTextStyle}
      label="User"
      nextBtnText="Inainte"
      removeBtnRow={true}
    >
      <View style={{ margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
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
                  placeholder="Nume*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="lastName"
            />
            {errors.lastName && <Text>This is required.</Text>}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
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
                  placeholder="Prenume*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="firstName"
            />
            {errors.lastName && <Text>This is required.</Text>}
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
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
                placeholder="Email*"
                placeholderTextColor={Colors.textLight}
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}
        </View>
        <View style={{ marginTop: 10 }}>
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
                placeholder="Parola*"
                secureTextEntry={true}
                placeholderTextColor={Colors.textLight}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
        </View>
        <Text style={styles.providers}>sau</Text>
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
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.nextBtnStyle}
          onPress={handleSubmit(registerAdmin)}
        >
          <Text style={styles.nextBtnTextStyle}>Inainte</Text>
        </TouchableOpacity>
      </View>
    </ProgressStep>
  );
};

export default RegisterBusinessForm;

const styles = StyleSheet.create({
  input: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nextBtnStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginRight: 10,
  },
  nextBtnTextStyle: {
    fontSize: 15,
    color: "white",
    fontFamily: "Exo-Medium",
  },
  providers: {
    fontFamily: "Exo-Medium",
    marginVertical: 20,
    textAlign: "center",
    color: Colors.textLight,
  },
});
