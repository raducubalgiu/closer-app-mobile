import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export const FormInput = ({ name, placeholder, rules = {}, sx, ...props }) => {
  const { errors, control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ ...rules }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          style={{ ...styles.input, ...sx }}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...props}
        />
      )}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
  },
});
