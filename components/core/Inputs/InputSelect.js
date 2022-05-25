import { StyleSheet } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

export const InputSelect = ({ value, onValueChange, items, ...props }) => {
  const placeholder = {
    label: props.placeholder,
    value: null,
    color: "#9EA0A4",
  };

  return (
    <RNPickerSelect
      placeholder={placeholder}
      useNativeAndroidPickerStyle={false}
      onValueChange={(text) => onValueChange(text)}
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
  );
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    fontFamily: "Exo-Medium",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
  },
});
