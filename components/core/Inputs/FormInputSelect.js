import { StyleSheet } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";

export const FormInputSelect = ({ name, placeholder, rules = {}, items }) => {
  const { errors, control } = useFormContext();
  const inputPlaceholder = {
    label: placeholder,
    value: null,
    color: "#9EA0A4",
  };

  return (
    <Controller
      control={control}
      rules={{ ...rules }}
      render={({ field: { onChange, onBlur, value } }) => (
        <RNPickerSelect
          placeholder={inputPlaceholder}
          useNativeAndroidPickerStyle={false}
          onValueChange={onChange}
          style={{ ...styles }}
          doneText="Gata"
          value={value}
          items={items?.map((item) => {
            return {
              label: item?.name,
              value: item?._id,
            };
          })}
        />
      )}
      name={name}
    />
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
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    fontFamily: "Exo-Medium",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
    marginBottom: 10,
  },
});
