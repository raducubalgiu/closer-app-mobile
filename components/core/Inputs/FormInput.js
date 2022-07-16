import { StyleSheet, TextInput, Text } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import theme from "../../../assets/styles/theme";

export const FormInput = ({
  name,
  placeholder,
  rules = {},
  sx,
  label,
  ...props
}) => {
  const { errors, control } = useFormContext();

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
            style={{ ...styles.input, ...sx }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#9EA0A4"
          />
        )}
        name={name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12.5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    borderRadius: 5,
  },
  label: {
    fontFamily: "Exo-SemiBold",
    textTransform: "uppercase",
    color: theme.lightColors.grey0,
    marginBottom: 2.5,
  },
});
