import { StyleSheet, Text } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors;

export const FormInputSelect = ({
  name,
  placeholder,
  rules = {},
  items,
  disabled,
  label,
}) => {
  const { errors, control } = useFormContext();

  const inputPlaceholder = {
    label: placeholder,
    value: null,
    color: "#9EA0A4",
  };

  const styles = StyleSheet.create({
    input: {
      padding: 12.5,
      borderWidth: 1,
      borderColor: "#ccc",
      fontFamily: "Exo-Regular",
      width: "100%",
      borderRadius: 5,
    },
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12.5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
      color: disabled ? "#9EA0A4" : black,
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
      borderRadius: 5,
      color: disabled ? "#9EA0A4" : black,
      fontFamily: "Exo-Medium",
      paddingRight: 30,
      fontFamily: "Exo-Medium",
      marginBottom: 10,
    },
    label: {
      fontFamily: "Exo-SemiBold",
      textTransform: "uppercase",
      color: theme.lightColors.grey0,
      marginBottom: 2.5,
    },
  });

  return (
    <>
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNPickerSelect
            disabled={disabled}
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
    </>
  );
};
