import { StyleSheet } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

const InputSelect = (props) => {
  const placeholder = {
    label: props.placeholder,
    value: null,
    color: "#9EA0A4",
  };

  return (
    <RNPickerSelect
      placeholder={placeholder}
      useNativeAndroidPickerStyle={false}
      onValueChange={(text) => props.onValueChange(text)}
      style={{ ...styles }}
      doneText="Gata"
      items={props?.items?.map((item) => {
        return {
          label: item?.name,
          value: item?._id,
        };
      })}
    />
  );
};

export default InputSelect;

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
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
    marginBottom: 10,
  },
});
