import { StyleSheet, Text } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import theme from "../../../assets/styles/theme";
import { has, get } from "lodash";
import { Stack } from "../Stack/Stack";
import { Icon } from "@rneui/themed";

const { black, error } = theme.lightColors;

export const FormInputSelect = ({
  name,
  placeholder,
  rules = {},
  items = [],
  disabled = false,
  label = "",
}) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;

  const inputPlaceholder = {
    label: placeholder,
    value: null,
    color: "#9EA0A4",
  };

  const styles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12.5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: has(errors, name) ? error : "#ccc",
      borderRadius: 5,
      color: disabled ? "#9EA0A4" : black,
      paddingRight: 30,
      marginBottom: 10,
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: has(errors, name) ? error : "#ccc",
      borderRadius: 5,
      color: disabled ? "#9EA0A4" : black,
      paddingRight: 30,
      marginBottom: 10,
    },
    label: {
      textTransform: "uppercase",
      color: black,
      marginBottom: 2.5,
      fontSize: 13.5,
      fontWeight: "600",
    },
    errMsg: {
      color: error,
      marginLeft: 5,
    },
  });

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
        render={({ field: { onChange, value } }) => {
          return (
            <RNPickerSelect
              disabled={disabled}
              placeholder={inputPlaceholder}
              useNativeAndroidPickerStyle={false}
              onValueChange={onChange}
              style={styles}
              doneText="Gata"
              value={value}
              items={items?.map((item) => {
                return {
                  label: item?.name,
                  value: item?._id,
                };
              })}
            />
          );
        }}
        name={name}
      />
      {has(errors, name) && errMsg}
    </>
  );
};
