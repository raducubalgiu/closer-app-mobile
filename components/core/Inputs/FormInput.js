import { StyleSheet, TextInput, Text } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { has, get } from "lodash";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { Stack } from "../Stack/Stack";

const { error, grey0 } = theme.lightColors;

export const FormInput = ({
  name,
  placeholder,
  rules = {},
  sx,
  label,
  ...props
}) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;

  const errMsg = (
    <Stack direction="row" sx={{ marginBottom: 10 }}>
      <Icon name="alert-circle" type="feather" size={20} color={error} />
      <Text style={styles.errMsg}>{get(errors, name)?.message}</Text>
    </Stack>
  );

  return (
    <>
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...props}
            placeholder={placeholder}
            style={{
              ...styles.input,
              borderColor: has(errors, name) ? error : "#ccc",
              ...sx,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#9EA0A4"
          />
        )}
        name={name}
      />
      {has(errors, name) && errMsg}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12.5,
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    borderRadius: 5,
  },
  label: {
    textTransform: "uppercase",
    color: theme.lightColors.black,
    marginBottom: 2.5,
    fontWeight: "600",
    fontSize: 13.5,
  },
  errMsg: {
    color: error,
    marginLeft: 5,
  },
});
