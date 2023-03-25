import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Divider } from "@rneui/themed";
import { Button, FormInput, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { AuthProviders } from "./AuthProviders";

const { black } = theme.lightColors || {};

type IProps = {
  onSubmit: (data: any) => Promise<void>;
  statusAction: () => void;
  heading: string;
  statusText: string;
  statusBtn: string;
  loading: boolean;
};

const defaultValues = {
  email: "",
  password: "",
};

export const LoginRegisterForm = ({
  onSubmit,
  heading,
  statusText,
  statusBtn,
  statusAction,
  loading,
}: IProps) => {
  const [disabled, setDisabled] = useState(true);
  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const { t } = useTranslation("common");
  const emailInput = watch("email");
  const passwordInput = watch("password");

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (emailInput !== "" && passwordInput !== "") {
        setDisabled(false);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailInput, passwordInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <FormProvider {...methods}>
        <FormInput
          sx={styles.inputEmail}
          placeholder={t("email")}
          name="email"
        />
        <FormInput
          sx={styles.inputPass}
          placeholder={t("password")}
          name="password"
          secureTextEntry={true}
        />
        <Button
          size="md"
          title={heading}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          disabled={loading || disabled}
        />
      </FormProvider>
      <Stack align="start">
        <Stack direction="row">
          <Text style={styles.statusText}>{statusText}</Text>
          <Pressable onPress={statusAction}>
            <Text style={styles.statusBtn}>{statusBtn}</Text>
          </Pressable>
        </Stack>
      </Stack>
      <Divider style={styles.divider} />
      <AuthProviders />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  heading: {
    fontSize: 25,
    color: black,
    marginTop: 30,
    marginBottom: 25,
  },
  statusText: { marginRight: 5 },
  statusBtn: { fontWeight: "600", color: black },
  inputEmail: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    padding: 7.5,
  },
  inputPass: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 7.5,
    marginBottom: 5,
  },
  divider: { marginTop: 20, marginBottom: 35 },
});
