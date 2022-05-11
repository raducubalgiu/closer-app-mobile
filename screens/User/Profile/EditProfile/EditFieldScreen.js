import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SearchBar, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import HeaderReusable from "../../../../components/customized/Layout/Headers/HeaderReusable";
import { Spinner, Stack } from "../../../../components/core";

const EditFieldScreen = (props) => {
  const navigation = useNavigation();

  const updateField = (text) => {
    props.updateField(text);
  };

  return (
    <>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Anuleaza</Text>
          </TouchableOpacity>
        }
        secondBox={<Text style={styles.field}>{props.field}</Text>}
        thirdBox={
          <TouchableOpacity onPress={props.onSave}>
            <Text style={styles.save}>Salveaza</Text>
          </TouchableOpacity>
        }
      />
      <Divider />
      <View style={{ marginVertical: 10 }}>
        <SearchBar
          placeholder={`${props.field}...`}
          onChangeText={updateField}
          value={props.value}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          searchIcon={""}
          lightTheme={true}
          autoFocus={true}
          cancelButtonTitle=""
          showCancel={false}
        />
      </View>
      <Text
        style={
          props.value.length < 40
            ? styles.strokeLength
            : { ...styles.strokeLength, color: "red" }
        }
      >
        {props.value.length} / {props.fieldLength}
      </Text>
      {props.loading && <Spinner />}
    </>
  );
};

export default EditFieldScreen;

const styles = StyleSheet.create({
  cancel: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 15,
  },
  field: { fontFamily: "Exo-SemiBold", fontSize: 17 },
  save: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.primary,
    fontSize: 16,
  },
  containerStyle: {
    backgroundColor: "transparent",
    padding: 0,
    borderStyle: "dashed",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    fontFamily: "Exo-Medium",
    fontSize: 15,
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
  },
});
